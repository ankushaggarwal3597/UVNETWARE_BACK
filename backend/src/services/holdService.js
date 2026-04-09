const LayoutSeat = require("../models/LayoutSeat"); 
const lockManager = require("../utils/seatLockManager");
const { pool } = require("../config/database");

// ================= HOLD SEAT =================
const holdSeat = async (layoutId, seatId) => { 

  const seats = await LayoutSeat.findByLayoutId(layoutId); 
  const seat = seats.find(s => s.seatId === seatId);

  if (!seat) throw new Error("Seat not found");
  if (seat.status === "booked") throw new Error("Seat already booked");

  const locked = await lockManager.lockSeat(layoutId, seatId); 
  if (!locked) throw new Error("Seat already locked");

  const result = await pool.query(
    `UPDATE layout_seats 
     SET status='locked' 
     WHERE layout_id=$1 AND seat_id=$2 AND status='available'`, 
    [layoutId, seatId]
  );

  if (result.rowCount === 0) {
    await lockManager.unlockSeat(layoutId, seatId); 
    throw new Error("Seat already taken");
  }

  return {
    message: "Seat locked successfully",
    seatId
  };
};

// ================= BOOK SEAT =================
const bookSeat = async (layoutId, seatId) => {

  const seats = await LayoutSeat.findByLayoutId(layoutId); 
  const seat = seats.find(s => s.seatId === seatId);

  if (!seat) throw new Error("Seat not found");

  const locked = await lockManager.isSeatLocked(layoutId, seatId);
  if (!locked) throw new Error("Seat not locked");

  const result = await pool.query(
    `UPDATE layout_seats 
     SET status='booked' 
     WHERE layout_id=$1 AND seat_id=$2 AND status='locked'`,
    [layoutId, seatId]
  );

  if (result.rowCount === 0)
    throw new Error("Seat cannot be booked");

  await lockManager.unlockSeat(layoutId, seatId); 

  return {
    message: "Seat booked successfully",
    seatId
  };
};

// ================= RELEASE SEAT =================
const releaseSeat = async (layoutId, seatId) => {

  const seats = await LayoutSeat.findByLayoutId(layoutId); 
  const seat = seats.find(s => s.seatId === seatId);

  if (!seat) throw new Error("Seat not found");

  await lockManager.unlockSeat(layoutId, seatId); 

  await pool.query(
    `UPDATE layout_seats 
     SET status='available' 
     WHERE layout_id=$1 AND seat_id=$2`,
    [layoutId, seatId]
  );

  return {
    message: "Seat released",
    seatId
  };
};

module.exports = {
  holdSeat,
  bookSeat,
  releaseSeat
};
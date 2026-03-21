const EventSeat = require("../models/EventSeat");
const lockManager = require("../utils/seatLockManager");
const { pool } = require("../config/database");

// ================= HOLD SEAT =================
const holdSeat = async (eventId, seatId) => {

  const seats = await EventSeat.findByEventId(eventId);
  const seat = seats.find(s => s.seatId === seatId);

  if (!seat)
    throw new Error("Seat not found");

  if (seat.status === "booked")
    throw new Error("Seat already booked");

  // ✅ Step 1: Lock in Redis
  const locked = await lockManager.lockSeat(eventId, seatId);

  if (!locked)
    throw new Error("Seat already locked");

  // ✅ Step 2: Update DB
  const result = await pool.query(
    `UPDATE event_seats 
     SET status='locked' 
     WHERE event_id=$1 AND seat_id=$2 AND status='available'`,
    [eventId, seatId]
  );

  // ❗ Rollback Redis lock if DB fails
  if (result.rowCount === 0) {
    await lockManager.unlockSeat(eventId, seatId);
    throw new Error("Seat already taken");
  }

  return {
    message: "Seat locked successfully",
    seatId
  };
};

// ================= BOOK SEAT =================
const bookSeat = async (eventId, seatId) => {

  const seats = await EventSeat.findByEventId(eventId);
  const seat = seats.find(s => s.seatId === seatId);

  if (!seat)
    throw new Error("Seat not found");

  const locked = await lockManager.isSeatLocked(eventId, seatId);

  if (!locked)
    throw new Error("Seat not locked");

  // ✅ Update DB only if currently locked
  const result = await pool.query(
    `UPDATE event_seats 
     SET status='booked' 
     WHERE event_id=$1 AND seat_id=$2 AND status='locked'`,
    [eventId, seatId]
  );

  if (result.rowCount === 0)
    throw new Error("Seat cannot be booked");

  // ✅ Remove Redis lock
  await lockManager.unlockSeat(eventId, seatId);

  return {
    message: "Seat booked successfully",
    seatId
  };
};

// ================= RELEASE SEAT =================
const releaseSeat = async (eventId, seatId) => {

  const seats = await EventSeat.findByEventId(eventId);
  const seat = seats.find(s => s.seatId === seatId);

  if (!seat)
    throw new Error("Seat not found");

  // ✅ Remove Redis lock
  await lockManager.unlockSeat(eventId, seatId);

  // ✅ Update DB
  await pool.query(
    `UPDATE event_seats 
     SET status='available' 
     WHERE event_id=$1 AND seat_id=$2`,
    [eventId, seatId]
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
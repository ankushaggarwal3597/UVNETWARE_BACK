const layout = require("../../layout.json");
const seats = layout.seats;

const lockManager = require("../utils/seatLockManager");

const holdSeat = async (eventId, seatId) => {

  const seat = seats.find(s => s.seatId === seatId);

  if (!seat)
    throw new Error("Seat not found");

  const locked = await lockManager.isSeatLocked(eventId, seatId);

  if (locked)
    throw new Error("Seat already locked");

  const result = await lockManager.lockSeat(eventId, seatId);

  if (!result)
    throw new Error("Seat already locked");

  return {
    message: "Seat locked successfully",
    seatId
  };
};

const bookSeat = async (eventId, seatId) => {

  const seat = seats.find(s => s.seatId === seatId);

  if (!seat)
    throw new Error("Seat not found");

  const locked = await lockManager.isSeatLocked(eventId, seatId);

  if (!locked)
    throw new Error("Seat not locked");

  // later this will update DB
  // for now we simulate booking

  await lockManager.unlockSeat(eventId, seatId);

  return {
    message: "Seat booked successfully",
    seatId
  };
};

const releaseSeat = async (eventId, seatId) => {

  const seat = seats.find(s => s.seatId === seatId);

  if (!seat)
    throw new Error("Seat not found");

  await lockManager.unlockSeat(eventId, seatId);

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
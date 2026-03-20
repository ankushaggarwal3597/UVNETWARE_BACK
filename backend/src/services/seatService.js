const EventSeat = require("../models/EventSeat");
const generateSeatsFromLayout = require("../utils/seatGenerator");

const generateSeats = async (eventId, layoutData) => {
  const seats = generateSeatsFromLayout(eventId, layoutData);
  await EventSeat.bulkCreate(seats);
};

const getSeatMap = async (eventId) => {
  return await EventSeat.findByEventId(eventId);
};

module.exports = {
  generateSeats,
  getSeatMap,
};

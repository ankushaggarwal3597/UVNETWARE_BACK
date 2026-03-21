const seatService = require("../services/holdService");

const holdSeat = async (req, res, next) => {
  try {
    const { eventId, seatId } = req.body;

    const result = await seatService.holdSeat(eventId, seatId);

    res.json(result);
  } catch (err) {
    next(err);
  }
};

const bookSeat = async (req, res, next) => {
  try {
    const { eventId, seatId } = req.body;

    const result = await seatService.bookSeat(eventId, seatId);

    res.json(result);
  } catch (err) {
    next(err);
  }
};

const releaseSeat = async (req, res, next) => {
  try {
    const { eventId, seatId } = req.body;

    const result = await seatService.releaseSeat(eventId, seatId);

    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  holdSeat,
  bookSeat,
  releaseSeat,
};
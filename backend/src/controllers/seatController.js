const seatService = require("../services/seatService");

const getSeatMap = async (req, res, next) => {
  try {
    const seats = await seatService.getSeatMap(req.params.eventId);
    res.json(seats);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getSeatMap,
};

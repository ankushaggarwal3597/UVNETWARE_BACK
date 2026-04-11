const seatService = require("../services/seatService");

// generate seats
const generateSeats = async (req, res, next) => {
  try {
    await seatService.generateSeats(req.params.layoutId);
    res.json({ message: "Seats generated successfully" });
  } catch (err) {
    next(err);
  }
};

const getSeatMap = async (req, res, next) => {
  try {
    const seats = await seatService.getSeatMap(req.params.layoutId); 
    res.json(seats);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  generateSeats,
  getSeatMap
};
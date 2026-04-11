const seatService = require("../services/holdService");

//hold seat
const holdSeat = async (req, res, next) => {
  try {
    const { layoutId, seatId } = req.body; 

    const result = await seatService.holdSeat(layoutId, seatId); 

    res.json(result);
  } catch (err) {
    next(err);
  }
};

//book seat
const bookSeat = async (req, res, next) => {
  try {
    const { layoutId, seatId } = req.body; 

    const result = await seatService.bookSeat(layoutId, seatId); 

    res.json(result);
  } catch (err) {
    next(err);
  }
};


//release seat
const releaseSeat = async (req, res, next) => {
  try {
    const { layoutId, seatId } = req.body; 

    const result = await seatService.releaseSeat(layoutId, seatId); 

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
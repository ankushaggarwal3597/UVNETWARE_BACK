const LayoutSeat = require("../models/LayoutSeat"); 
const generateSeatsFromLayout = require("../utils/seatGenerator");
const Layout = require("../models/Layout");

const generateSeats = async (layoutId) => { 
  const layout = await Layout.findById(layoutId);

  if (!layout) throw new Error("Layout not found");

  const seats = generateSeatsFromLayout(layoutId, layout.layout_data); 
  await LayoutSeat.bulkCreate(seats); 
};

const getSeatMap = async (layoutId) => { 
  return await LayoutSeat.findByLayoutId(layoutId); 
};

module.exports = {
  generateSeats,
  getSeatMap,
};
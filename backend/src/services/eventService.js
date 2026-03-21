const Event = require("../models/Event");
const Layout = require("../models/Layout");
const seatService = require("./seatService");

const createEvent = async (data) => {
  const { eventName, layoutId, eventDate } = data;

  const layout = await Layout.findById(layoutId);
  if (!layout) {
    const error = new Error("Layout not found");
    error.status = 404;
    throw error;
  }

  const event = await Event.create(eventName, layoutId, eventDate);

  await seatService.generateSeats(event.id, layout.layout_data);

  return event;
};

const getAllEvents = async () => {
  return await Event.findAll();
};

const getEventById = async (id) => {
  const event = await Event.findById(id);
  if (!event) {
    const error = new Error("Event not found");
    error.status = 404;
    throw error;
  }
  return event;
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
};

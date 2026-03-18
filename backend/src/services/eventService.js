const Event = require("../models/Event");
const Layout = require("../models/Layout");

const createEvent = async (data) => {
  const { eventName, layoutId, eventDate } = data;

  // Validate that layoutId exists in layouts table
  const layout = await Layout.findById(layoutId);
  if (!layout) {
    const error = new Error("Layout not found");
    error.status = 404;
    throw error;
  }

  return await Event.create(eventName, layoutId, eventDate);
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

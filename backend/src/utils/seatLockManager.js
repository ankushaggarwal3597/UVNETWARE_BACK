const { redisClient } = require("../config/redis");

const lockSeat = async (eventId, seatId) => {

  const key = `seat_lock:${eventId}:${seatId}`;

  const result = await redisClient.set(key, "locked", {
    NX: true,
    EX: 300
  });

  return result;
};

const unlockSeat = async (eventId, seatId) => {

  const key = `seat_lock:${eventId}:${seatId}`;

  await redisClient.del(key);
};

const isSeatLocked = async (eventId, seatId) => {

  const key = `seat_lock:${eventId}:${seatId}`;

  return await redisClient.exists(key);
};

module.exports = {
  lockSeat,
  unlockSeat,
  isSeatLocked
};
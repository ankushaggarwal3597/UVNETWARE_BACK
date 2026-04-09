const { redisClient } = require("../config/redis");

const lockSeat = async (layoutId, seatId) => { 

  const key = `seat_lock:${layoutId}:${seatId}`; 

  const result = await redisClient.set(key, "locked", {
    NX: true,
    EX: 300
  });

  return result;
};

const unlockSeat = async (layoutId, seatId) => { 

  const key = `seat_lock:${layoutId}:${seatId}`; 

  await redisClient.del(key);
};

const isSeatLocked = async (layoutId, seatId) => { 

  const key = `seat_lock:${layoutId}:${seatId}`; 

  return await redisClient.exists(key);
};

module.exports = {
  lockSeat,
  unlockSeat,
  isSeatLocked
};
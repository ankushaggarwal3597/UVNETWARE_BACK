const generateSeatsFromLayout = (eventId, layoutData) => {
  const seats = [];

  layoutData.sections.forEach((section) => {
    section.rows.forEach((row) => {
      row.seats.forEach((seat) => {
        seats.push({
          eventId,
          seatId: seat.seatId,
          section: section.sectionId,
          row: row.rowId,
          x: seat.x,
          y: seat.y,
          status: "available",
        });
      });
    });
  });

  return seats;
};

module.exports = generateSeatsFromLayout;

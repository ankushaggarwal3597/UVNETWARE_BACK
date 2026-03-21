const layoutService = require("../services/layoutService");

const saveLayout = async (req, res, next) => {
  try {
    const layout = await layoutService.saveLayout(req.body);

    res.status(201).json({
      layoutId: layout.id,
      message: "Layout saved successfully",
    });
  } catch (err) {
    next(err);
  }
};

const getLayouts = async (req, res, next) => {
  try {
    const layouts = await layoutService.getLayouts();
    res.json(layouts);
  } catch (err) {
    next(err);
  }
};

const getLayoutById = async (req, res, next) => {
  try {
    const layout = await layoutService.getLayoutById(req.params.id);
    res.json(layout);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  saveLayout,
  getLayouts,
  getLayoutById,
};
const Layout = require("../models/Layout");

const saveLayout = async (data) => {
  const { layoutName, layoutType, layoutData } = data;

  return await Layout.create(layoutName, layoutType, layoutData);
};

const getLayouts = async () => {
  return await Layout.findAll();
};

const getLayoutById = async (id) => {
  return await Layout.findById(id);
};

module.exports = {
  saveLayout,
  getLayouts,
  getLayoutById,
};
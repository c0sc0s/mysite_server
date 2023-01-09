const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnect");

module.exports = sequelize.define(
  "demo",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    github: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    thumb: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  }
);
const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo para VIDEOGAME
  // modelName / attributes / options
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      platforms: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      releaseDate: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.INTEGER,
      },
      // background_image: {
      //   type: DataTypes.STRING,
      // },
    },
    { timestamps: true, createdAt: "Actualizado", updatedAt: false }
  );
};

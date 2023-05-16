'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    login: DataTypes.STRING,
    senha: DataTypes.STRING,
    dataNascimento: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
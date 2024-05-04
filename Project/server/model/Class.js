const { DataTypes} = require('sequelize');
const {sequelize} = require('../database');

const Class = sequelize.define('Class', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

Class.sync().then();
module.exports = Class;
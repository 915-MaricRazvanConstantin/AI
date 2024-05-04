const { DataTypes} = require('sequelize');
const {sequelize} = require('../database');

const Student = sequelize.define('student', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    class_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
        freezeTableName: true,
        timestamps: false
    });

Student.sync().then();

module.exports = Student;
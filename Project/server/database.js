const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('school_database', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    logging: false
});

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Successfully connected to database");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

module.exports = { connectToDatabase, sequelize };

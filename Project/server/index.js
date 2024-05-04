const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('socket.io'); // Import socket.io
const { router } = require('./routes/router');
const { connectToDatabase, sequelize } = require('./database');

const app = express();
const server = require('http').createServer(app); // Create HTTP server

app.use(bodyParser.json());
app.use(cors());
app.use('/api/students', router);

const PORT = process.env.PORT || 5000;

// Start the HTTP server
server.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectToDatabase();
});

// Initialize socket.io
const io = socket(server);

// WebSocket event handler
io.on('connection', (socket) => {
    console.log('A client connected');

    // Check server status and emit to client
    socket.emit('serverStatus', true); // Assume server is initially running

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});

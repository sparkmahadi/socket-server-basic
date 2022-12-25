const express = require('express');

const app = express();

const http = require('http');

const httpServer = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(httpServer);

io.on('connection', (socket)=>{
    console.log('new user connected');

    socket.on("disconnect", ()=>{
        console.log('user disconnected');
    })

    socket.send("fifa world cup 2022");
    
    socket.on("testEvent", (data)=>{
        console.log(data);
    })




});


app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/app.html" )
});

httpServer.listen(5000, function(){
    console.log('socket server is running on port 5000');
});
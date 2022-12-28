const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const http = require('http');

const httpServer = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(httpServer, {
    cors:{
        origin:"http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket)=>{
    console.log('new user connected');

    socket.on("disconnect", ()=>{
        console.log('user disconnected');
    })

    // socket.send("fifa world cup 2022");
    
    // socket.on("testEvent", (data)=>{
    //     console.log(data);
    // })

    socket.on("reactEvent", (data)=>{
        console.log(data);
    })

    // broadcasting
    // io.sockets.emit("fifaWorldCup", "hello football");
});

// filtered broadcasting
// let fifa = io.of("/worldCup");
// fifa.on("connection", (socket)=>{
//     fifa.emit("worldCupEvent", "Hello! This is a filtered broadcast from fifa")
// })

// let icc = io.of("/cricketCup");
// icc.on("connection", (socket)=>{
//     icc.emit("cricketCupEvent", "Hello! This is a filtered broadcast from icc world cup")
// })


app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/app.html" )
});

httpServer.listen(5000, function(){
    console.log('socket server is running on port 5000');
});
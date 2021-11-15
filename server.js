const express = require('express')
const http = require('http')
const cors = require('./config/cors')

const port = 3001;
const index = require("./routes/index");
const app = express();

app.use(cors)
app.use(index);

const server = http.createServer(app);
const io = require('socket.io')(server)

io.on("connection", (socket) => {
  console.log("New client connected: ", socket.id);

  socket.on('chat.message', data => {
      console.log('Chat message', data)

      io.emit('chat.message', data)
  })


  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);
    /* clearInterval(interval); */
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
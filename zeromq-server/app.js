const zmq = require('zeromq')
const socket = zmq.socket('pub')
const address = process.env.ZMQ_BIND_ADDRESS || `tcp://*:3000`

socket.bindSync(address)

const sendMessage = () => { 
  const message = { message: 'Hola !' }
  socket.send(['test', JSON.stringify(message)], (err) => {
    console.log(err)
  })
}
  
setInterval(sendMessage, 5000)
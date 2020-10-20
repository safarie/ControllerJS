/// --------------------------------------------------------
/// Temporary server
/// --------------------------------------------------------

const net = require('net');

/// Settings -----------------------------------------------

let PORT = 54000;
let IP = '127.0.0.1';

//* Allow overriding of IP and PORT settings, respectively.
//
//? `node . 127.0.0.1` will override the IP; and
//? `node . 127.0.0.1 80` will override the IP and PORT
//? settings.
//
//! This fill not work whenever this file is compiled.
//! But for now, it's fine.

if (process.argv.length > 3)
  PORT = process.argv[3];
if (process.argv.length > 2)
  IP = process.argv[2];

console.log(`Listening on ${IP}:${PORT}`);

/// Server initalisation -----------------------------------

const tcpServer = net.createServer(socket => {
  socket.on('close', () => console.log('Disconnected'));
  socket.on('connect', () => console.log('Connected'));
  socket.on('data', data => console.log(data.toString('utf8')));
  socket.on('error', console.error);
});

tcpServer.listen(PORT, IP);

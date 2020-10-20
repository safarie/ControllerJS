/// --------------------------------------------------------
/// Temporary controller
/// --------------------------------------------------------

// Dependencies
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

console.log(`Connecting to ${IP}:${PORT}`);

/// Hardcoded packets --------------------------------------

const GREEN = JSON.stringify({ "A1-1": 1 });
const RED = JSON.stringify({ "A1-1": 0 });

// Delay in milliseconds.
const DELAY = 5000;

/// Connection initalisation -------------------------------

const tcpClient = new net.Socket();

tcpClient.connect(PORT, IP);

// Event handlers.
tcpClient.on('connect', () => {
  console.log('Connected');

  tcpClient.write(RED);

  setTimeout(() => {
    tcpClient.write(GREEN);
  }, DELAY)
})

tcpClient.on('error', (error) => {
  console.error(error);
})

tcpClient.on('close', () => {
  console.log('Disconnected');
})

// // Requester Peer

// const net = require('net');

// // IP address and port of the other peer
// const otherPeerIP = 'other_peer_ip_address';
// const otherPeerPort = 12345; // Assuming this is the port the other peer is listening on

// // File ID to request
// const fileId = 'file123';

// // Create a TCP socket to connect to the other peer
// const client = new net.Socket();

// client.connect(otherPeerPort, otherPeerIP, () => {
//     console.log('Connected to peer');

//     // Send the file ID as a request
//     client.write(fileId);
// });

// // Listen for data (the requested file) from the other peer
// client.on('data', (data) => {
//     console.log('Received file:', data.toString());

//     // Close the connection after receiving the file
//     client.end();
// });

// // Handle connection errors
// client.on('error', (err) => {
//     console.error('Connection error:', err);
// });


// Requester Peer

// const net = require('net');

// // IP address and port of the other peer
// const otherPeerIP = '127.0.0.1'; // Assuming both peers are running on the same machine
// const otherPeerPort = 12345;

// File ID to request
const fileId = 'abcd.txt';

// Create a TCP server to handle incoming requests from the other peer


// Requester Peer

const net = require('net');

// IP address and port of the receiving peer
const receiverIP = '127.0.0.1'; // Assuming both peers are running on the same machine
const receiverPort = 12345;

// File ID to request
// const fileId = 'file123';

// Create a TCP client to connect to the receiving peer server
const client = new net.Socket();

// Handle connection to the receiving peer
client.connect(receiverPort, receiverIP, () => {
    console.log('Connected to receiving peer server');

    // Send the file ID as a request to the receiving peer
    client.write(fileId);
});

// Listen for data (the requested file) from the receiving peer
client.on('data', (data) => {
    console.log('Received file:', data.toString());

    // Close the connection after receiving the file
    client.end();
});

// Handle connection errors
client.on('error', (err) => {
    console.error('Connection error:', err);
});


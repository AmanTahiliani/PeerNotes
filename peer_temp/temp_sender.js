// // Receiving Peer

// const net = require('net');
// const fs = require('fs');

// // Port on which this peer will listen for requests
// const listenPort = 12345;

// // Mapping of file IDs to file paths
// const filesMap = {
//     'file123': '/path/to/file.txt',
//     // Add more file IDs and corresponding file paths as needed
// };

// // Create a server to listen for incoming requests
// const server = net.createServer((socket) => {
//     console.log('Peer connected');

//     // Handle data (file ID) received from the requester peer
//     socket.on('data', (data) => {
//         const fileId = data.toString();
//         console.log('Received request for file ID:', fileId);

//         // Look up the file path based on the file ID
//         const filePath = filesMap[fileId];

//         if (filePath) {
//             // Read the file and send its contents back to the requester
//             fs.readFile(filePath, (err, fileData) => {
//                 if (err) {
//                     console.error('Error reading file:', err);
//                     socket.end();
//                     return;
//                 }

//                 // Send the file data to the requester
//                 socket.write(fileData);

//                 // Close the connection after sending the file
//                 socket.end();
//             });
//         } else {
//             console.log('File ID not found');
//             socket.end();
//         }
//     });
// });

// // Start listening for incoming connections
// server.listen(listenPort, () => {
//     console.log('Peer server listening on port', listenPort);
// });

// // Handle server errors
// server.on('error', (err) => {
//     console.error('Server error:', err);
// });


// Receiving Peer

const net = require('net');
const fs = require('fs');

// Port on which this peer will listen for requests
const listenPort = 12345;

// Mapping of file IDs to file paths
const filesMap = {
    'abcd.txt': './abcd.txt',
    // Add more file IDs and corresponding file paths as needed
};

// Create a TCP server to listen for incoming requests from other peers
const server = net.createServer((socket) => {
    console.log('Receiving peer server connected');

    // Handle data (file ID) received from the requester peer
    socket.on('data', (data) => {
        const fileId = data.toString();
        console.log('Received request for file ID:', fileId);

        // Look up the file path based on the file ID
        const filePath = filesMap[fileId];

        if (filePath) {
            // Read the file and send its contents back to the requester
            fs.readFile(filePath, (err, fileData) => {
                if (err) {
                    console.error('Error reading file:', err);
                    socket.end();
                    return;
                }

                // Send the file data to the requester
                socket.write(fileData);

                // Close the connection after sending the file
                socket.end();
            });
        } else {
            console.log('File ID not found');
            socket.end();
        }
    });

    // Handle connection errors
    socket.on('error', (err) => {
        console.error('Connection error:', err);
    });
});

// Start the server
server.listen(listenPort, () => {
    console.log('Receiving peer server listening for incoming connections');
});

// Handle server errors
server.on('error', (err) => {
    console.error('Server error:', err);
});

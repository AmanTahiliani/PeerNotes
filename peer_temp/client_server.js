
const SimplePeer = require('simple-peer');

// Function to act as the file host
function hostFile() {
  const peer = new SimplePeer({ initiator: true });

  peer.on('signal', data => {
    console.log('Share this data with the peer who wants to download the file:');
    console.log(JSON.stringify(data));
  });

  peer.on('connect', () => {
    console.log('Peer connected. Sending file...');
    const fileContent = 'This is the content of the file.';
    peer.send(fileContent);
  });
}

// Function to act as the file requester
function requestFile() {
  const peer = new SimplePeer();

  peer.on('signal', data => {
    console.log('Share this data with the file host:');
    console.log(JSON.stringify(data));
  });

  peer.on('connect', () => {
    console.log('Peer connected. Waiting for file...');
  });

  peer.on('data', data => {
    console.log(`File received: ${data}`);
  });
}

// Decide whether to host the file or request it
const isHost = process.argv[2] === 'host';

if (isHost) {
  hostFile();
} else {
  requestFile();
}

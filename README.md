# Introduction
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Language: English | [Español](docs/README-es-ES.md)

![](./docs/node+socket-io.png)

This demo const of two parts:

1. Firstly a node service that got an POST endpoint to control when use receive hypothetical mail, and send notification via socket to user. 
2. On the other side there is a client sample web, with envelope icon with badge that shows pending to read emails.

This diagram shows us how app worked. Initially clients icon show have zero messages. When POST request call service, incremet number of pending to read meails, immediately mail icon update with new mail unread number.

![diagram](./docs/diagram.jpg)

# Starting 🚀

## Requirements 📋
You have two ways to run this applications:
1. Use your local node.
2. Use docker container.

## Installation 🔧
### Node
Run the following commands:

``bash
npm install
npm start
``

### Docker
Via Docker:

``bash
docker build -t <username>/demo-node-socker-mailbox .
``
## Test demo ⚙️

1. Open a web in your browser with the next address:

``
http://localhost:8085
``

Stablished connection by socket with server, you  can see the pending to read mail in zero.

2. If you make `POST` request via REST yo can add more pending send. You can see server not do more rest call, instead use websocket connection to update in real time changes.

``bash
curl --location --request POST 'localhost:8085/new-message?username=anonymous'
``
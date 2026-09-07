#!/usr/bin/env node

const path = require('path');
const serverPath = path.resolve(__dirname, '../out/server.js');

// Run server with arguments (supports --stdio, --node-ipc)
require(serverPath);

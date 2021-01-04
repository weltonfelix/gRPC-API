const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const AuthorsDefinition = protoLoader.loadSync(path.resolve(__dirname, '../proto/authors.proto'));
const AuthorsObject = grpc.loadPackageDefinition(AuthorsDefinition);

const authorHandler = require('./handlers/AuthorHandler.js');

const server = new grpc.Server();

server.addService(AuthorsObject.AuthorService.service, authorHandler);

server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());
console.log('Listening...');
server.start();

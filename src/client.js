const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const AuthorsDefinition = protoLoader.loadSync(path.resolve(__dirname, '../proto/authors.proto'));
const AuthorsObject = grpc.loadPackageDefinition(AuthorsDefinition);

const authorClient = new AuthorsObject.AuthorService(
  'localhost:50051',
  grpc.credentials.createInsecure(),
);

function promisify(method) {
  return (params) => {
    return new Promise((resolve, reject) => {
      authorClient[method](params, (err, response) => {
        if (err) return reject(err);
        return resolve(response)
      })
    })
  }
}

(async () => {
  const Welton = await promisify('create')({
    name: 'Welton Felix',
    website: 'https://github.com/weltonfelix',
  });

  console.log(Welton);
})()
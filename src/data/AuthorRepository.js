const fs = require("fs");
const path = require("path");
const oid = require("bson-objectid");

class AuthorRepository {
  static dbLocation = path.resolve(__dirname, './.db');
  static collectionPath = path.resolve(
    AuthorRepository.dbLocation,
    'authors.json',
  );

  static #collection = [];

  constructor () {
    if(!fs.existsSync(AuthorRepository.dbLocation)) {
      fs.mkdirSync(AuthorRepository.dbLocation, {recursive: true});
    }
    if(!fs.existsSync(AuthorRepository.collectionPath)) {
      fs.writeFileSync(AuthorRepository.collectionPath, '[]');
    }
    AuthorRepository.#collection = require(AuthorRepository.collectionPath);
  }

  findById (id) {
    return AuthorRepository.#collection.find((author) => author.id === id);
  }

  search (key, value) {
    return AuthorRepository.#collection.filter(
      author => author[key] === value
    );
  }

  listAll() {
    return AuthorRepository.#collection;
  }

  create(author) {
    const newAuthor = {id: new oid().toHexString(), ...author};
    AuthorRepository.#collection.push(newAuthor);
    
    return newAuthor;
  }

  delete(authorId) {
    AuthorRepository.#collection = AuthorRepository.#collection.filter(
      author => !(new oid(author.id).equals(authorId))
    );
    return this;
  }

  update(authorId, updatedData) {
    const author = this.findById(authorId);
    const filteredData = Object.entries(updateData).reduce(
      (acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      }, {}
    ); // remove chaves em branco
    const updatedAuthor = this.delete(authorId).create({
      ...author,
      ...filteredData,
    });
    return updatedAuthor;
  }

  #serialize(entity) {
    return JSON.stringify(entity);
  }

  save () {
    fs.writeFileSync(
      AuthorRepository.collectionPath,
      this.#serialize(AuthorRepository.#collection)
    );

    return this;
  }
}

module.exports = AuthorRepository;
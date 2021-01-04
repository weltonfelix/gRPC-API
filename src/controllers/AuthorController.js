const AuthorRepository = require('../data/AuthorRepository');

class AuthorController {
  constructor() {
    this.authorRepository = new AuthorRepository();
  }

  find (id) {
    const author = this.authorRepository.findById(id);

    if(!author) throw new Error(`Author ${id} not found`);

    return author;
  }

  list() {
    return this.authorRepository.listAll();
  }

  create(params) {
    const author = this.authorRepository.create(params);
    this.authorRepository.save();

    return author;
  }

  update(authorId, updateData) {
    this.find(authorId); // Verifica se o autor existe
    const author = this.authorRepository.update(authorId, updateData);
    this.authorRepository.save();

    return author;
  }

  delete(id) {
    return this.authorRepository.delete(id).save();
  }
}

module.exports = AuthorController;

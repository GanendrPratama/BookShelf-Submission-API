/* eslint-disable indent */
const {response} = require('@hapi/hapi');
const {nanoid} = require('nanoid');
const bookshelf = require('./bookshelf');

// Function for adding books
const addBookHandler = (request, h) => {
  try {
    const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  }= request.payload;

  const id = nanoid(16);

  const insertedAt = new Date().toISOString;
  const updatedAt = insertedAt;

  let finished = false;

  if (pageCount === readPage) {
    finished = true;
  }

  const newBook = {
    id, name, year, author, summary, publisher,
    pageCount, readPage, finished, finished, reading, insertedAt, updatedAt,
  };


  bookshelf.push(newBook);

  const isSuccess = bookshelf.filter((books) => books.id === id).length > 0;

  // success check
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookID: id,
      },
    });
    response.code(201);
    return response;
  }

  // err 400 undefined name check
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  };

  // err 400 readPage more than pageCount check
  if (readPage > pageCount) {
    const response = h.response({
        status: 'fail',
        // eslint-disable-next-line max-len
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  };

  // err 500 common error while registering check
} catch (error) {
    const response = h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
}
};

// Function for getting every book's data
const getAllBookHandler = (h) => {
    const response = h.response({
        status: 'success',
        data: {
            books: books.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        },
    });
    response.code(200);
    return response;
};

const getBookByID = (request, h) => {
    const {id} = request.params;

    const book = books.filter((n) => n.id === id)[0];

    if (book !== undefined) {
        const response = h.response({
            status: 'success',
            data: {
                books: books.map((book) => ({
                    id: book.id,
                    name: book.name,
                    year: book.year,
                    author: book.author,
                    summary: book.summary,
                    publisher: book.publisher,
                    pageCount: book.pageCount,
                    readPage: book.readPage,
                    finished: book.finished,
                    reading: book.reading,
                    insertedAt: book.insertedAt,
                    updatedAt: book.updatedAt,
                })),
            },
        });
        // success on getting book data
        response.code(200);
        return response;
    }

    // err 404
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      });
      response.code(404);
      return response;
};

const editBookHandler = (request, h) => {
  const {id} = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString;
  let finished = false;

  if (pageCount === readPage) {
    finished = true;
  }

  const index = books.findIndex((books) => books.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  if (name === undefined) {
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Mohon isi nama buku',
  });
  response.code(400);
  return response;
}

if (readPage > pageCount) {
  const response = h.response({
    status: 'fail',
    // eslint-disable-next-line max-len
    message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
  });
  response.code(400);
  return response;
}

const response = h.response({
  status: 'fail',
  message: 'Gagal memperbarui buku. Id tidak ditemukan',
});
response.code(404);
return response;
};

const deleteBookHandler = (request, h) => {
  const {id} = request.params;

  const index = books.findIndex((books) => books.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Exported functions
module.exports ={
  addBookHandler,
  getAllBookHandler,
  getBookByID,
  editBookHandler,
  deleteBookHandler,
};

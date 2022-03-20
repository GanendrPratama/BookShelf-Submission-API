const {
  addBookHandler,
  getAllBookHandler,
  getBookByID,
  editBookHandler,
  deleteBookHandler,
}= require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },

  {
    method: 'GET',
    path: '/books',
    handler: getAllBookHandler,
  },

  {
    method: 'GET',
    path: `/books/{id}`,
    handler: getBookByID,
  },

  {
    method: 'PUT',
    path: `/books/{id}`,
    handler: editBookHandler,
  },

  {
    method: 'DELETE',
    path: `/books/{id}`,
    handler: deleteBookHandler,
  },
];

module.exports = routes;

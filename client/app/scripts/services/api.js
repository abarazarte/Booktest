(function(){
  /**
   * @ngdoc service
   * @name clientApp.apiService
   * @description
   * # apiService
   * Service in the neksoFeDriverApp.
   */
  angular.module('clientApp')
    .service('apiService', apiServiceFn);

  function apiServiceFn($http, $q, API_BASE_PATH, store){
    var URL_SEPARATOR = '/';
    var QUERY_PARAM_SEPARATOR = '&';
    var AUTHORS_BASE_PATH = API_BASE_PATH + 'authors';
    var BOOKS_BASE_PATH = API_BASE_PATH + 'books';
    var REPORTS_BASE_PATH = API_BASE_PATH + 'reports';

    return {
      getAuthors: getAuthorsFn,
      getAuthor: getAuthorFn,
      addAuthor: addAuthorFn,
      editAuthor: editAuthorFn,
      deleteSelectedAuthors: deleteSelectedAuthorsFn,
      getBookGenres: getBookGenresFn,
      getBooks: getBooksFn,
      addBook: addBookFn,
      deleteSelectedBooks: deleteSelectedBooksFn,
      getBook: getBookFn,
      editBook: editBookFn,
      generateRandomData: generateRandomDataFn,
      getRevenueReportData: getRevenueReportDataFn
    };

    function getTokenFromStorageFn(){
      var token = store.get('client_token');
      if(angular.isDefined(token)){
        return token.tokenType + ' ' + token.token;
      }
    }

    function getAuthorsFn(limit, skip){
      var url = AUTHORS_BASE_PATH + '?';

      if(angular.isDefined(skip)){
        url += 'skip=' + skip * limit + QUERY_PARAM_SEPARATOR;
      }

      if(angular.isDefined(limit)){
        url += 'limit=' + limit + QUERY_PARAM_SEPARATOR;
      }


      return $http({
        url: url,
        method: 'GET',
        headers: {
          Authorization: getTokenFromStorageFn()
        }
      })
        .then(handleSuccess, handleError('Error getting authors'));
    }

    function getAuthorFn(authorId){
      return $http({
        url: AUTHORS_BASE_PATH + URL_SEPARATOR + authorId,
        method: 'GET',
        headers: {
          Authorization: getTokenFromStorageFn()
        }
      })
        .then(handleSuccess, handleError('Error getting author'));
    }

    function addAuthorFn(author){
      return $http({
        url: AUTHORS_BASE_PATH,
        method: 'POST',
        data: author,
        headers: {
          Authorization: getTokenFromStorageFn()
        }
      })
        .then(handleSuccess, handleError('Error adding author'));
    }

    function editAuthorFn(author){
      return $http({
        url: AUTHORS_BASE_PATH + URL_SEPARATOR + author._id,
        method: 'PUT',
        data: author,
        headers: {
          Authorization: getTokenFromStorageFn()
        }
      })
        .then(handleSuccess, handleError('Error adding author'));
    }

    function deleteSelectedAuthorsFn(selected){
      var promises = selected.map(function(author){
        return $http({
          url: AUTHORS_BASE_PATH + URL_SEPARATOR + author,
          method: 'DELETE',
          headers: {
            Authorization: getTokenFromStorageFn()
          }
        });
      });

      return $q.all(promises)
        .then(handleSuccess, handleError('Error deleting selected authors'));


    }

    function getBookGenresFn(){
      return $http({
        url: BOOKS_BASE_PATH + URL_SEPARATOR + 'genres',
        method: 'GET',
        headers: {
          Authorization: getTokenFromStorageFn()
        }
      })
        .then(handleSuccess, handleError('Error adding book'));
    }

    function getBooksFn(limit, skip){
      var url = BOOKS_BASE_PATH + '?';

      if(angular.isDefined(skip)){
        url += 'skip=' + skip * limit + QUERY_PARAM_SEPARATOR;
      }

      if(angular.isDefined(limit)){
        url += 'limit=' + limit + QUERY_PARAM_SEPARATOR;
      }

      return $http({
        url: url,
        method: 'GET',
        headers: {
          Authorization: getTokenFromStorageFn()
        }
      })
        .then(handleSuccess, handleError('Error adding book'));
    }

    function addBookFn(book){
      return $http({
        url: BOOKS_BASE_PATH,
        method: 'POST',
        data: book,
        headers: {
          Authorization: getTokenFromStorageFn()
        }
      })
        .then(handleSuccess, handleError('Error adding book'));
    }

    function deleteSelectedBooksFn(selected){
      var promises = selected.map(function(book){
        return $http({
          url: BOOKS_BASE_PATH + URL_SEPARATOR + book,
          method: 'DELETE',
          headers: {
            Authorization: getTokenFromStorageFn()
          }
        });
      });

      return $q.all(promises)
        .then(handleSuccess, handleError('Error deleting selected authors'));


    }

    function getBookFn(bookId){
      return $http({
        url: BOOKS_BASE_PATH + URL_SEPARATOR + bookId,
        method: 'GET',
        headers: {
          Authorization: getTokenFromStorageFn()
        }
      })
        .then(handleSuccess, handleError('Error getting book'));
    }

    function editBookFn(book){
      return $http({
        url: BOOKS_BASE_PATH + URL_SEPARATOR + book._id,
        method: 'PUT',
        data: book,
        headers: {
          Authorization: getTokenFromStorageFn()
        }
      })
        .then(handleSuccess, handleError('Error adding author'));
    }

    function generateRandomDataFn(){
      return $http({
        url: REPORTS_BASE_PATH + URL_SEPARATOR + 'generate',
        method: 'GET',
        headers: {
          Authorization: getTokenFromStorageFn()
        }
      })
        .then(handleSuccess, handleError('Error generating random data'));
    }

    function getRevenueReportDataFn(from, to){
      var url = REPORTS_BASE_PATH + URL_SEPARATOR + 'revenue?';

      if(angular.isDefined(from)){
        url += 'from=' + from + QUERY_PARAM_SEPARATOR;
      }
      if(angular.isDefined(to)){
        url += 'to=' + to + QUERY_PARAM_SEPARATOR;
      }

      return $http({
        url: url,
        method: 'GET',
        headers: {
          Authorization: getTokenFromStorageFn()
        }
      })
        .then(handleSuccess, handleError('Error getting revenue data'));
    }

    function handleSuccess(response){
      return response.data;
    }

    function handleError(error){
      return error;
    }
  }
})();

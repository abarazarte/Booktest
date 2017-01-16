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

  function apiServiceFn($http, API_BASE_PATH, store){
    var URL_SEPARATOR = '/';
    var QUERY_PARAM_SEPARATOR = '&';
    var AUTHORS_BASE_PATH = API_BASE_PATH + 'authors';


    return {
      getAuthors: getAuthorsFn,
      getAuthor: getAuthorFn,
      addAuthor: addAuthorFn,
      editAuthor: editAuthorFn,

    };

    function getUserIdFromStorageFn(){
      return store.get('client_token').userId;
    }

    function getTokenFromStorageFn(){
      var token = store.get('client_token');
      return token.tokenType + ' ' + token.token;
    }


    function getAuthorsFn(){
      return $http({
        url: AUTHORS_BASE_PATH,
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

    function handleSuccess(response){
      return response.data;
    }

    function handleError(error){
      return error;
    }
  }
})();

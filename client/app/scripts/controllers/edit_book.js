/**
 * Created by abarazarte on 16/01/17.
 */
(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name clientApp.controller:EditBookCtrl
   * @description
   * # EditBookCtrl
   * Controller of the clientApp
   */
  angular.module('clientApp')
    .controller('EditBookCtrl', editBookCtrlFn);

  function editBookCtrlFn($routeParams, $location, apiService){
    var vm = this;

    vm.loading = {};

    vm.cancel = cancelFn;
    vm.edit = editFn;

    getBookFn();
    getGenresFn();
    getAuthorsFn();

    function cancelFn(){
      $location.path('/authors');
    }

    function getBookFn(){
      apiService.getBook($routeParams.bookId)
        .then(function(book){
          var tmp = {
            _id: book._id,
            title: book.title,
            genre: book.genre,
            publisher: book.publisher,
            publicationDate: new Date(book.publicationDate),
            price: book.price,
            authors: []
          };
          if(angular.isDefined(book.authors)){
            book.authors.map(function(author){
              tmp.authors.push(author._id);
            })
          }
          vm.book = angular.copy(tmp);
        }, function(error){
          console.log(error);
        })
    }

    function editFn(){
      vm.loading.save = true;
      apiService.editBook(vm.book)
        .then(function(data){
          vm.loading.save = false;
          $location.path('/books');
        }, function(error){
          vm.loading.save = false;
          console.log(error);
        })
    }

    function  getGenresFn() {
      apiService.getBookGenres()
        .then(function(genres){
          vm.genres = genres.sort();
        }, function(error){
          console.log(error);
        })
    }

    function getAuthorsFn(){
      apiService.getAuthors()
        .then(function(response){
          vm.authors = response.data;
        }, function(error){
          console.log(error);
        });
    }
  }
})();

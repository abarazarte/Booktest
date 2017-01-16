/**
 * Created by abarazarte on 16/01/17.
 */
(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name clientApp.controller:BooksCtrl
   * @description
   * # BooksCtrl
   * Controller of the clientApp
   */
  angular.module('clientApp')
    .controller('BooksCtrl', booksCtrlFn);

  function booksCtrlFn($location, apiService){
    var vm = this;

    vm.editBook = editBookFn;
    vm.toggleRole = toggleRoleFn;
    vm.createBook = createBookFn;
    vm.deleteSelected = deleteSelectedFn;

    vm.authors = [];
    vm.selected = [];
    vm.allSelected = false;
    vm.loading = {};

    getBooksFn();

    function getBooksFn(){
      apiService.getBooks()
        .then(function(books){
          vm.books = books;
        }, function(error){
          console.log(error);
        });
    }

    function editBookFn(bookId){
      $location.path('/books/' + bookId);
    }

    function createBookFn(){
      $location.path('/books/new');
    }


    function toggleRoleFn(idx) {
      if(vm.allSelected && idx === 'ALL'){
        vm.allSelected = false;
        vm.selected = [];
      }
      else{
        if(idx === 'ALL'){
          vm.selected = vm.books.map(function(book){
            return book._id;
          });
          vm.allSelected = true;
        }
        else{
          if(vm.selected.indexOf(idx) == -1){
            vm.selected.push(idx);
          }
          else{
            vm.selected.splice(vm.selected.indexOf(idx), 1);
          }
        }
      }
    }

    function deleteSelectedFn(){
      vm.loading.delete = true;
      apiService.deleteSelectedBooks(vm.selected)
        .then(function(data){
          vm.loading.delete = false;
          getBooksFn();
        }, function(error){
          vm.loading.delete = false;
          console.log(error);
        })
    }

  }

})();

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

  function booksCtrlFn($scope, $location, apiService){
    var vm = this;

    vm.editBook = editBookFn;
    vm.toggleRole = toggleRoleFn;
    vm.createBook = createBookFn;
    vm.deleteSelected = deleteSelectedFn;
    vm.cancelDeleteSelected = cancelDeleteSelectedFn;

    vm.authors = [];
    vm.books = [];
    vm.totalBooks = 0;
    vm.controls = {
      numPerPage: 10,
      currentPage: 1
    };
    vm.selected = [];
    vm.allSelected = false;
    vm.loading = {};

    getBooksFn();

    $scope.$watch('vm.controls.currentPage', function(newVal, oldVal){
      if(newVal !== oldVal){
        getBooksFn();
      }
    });

    function getBooksFn(){
      apiService.getBooks(vm.controls.numPerPage, vm.controls.currentPage- 1)
        .then(function(response){
          vm.books = response.data;
          vm.totalBooks = response.total;
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
    function cancelDeleteSelectedFn(){
      vm.selected = [];
      vm.allSelected = false;
    }


  }

})();

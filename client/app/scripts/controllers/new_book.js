/**
 * Created by abarazarte on 16/01/17.
 */
(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name clientApp.controller:NewBookCtrl
   * @description
   * # NewBookCtrl
   * Controller of the clientApp
   */
  angular.module('clientApp')
    .controller('NewBookCtrl', newBookCtrlFn);

  function newBookCtrlFn($location, apiService){
    var vm = this;

    vm.loading = {};
    vm.book = {};
    vm.book.publicationDate = new Date();
    vm.genres = [];
    vm.authors = [];

    vm.cancel = cancelFn;
    vm.save = saveFn;

    getGenresFn();
    getAuthorsFn();

    function cancelFn(){
      $location.path('/books');
    }

    function saveFn(){
      vm.loading.save = true;
      apiService.addBook(vm.book)
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

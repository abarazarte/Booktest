/**
 * Created by abarazarte on 16/01/17.
 */
(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name clientApp.controller:EditAuthorCtrl
   * @description
   * # EditAuthorCtrl
   * Controller of the clientApp
   */
  angular.module('clientApp')
    .controller('EditAuthorCtrl', editAuthorCtrlFn);

  function editAuthorCtrlFn($routeParams, $location, apiService){
    var vm = this;

    vm.loading = {};

    vm.cancel = cancelFn;
    vm.edit = editFn;

    getAuthorFn();

    function cancelFn(){
      $location.path('/authors');
    }

    function getAuthorFn(){
      apiService.getAuthor($routeParams.authorId)
        .then(function(author){
          vm.author = author;
        }, function(error){
          console.log(error);
        })
    }

    function editFn(){
      vm.loading.save = true;
      apiService.editAuthor(vm.author)
        .then(function(data){
          vm.loading.save = false;
          console.log(data);
          $location.path('/authors');
        }, function(error){
          vm.loading.save = false;
          console.log(error);
        })
    }
  }
})();

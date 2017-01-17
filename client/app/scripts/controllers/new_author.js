/**
 * Created by abarazarte on 16/01/17.
 */
(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name clientApp.controller:NewAuthorCtrl
   * @description
   * # NewAuthorCtrl
   * Controller of the clientApp
   */
  angular.module('clientApp')
    .controller('NewAuthorCtrl', newAuthorCtrlFn);

  function newAuthorCtrlFn($location, apiService){
    var vm = this;

    vm.loading = {};

    vm.cancel = cancelFn;
    vm.save = saveFn;

    function cancelFn(){
      $location.path('/authors');
    }

    function saveFn(){
      vm.loading.save = true;
      apiService.addAuthor(vm.author)
        .then(function(data){
          vm.loading.save = false;
          $location.path('/authors');
      }, function(error){
          vm.loading.save = false;
          console.log(error);
        })
    }
  }
})();

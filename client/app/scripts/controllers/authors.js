/**
 * Created by abarazarte on 16/01/17.
 */
(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name clientApp.controller:AuthorsCtrl
   * @description
   * # AuthorsCtrl
   * Controller of the clientApp
   */
  angular.module('clientApp')
    .controller('AuthorsCtrl', authorsCtrlFn);

    function authorsCtrlFn(apiService){
      var vm = this;

      vm.authors;

      apiService.getAuthors()
        .then(function(data){
          vm.authors = data;
          console.log(data);
        }, function(error){
          console.log(error);
        })
    }

})();

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

    function authorsCtrlFn($location, apiService){
      var vm = this;

      vm.editAuthor = editAuthorFn;

      vm.authors;

      apiService.getAuthors()
        .then(function(data){
          vm.authors = data;
        }, function(error){
          console.log(error);
        })

      function editAuthorFn(authorId){
        $location.path('/authors/' + authorId);
      }
    }

})();

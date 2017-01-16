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
      vm.toggleRole = toggleRoleFn;
      vm.createAuthor = createAuthorFn;
      vm.deleteSelected = deleteSelectedFn;

      vm.authors = [];
      vm.selected = [];
      vm.allSelected = false;
      vm.loading = {};

      getAuthorsFn();

      function getAuthorsFn(){
        apiService.getAuthors()
          .then(function(data){
            vm.authors = data;
          }, function(error){
            console.log(error);
          });
      }

      function editAuthorFn(authorId){
        $location.path('/authors/' + authorId);
      }

      function createAuthorFn(){
        $location.path('/authors/new');
      }


      function toggleRoleFn(idx) {
        if(vm.allSelected && idx === 'ALL'){
          vm.allSelected = false;
          vm.selected = [];
        }
        else{
          if(idx === 'ALL'){
            vm.selected = vm.authors.map(function(author){
              return author._id;
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
        apiService.deleteSelectedAuthors(vm.selected)
          .then(function(data){
            vm.loading.delete = false;
            console.log(data);
            getAuthorsFn();
          }, function(error){
            vm.loading.delete = false;
            console.log(error);
          })
      }

    }

})();

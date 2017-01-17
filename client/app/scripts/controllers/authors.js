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

    function authorsCtrlFn($scope, $location, apiService){
      var vm = this;

      vm.editAuthor = editAuthorFn;
      vm.toggleRole = toggleRoleFn;
      vm.createAuthor = createAuthorFn;
      vm.deleteSelected = deleteSelectedFn;
      vm.cancelDeleteSelected = cancelDeleteSelectedFn;

      vm.authors = [];
      vm.totalAuthors = 0;
      vm.controls = {
        numPerPage: 10,
        currentPage: 1
      };
      vm.selected = [];
      vm.allSelected = false;
      vm.loading = {};

      getAuthorsFn();

      $scope.$watch('vm.controls.currentPage', function(newVal, oldVal){
        if(newVal !== oldVal){
          getAuthorsFn();
        }
      });


      function getAuthorsFn(){
        apiService.getAuthors(vm.controls.numPerPage, vm.controls.currentPage- 1)
          .then(function(response){
            vm.authors = response.data;
            vm.totalAuthors = response.total;
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

      function cancelDeleteSelectedFn(){
        vm.selected = [];
        vm.allSelected = false;
      }

    }

})();

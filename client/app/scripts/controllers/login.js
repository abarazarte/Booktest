/**
 * Created by abarazarte on 16/01/17.
 */
(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name clientApp.controller:LoginCtrl
   * @description
   * # LoginCtrl
   * Controller of the clientApp
   */
  angular.module('clientApp')
    .controller('LoginCtrl', loginCtrlFn);

    function loginCtrlFn($location, $rootScope, store, authenticationService, apiService) {
      var vm = this;

      vm.loading = {};
      vm.alert = {};

      vm.login = loginFn;

      if(store.get('client_token')){
        $location.path('/');
      }

      function loginFn(){
        authenticationService.clearCredentials();
        $rootScope.loginInProgress = true;
        vm.loading.login = true;
        authenticationService.authenticate(vm.username, vm.password)
          .then(function(data){
            vm.loading.login = false;
            $rootScope.loginInProgress = false;
            $location.path('/authors');
          }, function(error){
            vm.password = '';
            vm.loading.login = false;
            vm.alert = {
              type: 'danger'
            };
            if(error.status <= 0){
              vm.alert.msg = 'Service unavailable';
            }
            else{
              if(error.status === 404 || error.status === 401){
                vm.alert.msg = 'Invalid credentials';
              }
            }
            $rootScope.loginInProgress = false;
          });
      }
    }
})();

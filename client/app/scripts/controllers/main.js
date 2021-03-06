(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name clientApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the clientApp
   */
  angular.module('clientApp')
    .controller('MainCtrl', mainCtrlFn);

  function mainCtrlFn($rootScope, $timeout, $location, utilService, authenticationService){
    var vm = this;

    $('#logout-popup').hide();


    vm.openLogoutModal = openLogoutModalFn;
    vm.logout = logoutFn;
    vm.closeLogoutModal = closeLogoutModalFn;
    vm.isLoggedIn = isLoggedInFn;
    vm.changeLocationTo = changeLocationToFn;
    vm.logout = logoutFn;

    function openLogoutModalFn(){
      $('#logout-popup').addClass('animated fadeIn');
      $('#logout-popup').show();
    }

    function closeLogoutModalFn(){
      $('#logout-popup').removeClass('animated fadeOut');
      $('#logout-popup').hide();
    }

    function isLoggedInFn(){
      var token = utilService.isLoggedIn() || {};
      return angular.isDefined(token.userId) && !$rootScope.loginInProgress;
    }

    function changeLocationToFn(location){
      $location.path(location);
    }

    function logoutFn(){
      authenticationService.clearCredentials();
      $timeout(function(){
        $location.path('/login');
      }, 100);
    }

  }

})();

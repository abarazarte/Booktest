(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name clientApp
   * @description
   * # clientApp
   *
   * Main module of the application.
   */
  angular
    .module('clientApp', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'ui.bootstrap',
      'angular-storage',
      'angular-ladda',
      'config',
      'daterangepicker'
    ])
    .config(configurationFn)
    .run(runBlock);

  configurationFn.$inject = ['$routeProvider', '$httpProvider'];
  function configurationFn($routeProvider,$httpProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      })
      .when('/authors', {
        templateUrl: 'views/authors.html',
        controller: 'AuthorsCtrl',
        controllerAs: 'vm'
      })
      .when('/authors/new', {
        templateUrl: 'views/new_author.html',
        controller: 'NewAuthorCtrl',
        controllerAs: 'vm'
      })
      .when('/authors/:authorId', {
        templateUrl: 'views/edit_author.html',
        controller: 'EditAuthorCtrl',
        controllerAs: 'vm'
      })
      .when('/books', {
        templateUrl: 'views/books.html',
        controller: 'BooksCtrl',
        controllerAs: 'vm'
      })
      .when('/books/new', {
        templateUrl: 'views/new_book.html',
        controller: 'NewBookCtrl',
        controllerAs: 'vm'
      })
      .when('/books/:bookId', {
        templateUrl: 'views/edit_book.html',
        controller: 'EditBookCtrl',
        controllerAs: 'vm'
      })
      .when('/reports/revenue', {
        templateUrl: 'views/revenue_report.html',
        controller: 'RevenueReportCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/authors'
      });
  }

  runBlock.$inject = ['$rootScope', '$location', 'store', '$http', 'authenticationService', '$timeout'];
  function runBlock($rootScope, $location, store, $http, authenticationService, $timeout) {
    $rootScope.$on('$locationChangeStart', function (event, next, current) {

      var restrictedPage = $location.path() === '/login';
      var authenticated;
      if (store.get('client_token')) {
        if (store.get('client_token').userId) {
          authenticated = true;
        }
      }
      if (!restrictedPage && !authenticated) {
        authenticationService.clearCredentials();
        $timeout(function () {
          $location.path('/login');
        }, 100);
      }
    });
  }
})();

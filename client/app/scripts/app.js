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
    'config'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
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
      .otherwise({
        redirectTo: '/'
      });
  });

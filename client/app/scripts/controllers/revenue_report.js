/**
 * Created by abarazarte on 16/01/17.
 */
(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name clientApp.controller:RevenueReportCtrl
   * @description
   * # RevenueReportCtrl
   * Controller of the clientApp
   */
  angular.module('clientApp')
    .controller('RevenueReportCtrl', revenueReportCtrlFn);

  function revenueReportCtrlFn($location, apiService){
    var vm = this;

    vm.sales = [];
    vm.loading = {};

    vm.generateRandomData = generateRandomDataFn;

    getReportFn();

    function getReportFn(){
      apiService.getRevenueReportData()
        .then(function(sales){
          vm.sales = sales;
        }, function(error){
          console.log(error);
        });
    }

    function generateRandomDataFn(){
      vm.loading.generate = true;
      apiService.generateRandomData()
        .then(function(data){
          vm.loading.generate = false;
          getReportFn();
        }, function(error){
          vm.loading.generate = false;
          console.log(error)
        })
    }

  }

})();

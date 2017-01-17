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
    vm.filter = {
      date: {
        startDate: moment().subtract(1, 'years').hours(0).minutes(0).seconds(0).milliseconds(0),
        endDate: moment().hours(23).minutes(59).seconds(59).milliseconds(999),
        opts: {
          timePicker: false,
          timePicker24Hour: true,
          locale: {
            applyClass: 'btn-green',
            applyLabel: "Apply",
            fromLabel: "From",
            format: "MM/DD/YYYY",
            toLabel: "To",
            cancelLabel: 'Cancel',
            customRangeLabel: 'Custom range'
          },
          ranges: {
            'Today': [moment().hours(0).minutes(0).seconds(0).milliseconds(0), moment().hours(23).minutes(59).seconds(59).milliseconds(999)],
            'Yesterday': [moment().subtract(1, 'days').hours(0).minutes(0).seconds(0).milliseconds(0), moment().subtract(1, 'days').hours(23).minutes(59).seconds(59).milliseconds(999)],
            'Last Week': [moment().subtract(7, 'days').hours(0).minutes(0).seconds(0).milliseconds(0), moment().hours(23).minutes(59).seconds(59).milliseconds(999)],
            'Last Month': [moment().subtract(1, 'months').hours(0).minutes(0).seconds(0).milliseconds(0), moment().hours(23).minutes(59).seconds(59).milliseconds(999)],
            'Last 3 Months': [moment().subtract(3, 'months').hours(0).minutes(0).seconds(0).milliseconds(0), moment().hours(23).minutes(59).seconds(59).milliseconds(999)],
            'Last 6 Months': [moment().subtract(6, 'months').hours(0).minutes(0).seconds(0).milliseconds(0), moment().hours(23).minutes(59).seconds(59).milliseconds(999)],
            'Last Year': [moment().subtract(1, 'years').hours(0).minutes(0).seconds(0).milliseconds(0), moment().hours(23).minutes(59).seconds(59).milliseconds(999)],
            'All': [moment().year(2015).month(10).days(1).hours(0).minutes(0).seconds(0).milliseconds(0), moment().hours(23).minutes(59).seconds(59).milliseconds(999)]
          }
        }
      }
    };


    vm.generateRandomData = generateRandomDataFn;
    vm.getReport = getReportFn;
    vm.redirectTo = redirectToFn;

    getReportFn();

    function getReportFn(){
      vm.loading.report = true;
      apiService.getRevenueReportData(vm.filter.date.startDate.unix(), vm.filter.date.endDate.unix())
        .then(function(sales){
          vm.loading.report = false;
          vm.sales = sales;
        }, function(error){
          vm.loading.report = false;
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

    function redirectToFn(location){
      $location.path(location);
    }

  }

})();

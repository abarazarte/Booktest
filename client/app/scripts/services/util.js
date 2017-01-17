(function(){
  /**
   * @ngdoc service
   * @name clientApp.utilService
   * @description
   * # utilService
   * Service in the clientApp.
   */
  angular.module('clientApp')
    .service('utilService', utilServiceFn);

  function utilServiceFn(store){
    return {
      isLoggedIn: isLoggedInFn,
      toStringDate: toStringDateFn
    };

    function isLoggedInFn(){
      return store.get('client_token');
    }

    function toStringDateFn(date, format){
      if(angular.isUndefined(format)){
        return date.format();
      }else{
        return date.format(format);
      }
    }

  }
})();

(function(){
  /**
   * @ngdoc service
   * @name clientApp.apiService
   * @description
   * # apiService
   * Service in the neksoFeDriverApp.
   */
  angular.module('clientApp')
    .service('apiService', apiServiceFn);

  function apiServiceFn($http, API_BASE_PATH, store){
    var URL_SEPARATOR = '/';
    var QUERY_PARAM_SEPARATOR = '&';
    var AUTHORS_BASE_PATH = API_BASE_PATH + 'authors';


    return {
      getAuthors: getAuthorsFn,
      addAuthor: addAuthorFn,
      // getPictureUrl: getPictureUrlFn,
      // changePassword: changePasswordFn,
      // getRides: getRidesFn,
      // getRidesSummary: getRidesSummaryFn,
      // getReferralContent: getReferralContentFn,
      // getAchievements: getAchievementsFn,
      // getAchievementsHistory: getAchievementsHistoryFn,
      // getMercadoPagoInfo: getMercadoPagoInfoFn,
      // linkMercadoPagoAccount: linkMercadoPagoAccountFn,
      // unlinkMercadoPagoAccount: unlinkMercadoPagoAccountFn,
      // sendContactUsMail: sendContactUsMailFn,
      // getReferrals: getReferralsFn,
      // getReferralsCount: getReferralsCountFn,
      // getCountries: getCountriesFn,
      // getCities: getCitiesFn,
      // getControllers: getControllersFn,
      // getCarMakers: getCarMakersFn,
      // getCars: getCarsFn,
      // getYears: getYearsFn,
      // sendVerificationCode: sendVerificationCodeFn,
      // editProfile: editProfileFn,
      // uploadPicture: uploadPictureFn,
      // updateBankAccountInfo: updateBankAccountInfoFn,
      // getBanks: getBanksFn
    };

    function getUserIdFromStorageFn(){
      return store.get('client_token').userId;
    }

    function getTokenFromStorageFn(){
      var token = store.get('client_token');
      return token.tokenType + ' ' + token.token;
    }


    function getAuthorsFn(){
      return $http({
        url: AUTHORS_BASE_PATH,
        method: 'GET',
        headers: {
          Authorization: getTokenFromStorageFn()
        }
      })
        .then(handleSuccess, handleError('Error getting authors'));
    }

    function addAuthorFn(author){
      return $http({
        url: AUTHORS_BASE_PATH,
        method: 'POST',
        data: author,
        headers: {
          Authorization: getTokenFromStorageFn()
        }
      })
        .then(handleSuccess, handleError('Error adding author'));
    }

    function handleSuccess(response){
      return response.data;
    }

    function handleError(error){
      return error;
    }
  }
})();

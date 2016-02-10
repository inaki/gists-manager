angular.module('gistEditor', ['ui.router','ui.ace', 'ngAnimate'])
.config(function($stateProvider, $urlRouterProvider){

      $urlRouterProvider.otherwise("/gist");

      $stateProvider
        .state('gist', {
            url: '/gist',
            templateUrl: 'partials/gist.html',
            controller: 'MainCtrl'
        })
        .state('gist.code', {
          url: '^/gist/:id',
          views: {
            '@': {
              templateUrl: 'partials/gist.code.html',
              controller: 'MainCtrl'
            }
          },
        });
})
.controller('MainCtrl', function($scope, $http, $state, $stateParams){
  // Simple GET request example:
  $http({
    method: 'GET',
    url: // your url with token
  }).then(function successCallback(response) {
    $scope.gists = response.data;
    $scope.gist = $scope.gists[$stateParams.id];
    }, function errorCallback(response) {});

    $scope.aceLoaded = function(_editor) {
      var gistCode = $scope.gist;
      var file_names = [];
      // get the name of the gist file
      for (name in gistCode["files"]){ file_names.push(name);}

      var url = gistCode["files"][file_names[0]].raw_url.toString();

      $http.get(url).then(function(response){
        $scope.rawCode = response.data;
      });

      //console.log(gistCode["files"][file_names[0]].raw_url.toString());
      $scope.aceSession = _editor.getSession();

    };

    $scope.privacy = undefined;

    $scope.sendPrivacy = function (status) {
        if (status == 'private') {
          return $scope.privacy = false;
        } else if(status == 'public') {
          return $scope.privacy = true;
        } else if (status == 'all') {
          return $scope.privacy = undefined;
        }
     };

    // mark the active gist
    $scope.selected = 0;

      $scope.select= function(index) {
         $scope.selected = index;
         console.log(index);
      };


});

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
  // GET request to github gist API
  $http({
    method: 'GET',
    url: 'https://api.github.com/users/{user}/gists?access_token= '+ token +'';
  }).then(function successCallback(response) {
    $scope.gists = response.data;
    $scope.gist = $scope.gists[$stateParams.id];
  }, function errorCallback(errorMsg) {
      console.log('oh oh ' + errorMsg + ' happen!');
  });

  // code for geting the code and inserted on the ACE editor
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

    // variable that help us start with the list of all the gists, part of public/private filter
    $scope.privacy = undefined;

    // function for the public/private/all filter
    $scope.sendPrivacy = function (status) {
        if (status == 'private') {
          $('.btn').click(function(e){
            $('.btn').removeClass('btn-active');
            $(this).addClass('btn-active');
            e.stopPropagation();
          });
          return $scope.privacy = false;
        } else if(status == 'public') {
          $('.btn').click(function(e){
            $('.btn').removeClass('btn-active');
            $(this).addClass('btn-active');
            e.stopPropagation();
          });
          return $scope.privacy = true;
        } else if (status == 'all') {
          $('.btn').click(function(e){
            $('.btn').removeClass('btn-active');
            $(this).addClass('btn-active');
            e.stopPropagation();
          });
          return $scope.privacy = undefined;
        }
     };

     console.log($scope.privacy);

    // for marking the active gist and help the arrow to be in his place
    $scope.selected = 0;

    $scope.select= function(index) {
      $scope.selected = index;
    };


});

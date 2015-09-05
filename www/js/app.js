// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

// add controller
.controller('ListController', ['$scope', '$http', '$state',
    function($scope, $http, $state) {
    $http.get('js/data.json').success(function(data) {
      console.log(data.bigPlayers);
      $scope.bigPlayers = data.bigPlayers;

      $scope.onItemDelete = function(item){
        $scope.bigPlayers.splice($scope.bigPlayers.indexOf(item), 1);
      }

      $scope.toggleStar = function(item){
        item.star = !item.star;
      }

      $scope.doRefresh = function(){
         $http.get('js/data.json').success(function(data) {
          $scope.bigPlayers = data.bigPlayers;
          $scope.$broadcast('scroll.refreshComplete');
          
        });
      }

      $scope.moveItem = function(item, fromIndex, toIndex){
        //splice(index at what position add remove items, howmany to remove to replace the new one, item1, item2..itemx)
        $scope.bigPlayers.splice(fromIndex, 1);
        $scope.bigPlayers.splice(toIndex, 0, item);
      };
    });
}]);


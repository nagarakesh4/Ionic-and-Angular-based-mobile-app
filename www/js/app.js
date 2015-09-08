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

//config
.config(function($stateProvider, $urlRouterProvider){
  //this doesn't actually load the tabs, but is just an abstract (true) that contains tabs
  $stateProvider
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
   
    //sub view - for child home tab in the parent tabs show the home page (no controller needed)
    .state('tabs.home', {
      url: '/home',
      views: {
        'home-tab':{
          templateUrl: 'templates/home.html'
        }
      }
    })

    //sub view - for child list tab in the parent tabs show the lists
    .state('tabs.list', {
      url: '/list',
      views: {
        'list-tab':{
          templateUrl: 'templates/list.html',
          controller: 'ListController'
        }
      }
    })

    //sub view - for child details tab in the parent list tabs show the details of each list
    // the view name doesn;t change because this is the child of lists template, both will have same view name (part of same tab)
    .state('tabs.details', {
      url: '/list/:name',
      views: {
        'list-tab':{
          templateUrl: 'templates/details.html',
          controller: 'ListController'
        }
      }
    })

    .state('tabs.calendar', {
      url: '/calendar',
      views: {
        'calendar-tab':{
          templateUrl: 'templates/calendar.html',
          controller: 'CalendarController'
        }
      }
    })
    
    $urlRouterProvider.otherwise('/tab/home');//goes to the above sub view
})

.controller('CalendarController', ['$scope', '$http', '$state',
    function($scope, $http, $state) {
    $http.get('js/data.json').success(function(data) {
      console.log(data.calendar);
      $scope.calendar = data.calendar;

      //fix for order and minus not opening once primary and secondary are declared for them which was written to avoid the hiding of
      //these buttons once  <ion-nav-back-button> is enabled
      $scope.data = {showDelete: false, showReorder: false}

      $scope.onItemDelete = function(selectedDayIndex, item){
        //see data if the below is not sensible
        $scope.calendar[selectedDayIndex].schedule.splice($scope.calendar[selectedDayIndex].schedule.indexOf(item), 1);
      }

       $scope.toggleStar = function(item){
        item.star = !item.star;
      }

      $scope.doRefresh = function(){
         $http.get('js/data.json').success(function(data) {
          $scope.calendar = data.calendar;
          $scope.$broadcast('scroll.refreshComplete');
          
        });
      }
    });
}])

// add controller
.controller('ListController', ['$scope', '$http', '$state',
    function($scope, $http, $state) {
    $http.get('js/data.json').success(function(data) {
      console.log(data.bigPlayers);
      $scope.bigPlayers = data.bigPlayers;
      $scope.selectedPlayer = $state.params.name;

      //fix for order and minus not opening once primary and secondary are declared for them which was written to avoid the hiding of
      //these buttons once  <ion-nav-back-button> is enabled
      $scope.data = {showDelete: false, showReorder: false}

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


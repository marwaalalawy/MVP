angular.module('map', [
  'map.home',
  'ngMap',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/home/home.html',
      controller: 'home'
    })    
})

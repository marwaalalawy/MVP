angular.module('map.home', [])
.factory('apiConn', function($http){
  return {
   getCoor : function(lat, lng) {
    $http({
      method: 'GET',
      url: 'http://getcitydetails.geobytes.com/GetCityDetails?callback=?&latitude='+lat+'&longitude='+lng,
    })
    .then(function (resp) {
      return resp;
    });
    }
  }
})
.controller('home', function ($scope, $window, $location,$http, NgMap, apiConn) {
  //$scope.key = 'AIzaSyBnAXeDUFuMb_ffGXglGm3tnMd79_EVHng'; //google maps api key
  $scope.details ='';
  google.maps.event.addListener(googlemap, 'click', function(event) {
    placeMarker(event.latLng);
  });
  $scope.placeMarker = function(e) {// place marker on the map and get the location coords
    if ($window.marker) {
      $window.marker.setMap(null);
    }
    $window.marker = new google.maps.Marker({position: e.latLng, map: $scope.map});
    $scope.map.panTo(e.latLng);
    $scope.locationID={
      lat:e.latLng.lat(),
      lng :e.latLng.lng()
    }
    $scope.getElevation();
    $scope.getCityDetails();
  }

  $scope.getElevation = function(){
    $.ajax({
      type: 'GET',
      crossDomain:true,
      dataType: "json",
      url:/*'http://128.199.51.242/data?lat='+$scope.locationID.lat+'&lng='+$scope.locationID.lng+'&fields=geo',*/'http://www.elevationapi.xyz/api/v1/point/'+$scope.locationID.lat+'/'+$scope.locationID.lng,
      success: function(data) {
        //console.log(data)
        $scope.elevation = 'Elevation: '+data+' meters';
      },
      error: function(){ console.log('error');} 
    }); 
  }

  $scope.getCityDetails = function(){
  //   $.ajax({
  //     type: 'GET',
  //     dataType: "json",
  //           headers: {
  //       'Access-Control-Allow-Origin': '*'
  //     },
  //     url:'https://getcitydetails.geobytes.com/GetCityDetails?callback=?&latitude='+$scope.locationID.lat+'&longitude='+$scope.locationID.lng,
  //     success: function(data) {
  //       console.log(data)

  //     },
  //     error: function(){ console.log('error');} 
  //   }); 
  // }
  var data = apiConn.getCoor($scope.locationID.lat, $scope.locationID.lng);
  $scope.geobytestitle = 'geobytestitle : ' + data.geobytestitle;
  $scope.geobytescity = 'geobytescity : ' + data.geobytescity;
  $scope.geobytesmapreference = 'geobytesmapreference : ' + data.geobytesmapreference;
  $scope.geobytesregionlocationcode = 'geobytesregionlocationcode : ' + data.geobytesregionlocationcode;
  $scope.geobytestimezone = 'geobytestimezone : ' + data.geobytestimezone;

}
});


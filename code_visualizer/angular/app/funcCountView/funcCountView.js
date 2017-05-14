'use strict';

angular.module('myApp.funcCountView', ['ngRoute', 'xml'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/funcCountView', {
    templateUrl: 'funcCountView/funcCountView.html',
    controller: 'funcCountViewCtrl'
  });
}])

.controller('funcCountViewCtrl', ['x2js', '$scope', '$http', 'sharedProperties','$location', function(x2js, $scope, $http, sharedProperties,$location) {
    var responseObject;
    if(sharedProperties.getUrl() != '') {
        var req = {
            method: 'GET',
            url: 'http://25.22.141.161:8080/api/analyse/funcCount?repoUrl='+sharedProperties.getUrl(),
            headers: {
                'Content-Type': 'application/xml'
            }
        };
        console.log(req);
        $http(req).then(function succ(response) {
            responseObject = response;
            console.log(response);
            fillChart();
        }, function err(response) {
            console.log(response);
        });
        console.log("function ended");
    } else {
        $location.path("/");
    }

    var fillChart = function() {
        console.log(responseObject.data);
        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.data = responseObject.data;
        $scope.options = {
            scales: {
            yAxes: [
                {
                id: 'y-axis-1',
                type: 'linear',
                display: true,
                position: 'left'
                },
                {
                id: 'y-axis-2',
                type: 'linear',
                display: true,
                position: 'right'
                }
            ]
            }
        };
    };

    


}]);
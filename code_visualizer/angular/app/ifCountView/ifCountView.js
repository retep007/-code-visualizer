'use strict';

angular.module('myApp.ifCountView', ['ngRoute', 'xml'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ifCountView', {
    templateUrl: 'ifCountView/ifCountView.html',
    controller: 'ifCountViewCtrl'
  });
}])

.controller('ifCountViewCtrl', ['x2js', '$scope', '$http', 'sharedProperties','$location', function(x2js, $scope, $http, sharedProperties,$location) {
    $scope.graphShow = false;
    var responseData;
    if(sharedProperties.getUrl() != '') {
        var req = {
            method: 'GET',
            url: sharedProperties.getApiUrl() + '/api/analyse/ifCount?repoUrl='+sharedProperties.getUrl(),
            headers: {
                'Content-Type': 'application/xml',
                'Accept': 'application/xml'
            },
            data: ''
        };
        console.log(req);
        $http(req).then(function succ(response) {
            responseData = x2js.xml_str2json(response.data);
            fillChart();
        }, function err(response) {
            console.log(response);
            alert("Error loading data.");
            $location.path("/");
        });
    } else {
        $location.path("/");
    }

    var fillChart = function() {
        $scope.graphShow = true;
        $scope.loadingHide = true;
        $scope.data = []
        $scope.labels = [-90, -80, -70, -60, -50, -40, -30, -20, -10, 0];
        for(var i = responseData.versions.version.length - 1; i >=0; i--) {
            $scope.data.push(responseData.versions.version[i].if);
        }
        $scope.options = {
            scales: {
            yAxes: [
                {
                id: 'y-axis-1',
                type: 'linear',
                display: true,
                position: 'left'
                }
            ]
            }
        };
        $scope.datasets = {
            fill: false,
            borderColor: "#CF5C36"
        };
        
    };
}]);
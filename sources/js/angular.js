//very basic angular program which retrienves array from the mongodb 
//and prints it in an array 
var app=angular.module('appl',[]);
app.controller('ctrl',function($scope,$http)
{
    $http.get('/notevalues').then(function(response)
    {
        console.log('here');
        console.log(response.data);
       $scope.obj=response.data;
    })
})
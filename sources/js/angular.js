//very basic angular program which retrienves array from the mongodb 
//and prints it in an array 
var app=angular.module('appl',[]);
app.controller('ctrl',function($scope,$http)
{   console.log("sent request to db");
    $http.post('/notevalues').then(function(response)
    {
        console.log('here data recieved');
        console.log(response.data);
       $scope.obj=response.data;
    })
})
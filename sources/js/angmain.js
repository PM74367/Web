var myapp=angular.module('myapp',[]);
myapp.controller('myctrl',function($scope,$http)
{
    $http.get('/userdata').then(function(response)
    {
       var obj=response.data;
       $scope.name=obj.name;
       $scope.email=obj.email;
    })
})
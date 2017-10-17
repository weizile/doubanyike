angular.module('controllers',['directives'])
.controller('navController',['$scope',function($scope){
    $scope.navName=[
        {url:'#!/today',icon:'icon-home',name:'今日一刻'},
        {url:'#!/older',icon:'icon-file-empty',name:'往期内容'},
        {url:'#!/author',icon:'icon-pencil',name:'热门作者'},
        {url:'#!/category',icon:'icon-menu',name:'栏目浏览'},
        {url:'#!/favourite',icon:'icon-heart',name:'我的喜欢'},
        {url:'#!/settings',icon:'icon-cog',name:'设置'},
    ]
}])
.controller('todayController',['$http','$scope','$filter','$rootScope',function($http,$scope,$filter,$rootScope){
    var now = new Date();
    var nowTime = $filter('date')(now,'yyyy-MM-dd');
    var date = $filter('date')(now,'ddMMM');
    $scope.type1 = 'today';
    $rootScope.bigTitle = '今日一刻';
    $scope.date = date;
    $rootScope.showin = false;
    $rootScope.noshowin = true;
        $http({
            url:"./api/today.php",
            method:'GET',
            params:{nowTime:nowTime}
        }).then(function successCallback(response){
           $scope.posts = response.data.posts;
            $rootScope.showin = true;
            $rootScope.noshowin = false;
        })
}])
.controller('postTodayController',['$http','$scope','$routeParams','$filter',function($http,$scope,$routeParams,$filter){
    $scope.postid = $routeParams.postId;
    var now = new Date();
    var nowTime = $filter('date')(now,'yyyy-MM-dd');
    var date = $filter('date')(now,'ddMMM');
    $scope.noshowin = true;
    $http({
        url:"./api/today.php",
        method:'GET',
        params:{nowTime: nowTime}
    }).then(function successCallback(response){
        $scope.posts = response.data.posts;
        $scope.noshowin = false;
    })
}])
.controller('olderController',['$http','$scope','$rootScope',function($http,$scope,$rootScope){
    $scope.type1 = 'older';
    $rootScope.showin = false;
    $rootScope.noshowin = true;
    $rootScope.bigTitle = '往期内容';
    $http({
        url:"./api/older.php",
        method:'GET'
    }).then(function successCallback(response){
        $scope.posts = response.data.posts;
        $scope.date = response.data.date;
        $rootScope.showin = true;
        $rootScope.noshowin = false;
    })
}])
    .controller('postOlderController',['$http','$scope','$routeParams',function($http,$scope,$routeParams){
        $scope.postid = $routeParams.postId;
        $scope.noshowin = true;
        $http({
            url:"./api/older.php",
            method:'GET',
        }).then(function successCallback(response){
            $scope.posts = response.data.posts;
            $scope.noshowin = false;
        })
    }])
.controller('authorComController',['$http','$scope','$rootScope',function($http,$scope,$rootScope){
    $rootScope.showin = false;
    $rootScope.noshowin = true;
    $rootScope.bigTitle = '热门作者';
    var count = 0;
    $scope.authorsHotMore = [];
    $scope.load = false;
    $scope.more = function(){
        $http({
            url:'./api/authormore.php',
            method:'GET',
            params:{step:count}
        }).then(function successCallback(response){
            $scope.authorsHotMore = $scope.authorsHotMore.concat(response.data.authors);
            if($scope.authorsHotMore.length >= response.data.total){
                $scope.load = false;
            }
            else{
                $scope.load = true;
            }
            count += 20;
        })
    };
        $http({
            url:"./api/author-com.php",
            method:'GET'
        }).then(function successCallback(response){
           $scope.authorsCom = response.data.authors;
            $rootScope.showin = true;
            $rootScope.noshowin = false;
        })
}])
.controller('centerController',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
        $scope.showin = false;
        $scope.noshowin = true;
    var personID = $routeParams.id;
        $http({
            url:'./api/person.php',
            method:'GET',
            params:{type:personID}
        }).then(function successCallback(response){
            $scope.person = response.data;
            $scope.showin = true;
            $scope.noshowin = false;
        })
}])
.controller('categoryController',['$http','$scope','$rootScope',function($http,$scope,$rootScope){
    $rootScope.noshowin = true;
    $rootScope.bigTitle = '栏目浏览';
        $http({
            url:"./api/category.php",
            method:'GET'
        }).then(function successCallback(response){
            $scope.columns = response.data.columns;
            $rootScope.noshowin = false;
        })
}])
.controller('listController',['$http','$scope','$routeParams',function($http,$scope,$routeParams){
    var listID = $routeParams.listId;
    $scope.showin = false;
    $scope.noshowin = true;
    $http({
        url:'./api/list.php',
        method:'GET',
        params:{listId : listID}
    }).then(function successCallback(response){
        $scope.infoTop = response.data.column;
        $scope.posts = response.data.posts;
        $scope.showin = true;
        $scope.noshowin = false;
    })
}])

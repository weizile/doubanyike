var yike = angular.module('yike',['controllers','ngRoute','infinite-scroll','ngSanitize']);
yike.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/today',{
        templateUrl:'./views/today.html',
        controller:'todayController'
    }).when('/older',{
        templateUrl:'./views/older.html',
        controller:'olderController'
    })
        .when('/author',{
            templateUrl:'./views/author.html',
            controller:'authorComController'
        })
        .when('/category',{
            templateUrl:'./views/category.html',
            controller:'categoryController'
        })
        .when('/favourite',{
        templateUrl:'./views/favourite.html'
    })
        .when('/settings',{
            templateUrl:'./views/settings.html'
        })
        .when('/author/:id',{
            templateUrl:'./views/center.html',
            controller:'centerController'
        })
        .when('/category/:listId',{
            templateUrl:'./views/list.html',
            controller:'listController'
        })
        .when('/today/:postId',{
            templateUrl:'./views/post-today.html',
            controller:'postTodayController'
        })
        .when('/older/:postId',{
            templateUrl:'./views/post-older.html',
            controller:'postOlderController'
        })
        .otherwise({
        redirectTo:'/today'
    });
}]);
yike.run(['$rootScope',function($rootScope){
    $rootScope.collapsed = false;
    $rootScope.bigTitle = '今日一刻';
    $rootScope.toggle = function() {
        $rootScope.collapsed = !$rootScope.collapsed;
        var tips = document.querySelectorAll('.navs dd');
        if ($rootScope.collapsed) {
            for (var i = 0; i < tips.length; i++) {
                tips[i].style.transform = 'translate(0)';
                tips[i].style.transitionDelay = '0.2s';
                tips[i].style.transitionDuration = (i + 1) * 0.15 + 's';
            }
        }
        else {
            for (var j = tips.length; j > 0; j--) {
                tips[j - 1].style.transform = 'translate(-100%)';
                tips[j - 1].style.transitionDelay = '';
                tips[j - 1].style.transitionDuration = (tips.length - j+1) * 0.15 + 's';
            }
        }
    }
    }]);


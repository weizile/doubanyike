/**
 * Created by Administrator on 2017/10/14 0014.
 */
angular.module('directives',[])
.directive('post',function(){
    return{
        restrict:'E',
        replace:true,
        templateUrl:'./views/post-model.html'
    }
})
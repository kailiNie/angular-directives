 /**
  * @Author   NieKaili
  * @DateTime 2017-09-08
  * @des            [禁止输入空格 input 输入框需要写上 ng-trim = 'fasle' 重置默认值true 输入空格的时候也调用监听事件
  *                 1.此方法兼容手机端：如果只需要兼容pc端用键码 阻止事件就可以 这样效率更高 体验更好 ]
  *                 
  *                <input type="text"  ng-model ='name'  class="form-control"  yp-distrim  ng-trim='false'  placeholder="禁止输入空格">
  * @return   { }    
  */
 (function() {
     'use strict';
     angular.module('app', []).directive('ypDistrim', ypDistrim);

     function ypDistrim($parse) {
         return {
             restrict: "A",
             require: "ngModel",
             link: function(scope, ele, attrs, ctrl) {
                 if (!ctrl) return;
                 var oldValue, disabled = false;
                 //记录之前的值
                 ele.on('keydown', function(event) {
                     oldValue = ctrl.$viewValue;
                     //只支持pc端写法
                     /*     if(event.keyCode === 32){
                              event.preventDefault()
                          };*/
                 });
                 // 支持手机端/pc端写法
                 ctrl.$viewChangeListeners.push(function() {
                     var reg = /\s/;
                     disabled = reg.test(ctrl.$viewValue);
                     try {
                         if (disabled) {
                             $parse(attrs.ngModel).assign(scope, oldValue);
                         }
                     } catch (e) {
                         //如果出现不合格的数字 系统默认给1个0的值
                         $parse(attrs.ngModel).assign(scope, '');
                     }
                 });
             }
         }
     }
     ypDistrim.$inject = ['$parse'];
 })();
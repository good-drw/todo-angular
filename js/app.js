(function (angular) {
	'use strict';
	//创建模块
	angular.module('myApp', [])
		//注册控制器
		.controller('myController', ['$scope','$location', function($scope,$location){
			//初始化
			//给文本框添加一个模型
			$scope.text = '';
			$scope.data = [
				{'id':1,'text':'学习','completed':false},
				{'id':2,'text':'睡觉','completed':false},
				{'id':3,'text':'游戏','completed':false},
				{'id':4,'text':'上班','completed':true}
			];
			//添加
			$scope.add = function() {
				//判断为空时,不能添加
				if($scope.text == '') {
					return;
				}
				//Math.random() 防止ID出现重复的情况
				$scope.data.push({
					'id':Math.random(),
					'text':$scope.text,
					'completed':false
				});
				//清空文本框
				$scope.text = '';
			};
			//删除
			$scope.delete = function(id) {
				for(var i = 0; i < $scope.data.length; i++) {
					if(id === $scope.data[i].id) {
						$scope.data.splice(i, 1);
						break;
					}
				}
			};
			//删除所有
			$scope.deleteAll = function() {
				var result = [];
				for(var i = 0; i < $scope.data.length; i++) {
					if(!$scope.data[i].completed) {
						result.push($scope.data[i]);
					}
				}
				$scope.data = result;
			};
			//当事件都没完成时,隐藏clear
			$scope.show = function() {
				for(var i = 0; i < $scope.data.length; i++) {
					if($scope.data[i].completed) {
						return true;
					}
				}
				return false;
			};
			//当前编辑哪个元素
			$scope.activeEditingId = -1;
			$scope.editing = function(id) {
				$scope.activeEditingId = id;
			};
			//回车确定修改
			$scope.save = function() {
				$scope.activeEditingId = -1;
			};
			//全选
			var now = true;
			$scope.toggle = function() {
				for(var i = 0 ; i < $scope.data.length; i++) {
					$scope.data[i].completed = now;
				}
				now = !now;
			};
			//状态筛选
			$scope.selector = {};
			//让$scope也有一个指向$location的数据成员
			$scope.$location = $location;
			//注意: watch只能监视属于$scope的成员
			$scope.$watch('$location.path()',function(now , old) {
				switch(now) {
				case '/active':
					$scope.selector = {completed:false};
					break;
				case '/completed':
					$scope.selector = {completed:true};
					break;
				default:
					$scope.selector = {};
					break;
			}
			});
		}]);

})(angular);

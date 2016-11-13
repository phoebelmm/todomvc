(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	angular.module('myApp',[]).controller('MainController',['$scope','$location',function($scope,$location){

		var getId = function(){
			
			var id = Math.random();
			console.log(id);
			for(var i = 0;i <$scope.todos.length; i++){
				if($scope.todos.id == id){
					id = getId();
					break;
				}
			}
			return id;

		}

		
		// 数据绑定
		$scope.text='';
		$scope.todos=[
			{
				id:0.11,
				text: '吃饭',
				complete: true
			},{
				id:0.12,
				text: '睡觉',
				complete: false
			},{
				id:0.13,
				text: '打豆豆',
				complete: false
			}
		];

		//添加toso
		$scope.add = function(){
			if($scope.text){

				$scope.todos.push({
					id: getId(),
					text: $scope.text,
					complete: false
				});
			}
			$scope.text='';
		}
		// 点击删除
		$scope.remove = function(id){
			for (var i = 0;i < $scope.todos.length; i++){
				if($scope.todos[i].id === id){
					$scope.todos.splice(i,1);
				}
			}
		}

		//处理清除
		$scope.clear = function(){
			var result = [];
			for (var i = 0;i <$scope.todos.length; i++){
				if($scope.todos[i].complete == false){
					result.push($scope.todos[i]);
				}
			}
			$scope.todos=result;
		}

		// 是否有已经完成的
		$scope.existComplete = function(){
			for(var i = 0; i< $scope.todos.length; i++ ){
				if($scope.todos[i].complete){
					return true;
				}
			}
			return false;
		}
		//当前编辑的Id
		$scope.currentEditingId = -1;
		$scope.editing = function(id){
			$scope.currentEditingId = id;
		}
		$scope.save = function(){
			$scope.currentEditingId = -1;
		}

		// 全选
		var now = true;
		$scope.selectAll = function(){
			for(var i= 0; i<$scope.todos.length; i++){
				$scope.todos[i].complete= now;
			}
			now= !now;
		}
		// 筛选
		$scope.selector = {};
		$scope.$location = $location;
		$scope.$watch('$location.path()',function(now,old){
			switch(now){
				case '/active':
				$scope.selector = { complete: false };
				break;
				case '/completed':
				$scope.selector = { complete: true };
				break;
				default:
				$scope.selector = {};
				break;
			}
		})
		 $scope.equalCompare = function(source, target) {
       		return source === target;
    };

	}])

})(angular);

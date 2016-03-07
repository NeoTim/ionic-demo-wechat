angular.module('wechat.directives', [])

.directive('focusMe', function($timeout) {
    return {
        link: function(scope, element, attrs) {
            scope.$watch(attrs.focusMe, function(value) {

                if (value === true) {

                    $timeout(function() {
                    element[0].focus();
                    element[0].click();
                    //cordova.plugins.Keyboard.show();
                    });
                }
            });
        }
    };
})

.directive('hideTabs', function($rootScope) {
    return {
        restrict: 'A',
        link: function($scope, $el) {
            $rootScope.hideTabs = 'tabs-item-hide';
            $scope.$on('$destroy', function() {
                $rootScope.hideTabs = '';
            });
        }
    };
});

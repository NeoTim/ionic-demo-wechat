// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('wechat', ['ionic', 'ngCordova', 'wechat.controllers', 'wechat.services', 'wechat.directives'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }

        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }



    });
})

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
        .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'views/share/tabs.html'
    })

    .state('search', {
        url: '/search',
        templateUrl: 'views/share/search.html',
        controller: 'SearchCtrl'
    })

    // Each tab has its own nav history stack:
    .state('tab.chats', {
        url: '/chats',
        views: {
            'tab-chats': {
                templateUrl: 'views/chat/chats.html',
                controller: 'ChatsCtrl'
            }
        }
    }).state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
            'tab-chats': {
                templateUrl: 'views/chat/chatDetail.html',
                controller: 'ChatDetailCtrl'
            }
        }
    })

    .state('tab.addressbook', {
        url: '/addressbook',
        views: {
            'tab-addressbook': {
                templateUrl: 'views/addressbook/addressbook.html',
                controller: 'AddressbookCtrl'
            }
        }
    })

    .state('tab.discover', {
            url: '/discover',
            views: {
                'tab-discover': {
                    templateUrl: 'views/discover/discover.html',
                    controller: 'DiscoverCtrl'
                }
            }
        })
        .state('tab.discover-friends', {
            url: '/discover/friends',
            views: {
                'tab-discover': {
                    templateUrl: 'views/discover/friends.html',
                    controller: 'FriendsCtrl'
                }
            }
        })
        .state('tab.discover-createTopic', {
            url: '/discover/createTopic/:type/:data',
            views: {
                'tab-discover': {
                    templateUrl: 'views/discover/createTopic.html',
                    controller: 'CreateTopicCtrl'
                }
            }
        }).state('tab.discover-motion', {
            url: '/discover/motion',
            views: {
                'tab-discover': {
                    templateUrl: 'views/discover/motion.html',
                    controller: 'MotionCtrl'
                }
            }
        })

    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'views/account/account.html',
                controller: 'AccountCtrl'
            }
        }
    });





    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/chats');

});

angular.module('wechat.controllers', [])

.controller('DashCtrl', function($scope) {})

//微信
.controller('ChatsCtrl', function($scope, $rootScope, $timeout, Chats, $state, $location, $ionicPopover, $cordovaLocalNotification, $ionicPlatform, $ionicPopup) {
    console.log('ChatsCtrl')
        //----本地推送（后台程序推送 app打开关闭无关）  成功 
        // var now = new Date();
        // var _60_seconds_from_now = new Date(now + 30 * 1000);
        // var event = {
        //     id: 1,
        //     every: 'minute',
        //     title: "Test Event",
        //     text: "this is a message about the event"
        // };

    // document.addEventListener("deviceready", function() {
    //     $cordovaLocalNotification.schedule(event).then(function() {
    //         // $ionicPopup.alert({
    //         //     template: 'add success'
    //         // });
    //     });

    // }, false);
    //------------

    $scope.chats = Chats.all();

    $scope.go = function(url) {
        $state.go(url);
    }

    $scope.remove = function(chat) {
        Chats.remove(chat);
    };


    $ionicPopover.fromTemplateUrl('my-popover.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });


    $scope.openPopover = function($event) {
        $scope.popover.show($event);
    };
    $scope.closePopover = function() {
        $scope.popover.hide();
    };


})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

//通讯录
.controller('AddressbookCtrl', function($scope, $state) {
    $scope.go = function(name) {
        $state.go(name);
    }
})

//发现
.controller('DiscoverCtrl', function($scope, $cordovaBarcodeScanner, $ionicPopup, $cordovaFileOpener2, $cordovaFileTransfer) {


    //二维码
    $scope.barcode = function() {


        document.addEventListener("deviceready", function() {

            $cordovaBarcodeScanner
                .scan()
                .then(function(barcodeData) {
                    $ionicPopup.alert({
                        template: 'success:' + JSON.stringify(barcodeData)
                    });
                }, function(error) {
                    // An error occurred
                    $ionicPopup.alert({
                        template: 'error:' + JSON.stringify(error)
                    });
                });

        }, false);
    }



    //打开文件
    $scope.openPdf = function() {
        document.addEventListener("deviceready", function() {

            var path = cordova.file.applicationDirectory + 'www/data/test.pdf';
            $cordovaFileOpener2.open(
                path,
                'application/pdf'
            ).then(function() {
                $ionicPopup.alert({
                    template: 'success'
                });

                // var server = 'http://192.168.1.154:8083/upload/image';
                // $cordovaFileTransfer.upload(server, path, {})
                //     .then(function(result) {
                //         var response = JSON.parse(result.response);

                //         if (response.status) {
                //             $ionicPopup.alert({
                //                 template: 'success'
                //             });
                //         }
                //         // Success!
                //     }, function(err) {
                //         console.log('Error');
                //         // Error
                //     }, function(progress) {
                //         // constant progress updates
                //         console.log(progress, (progress.loaded / progress.total) * 100)
                //     });
                // $ionicPopup.alert({
                //     template: 'success end'
                // });


            }, function(err) {
                // An error occurred. Show a message to the user
                $ionicPopup.alert({
                    template: 'err:' + JSON.stringify(err)
                });
            });
        }, false);



    }



})

.controller('FriendsCtrl', function($http, $scope, $state, $ionicActionSheet, $cordovaCamera, $cordovaCapture, $cordovaGlobalization, $ionicPopup, $cordovaFileTransfer) { //朋友圈

    console.log("friends");

    //操作框
    $scope.show = function() {
        // 显示操作表
        $ionicActionSheet.show({
            buttons: [{
                text: '小视频'
            }, {
                text: '拍照'
            }, {
                text: '从手机相册选择'
            }, ],
            cancelText: '取消',
            buttonClicked: function(index) {

                // $state.go('tab.discover-createTopic', {
                //     type: 'image',
                //     data: 'img/avatars.jpg'
                // });

                document.addEventListener("deviceready", function() {

                        if (index == 0) //小视频
                        {
                            var options = {
                                limit: 1,
                                duration: 15
                            };

                            $cordovaCapture.captureVideo(options).then(function(videoData) {
                                // Success! Video data is here
                                $state.go('tab.discover-createTopic', {
                                    type: 'video',
                                    data: videoData[0].fullPath
                                });

                            }, function(err) {
                                // An error occurred. Show a message to the user
                            });


                        } else if (index == 1) //拍照
                        {
                            var options = {
                                destinationType: Camera.DestinationType.FILE_URI,
                                sourceType: Camera.PictureSourceType.CAMERA,
                            };

                            $cordovaCamera.getPicture(options).then(function(imageURI) {

                                    var server = 'http://192.168.1.154:8083/upload/image';
                                    var filePath = imageURI;

                                    var options = {
                                        headers: {
                                            'x-app-version': '0.0.1'
                                        },
                                        params: {
                                            gallery: 'avatar'
                                        }
                                    };

                                    $cordovaFileTransfer.upload(server, filePath, options)
                                        .then(function(result) {
                                            var response = JSON.parse(result.response);

                                            if (response.status) {
                                                $ionicPopup.alert({
                                                    template: '<img src="http://192.168.1.154:8083/public/avatar/' +
                                                        response.data.fileName + '" style="max-height:80px;max-width:80px;"/>'
                                                });
                                            }


                                            // Success!
                                        }, function(err) {
                                            console.log('Error');
                                            // Error
                                        }, function(progress) {
                                            // constant progress updates
                                            console.log(progress, (progress.loaded / progress.total) * 100)
                                        });


                                    // $state.go('tab.discover-createTopic', {
                                    //     type: 'image',
                                    //     data: imageURI
                                    // });
                                },
                                function(err) {
                                    // error
                                });

                        } else if (index == 2) //从手机相册选择
                        {
                            var options = {
                                destinationType: Camera.DestinationType.FILE_URI,
                                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                            };

                            $cordovaCamera.getPicture(options).then(function(imageURI) {
                                $state.go('tab.discover-createTopic', {
                                    type: 'image',
                                    data: imageURI
                                });
                            }, function(err) {
                                // error
                            });
                        }


                    },
                    false);

            }

        });

    }
})

.controller('CreateTopicCtrl', function($scope, $stateParams, $state) { //添加话题

    $scope.topicTitle = "";

    $scope.type = $stateParams.type;

    if ($scope.type == 'image') {

        $scope.img = $stateParams.data;

    } else if ($scope.type == 'video') {

        $scope.videoPath = $stateParams.data;

    }


    $scope.go = function(name) {
        $state.go(name);
    }

    //发送
    $scope.sendTopic = function() {


    }


})

.controller('MotionCtrl', function($scope, $cordovaDeviceMotion, $ionicPopup) { //加速器 摇一摇等测试

    console.log('MotionCtrl');
    var options = {
        frequency: 400
    };

    $scope.x = 0;
    $scope.y = 0;
    $scope.z = 0;
    $scope.timeStamp = 0;

    document.addEventListener("deviceready", function() {


        // $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
        //     $scope.x = result.x;
        //     $scope.y = result.y;
        //     $scope.z = result.z;
        //     $scope.timeStamp = result.timestamp;
        // }, function(err) {
        //     // An error occurred. Show a message to the user
        // });

        var isRepeat = false;
        var watch = $cordovaDeviceMotion.watchAcceleration(options);
        watch.then(
            null,
            function(error) {
                // An error occurred
            },
            function(result) {

                var isHigher = function(x, x1) {
                    if (x - x1 > 10 || x1 - x > 10) {
                        return true;
                    }
                    return false;
                }

                if (isHigher($scope.x, result.x) ||
                    isHigher($scope.y, result.y) ||
                    isHigher($scope.z, result.z)
                ) {

                    if (!isRepeat) {
                        isRepeat = true;
                        $ionicPopup.alert({
                            template: '摇了摇了'
                        }).then(function() {
                            isRepeat = false;
                        })
                    }

                }

                $scope.x = result.x;
                $scope.y = result.y;
                $scope.z = result.z;
                $scope.timeStamp = result.timestamp;
            });


        $scope.$on("$destroy", function() {
            // $ionicPopup.alert({
            //     template: '清空watch'
            // });
            //离开清除watch
            watch.clearWatch();
        })

        //watch.clearWatch();
        // // OR
        // $cordovaDeviceMotion.clearWatch(watch)
        //   .then(function(result) {
        //     // success
        //     }, function (error) {
        //     // error
        //   });

    }, false);


})



//个人中心
.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
})

//公共
.controller('SearchCtrl', function($scope, $ionicHistory, $cordovaKeyboard, $ionicPopup) {

    $scope.goBack = function() {
        $ionicHistory.goBack();

    }

    $scope.getHeight = function() {
        var winHeight = 0;
        if (window.innerHeight)
            winHeight = window.innerHeight;
        else if ((document.body) && (document.body.clientHeight))
            winHeight = document.body.clientHeight;

        $ionicPopup.alert({
            template: '高:' + winHeight
        })
    }




});

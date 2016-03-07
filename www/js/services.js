angular.module('wechat.services', [])

.factory('Chats', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: '王尼玛',
        lastText: '呵呵哒～～！',
        timeSpan: '09:13',
        face: 'img/ben.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        timeSpan: '08:50',
        face: 'img/max.png'
    }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        timeSpan: '08:13',
        face: 'img/adam.jpg'
    }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        timeSpan: '昨天',
        face: 'img/perry.png'
    }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        timeSpan: '昨天',
        face: 'img/mike.png'
    }, {
        id: 5,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        timeSpan: '昨天',
        face: 'img/ben.png'
    }, {
        id: 6,
        name: 'Max Lynx 1',
        lastText: 'Hey, it\'s me',
        timeSpan: '昨天',
        face: 'img/max.png'
    }, {
        id: 7,
        name: 'Adam Bradleyson 1',
        lastText: 'I should buy a boat',
        timeSpan: '星期三',
        face: 'img/adam.jpg'
    }, {
        id: 8,
        name: 'Perry Governor 1',
        lastText: 'Look at my mukluks!',
        timeSpan: '星期三',
        face: 'img/perry.png'
    }, {
        id: 9,
        name: 'Mike Harrington 1',
        lastText: 'This is wicked good ice cream.',
        timeSpan: '15/11/4',
        face: 'img/mike.png'
    }];

    return {
        all: function() {
            return chats;
        },
        remove: function(chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function(chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
});

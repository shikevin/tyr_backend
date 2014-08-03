jQuery(function($){
    var socket = io.connect();
    var $roomForm = $('#setRoom');
    var $roomBox = $('#roomName');
    var $roomStatus = $('#roomStatus');
    var $userForm = $('#setUsername');
    var $userBox = $('#username');
    var $userStatus = $('#currentUsers');
    var $messageForm = $('#sendMessage');
    var $messageBox = $('#message');
    var $chat = $('#chat');

    $roomForm.submit(function(oEvent){
        oEvent.preventDefault();
        socket.emit('join room', $roomBox.val(), function(data){
            $roomStatus.html(data);
        })
        $roomBox.val('');
    });

    $userForm.submit(function(oEvent){
        oEvent.preventDefault();
        socket.emit('new user', $userBox.val(), function(data){
            $userStatus.html(data);
        });
        $userBox.val('');
    });

    socket.on('usernames', function(data){
        var html = '';
        for (var i =0; i<data.length; i++) {
            html+=data[i] + '<br/>'
            $userStatus.html(html);
        }
    });

    $messageForm.submit(function(oEvent){
        oEvent.preventDefault();
        socket.emit('new location', $messageBox.val(), function(data){
            $chat.append('<span class="error"><b>' + data + '</span></b>');
        });
        $messageBox.val('');
    });

    function displayMsg(data){
        $chat.append('<span class="msg"><b>' + data.name + '</b>' + ': ' + data.location+'</span><br/>');
    }

    socket.on('location change', function(data){
        displayMsg(data);
    });

//    var $nickForm = $('#setNick');
//    var $nickError = $('#nickError');
//    var $users = $('#users');
//    var $nickBox = $('#nickname');
//    var $messageForm = $('#send-message');
//    var $messageBox = $('#message');
//    var $chat = $('#chat');
//
//    $nickForm.submit(function(e){
//        e.preventDefault();
//        socket.emit('new user', $nickBox.val(), function(data){ //call back is 3rd value
//            if(data){
//                $('#nickWrap').hide();
//                $('#contentWrap').show();
//            } else{
//                $nickError.html('That username is already taken! Try again.');
//            }
//        });
//        $nickBox.val('');
//    });
//
//    socket.on('load old msgs', function(docs){
//        for(var i=0; i<docs.length; i++) {
//            displayMsg(docs[i]);
//        }
//    });
//
//    socket.on('usernames', function(data){
//        var html ='';
//        for(var i=0;i<data.length;i++){
//            html += data[i]+'<br/>'
//            $users.html(html);
//        }
//    });
//
//    socket.on('whisper', function(data){
//        $chat.append('<span class="whisper"><b>' + data.nick + '</b>' + ': ' + data.msg+'</span><br/>');
//    })
//    $messageForm.submit(function(e){
//        e.preventDefault();
//        socket.emit('send message', $messageBox.val(), function(data){ //callback for errors during submit
//            $chat.append('<span class="error"><b>' + data +'</span><br/>');
//        });
//        $messageBox.val('');
//    });
//
//    function displayMsg(data){
//        $chat.append('<span class="msg"><b>' + data.nick + '</b>' + ': ' + data.msg+'</span><br/>');
//    }
//
//    socket.on('new message', function(data){
//        displayMsg(data);
//    });
});
var request = require('request'),
    io = require('socket.io')(6001, {
        origins: 'laravel.dev:*'
    }),
    Redis = require('ioredis'),
    redis = new Redis();

io.use(function(socket, next) {
    request.get({
        url: 'http://laravel.dev/ws/check-auth',
        headers: {cookie : socket.request.headers.cookie},
        json: true
    }, function(error, response, json) {
        return json.auth ? next() :next(new Error('Auth error'));
    });
});

io.on('connection', function(socket) {
    socket.on('subscribe', function(channel) {
        request.get({
            url: 'http://laravel.dev/ws/check-sub/' + channel,
            headers: {cookie : socket.request.headers.cookie},
            json: true
        }, function(error, response, json) {
            if (json.can) {
                socket.join(channel, function(error) {
                    socket.send('Join to ' + channel);
                });

                return;
            }
        });
    });
});

redis.psubscribe('*', function (err, count) {
      // Now we are subscribed to both the 'news' and 'music' channels.
      // `count` represents the number of channels we are currently subscribed to.
});

redis.on('pmessage', function(pattern, channel, message) {
    message = JSON.parse(message);

    io.to(channel + ':' + message.event).emit(channel + ':' + message.event, message.data.message);

    console.log(channel, message);
});

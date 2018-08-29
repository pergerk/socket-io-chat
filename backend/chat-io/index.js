const socket = require('socket.io');
const redisAdapter = require('socket.io-redis');
const env = process.env.NODE_ENV || 'development';
const configRedis = require('./config.redis')[env];
const debug = require('debug')('chat-io');
const db = require('../db');
const Promise = require('bluebird');

module.exports = server => {
  const io = socket(server, { path: '/io' });
  io.adapter(redisAdapter(configRedis));
  io.on('connection', socket => {
    debug('user connected ', socket.id);

    // Получаем и отправляем сообщение
    // Здесь правильней публишер и сабскрайбер 
    socket.on('new message', data => {
      if (!socket.userId) return;
      db.ChatMessage.create({
        chatId: data.chatId,
        message: data.message,
        senderId: socket.userId
      }).then(message => {
        data.id = message.id;
        data.nick = socket.nick;
        socket.emit('message received', data);
        socket.to(data.chatId).emit('message', data);
      });
    });

    //Евент печати в чате
    socket.on('typing', chat => {
      if (socket.userId)
        socket.to(chat).emit('typing', {
          nick: socket.nick
        });
    });

    socket.on('stop typing', chat => {
      if (socket.userId)
        socket.to(chat).emit('typing', {
          nick: socket.nick
        });
    });
    // End

    //Login
    socket.on('login', ({ login, password }) => {
      //if (socket.userId) return;
      db.User.login({ login, password })
        .catch(err => socket.emit('login error', err.message))
        .then(user => {
          socket.userId = user.id;
          socket.nick = user.nick;
          return user.getChats();
        })
        .then(chats => {
          socket.emit('login success', chats, socket.userId);
          return Promise.resolve(chats);
        })
        .map(chat => {
          socket.join(chat.id);
          socket.to(chat.id).emit('user online', { userId: socket.userId, nick: socket.nick });
        });
    });
    //End
    socket.on('logined', () => {
      socket.emit('authorized', socket.userId ? true : false);
    });
    //Logout
    socket.on('logout', () => {
      if (socket.userId) {
        db.User.findById(socket.userId)
          .then(user => user.getChats())
          .map(chat =>
            socket.to(chat.id).emit('user offline', {
              userId: socket.userId,
              nick: socket.nick
            })
          );
      }
    });
    //End
  });
};

import Vue from 'vue';
import Vuex from 'vuex';

import createLogger from 'vuex/dist/logger';
import createPersistedState from 'vuex-persistedstate';
//import ioPlugin from "./ioplugin";
import io from 'socket.io-client';
var socket = io('http://localhost:3000', { path: '/io' });
import _ from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
    authorize({ state }) {
      socket.emit('login', {
        login: state.login,
        password: state.password
      });
    },
    checkAuth: ({ state, commit, dispatch }) => {},
    sendMessage: ({ state, commit }, data) => {
      socket.emit('new message', data);
      data.senderId = state.userId;
      commit('addMessage', data);
    }
  },
  mutations: {
    setLogin(state, login) {
      state.login = login;
    },
    setUserId(state, data) {
      state.userId = data;
    },
    setPassword(state, password) {
      state.password = password;
    },
    setChats(state, data) {
      state.chats = _.keyBy(data, chat => {
        chat.messages = [];
        return chat.id;
      });
    },
    setAuthenticated(state, data) {
      state.authenticated = data;
    },
    addMessage(state, data) {
      state.chats[data.chatId].messages.push(data);
    },
    receiveMessage(state, data) {
      state.chats[data.chatId].messages.forEach(element => {
        if (element.ident == data.ident) element.id = data.id;
      });
    }
  },
  state: {
    authenticated: false,
    login: '',
    password: '',
    chats: {},
    messages: {},
    userId: null
  },
  plugins: [
    createLogger(),
    createPersistedState({ key: 'vuex', paths: [] }),
    store => {
      socket.on('login success', (chats, userId) => {
        store.commit('setAuthenticated', true);
        store.commit('setUserId', userId);
        store.commit('setChats', chats);
      });
      socket.on('message', data => {
        store.commit('addMessage', data);
      });
      socket.on('message received', data => {
        store.commit('receiveMessage', data);
      });
      socket.on('error', data => {
        console.log(data);
      });
    }
  ]
});

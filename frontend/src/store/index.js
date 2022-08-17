import { createStore } from "vuex";
import { io } from "socket.io-client";
import room from "./modules/room";
import message from "./modules/message";

export default createStore({
  state: {
    login: false,
    socket: io(import.meta.env.VITE_BACKEND_URL),
    user: {},
  },
  mutations: {
    updateSocket(state, socket) {
      state.socket = socket;
    },
    toggleLogin(state, status) {
      state.login = status;
    },
    updateUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    join({ commit }, user) {
      commit("toggleLogin", true);
      commit("updateUser", user);
    },
  },
  modules: {
    room,
    message,
  },
});

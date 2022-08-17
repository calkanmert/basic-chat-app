export default {
  state: () => ({
    messages: {},
    fetchStatus: {},
  }),
  mutations: {
    addMessage(state, message) {
      if (!state.messages.hasOwnProperty(message.room)) {
        state.messages[message.room] = [];
      }
      state.messages[message.room].push(message);
    },
    changeFetchStatus(state, { room_id, status }) {
      state.fetchStatus[room_id] = status;
    },
    resetFetchStatus(state) {
      state.fetchStatus = {};
    },
    removeMessages(state) {
      state.messages = {};
    },
  },
  actions: {
    async fetchMessages({ commit, state }, room) {
      if (!state.fetchStatus[room]) {
        await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/rooms/${room}/messages`
        )
          .then((response) => response.json())
          .then((data) => {
            commit("changeFetchStatus", { room_id: room, status: true });
            data.forEach((message) => {
              commit("addMessage", message);
            });
          });
      }
    },
    sendMessage({ rootState }, { room, content, author }) {
      rootState.socket.emit("new_message", {
        room,
        content,
        author,
      });
    },
    addMessage({ commit }, message) {
      commit("addMessage", message);
    },
  },
};

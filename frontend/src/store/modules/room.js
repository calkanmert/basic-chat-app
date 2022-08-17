export default {
  state: () => ({
    rooms: [],
    selectedRoom: {},
    roomsFetchStatus: false,
  }),
  mutations: {
    updateRooms(state, rooms) {
      state.rooms = rooms;
    },
    updateSelectedRoom(state, room) {
      state.selectedRoom = room;
    },
    toggleRoomsFetchStatus(state, status) {
      state.roomsFetchStatus = status;
    },
  },
  actions: {
    async fetchRooms({ commit }) {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/rooms`)
        .then((response) => response.json())
        .then((data) => {
          commit("toggleRoomsFetchStatus", true);
          commit("updateRooms", data);
          commit("updateSelectedRoom", data[0]);
        });
    },
    selectRoom({ commit, state }, room) {
      if (state.selectedRoom._id !== room._id) {
        commit("updateSelectedRoom", room);
      }
    },
  },
};

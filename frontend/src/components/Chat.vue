<script setup>
import { ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import Rooms from "./Rooms.vue";
import Spinner from "./Spinner.vue";

const store = useStore();
const message = ref("");
const messagePanel = ref(null);

onMounted(() => {
  store.state.socket.on("new_message", async (args) => {
    await store.dispatch("addMessage", args);
    messagePanel.value.scrollTop = messagePanel.value.scrollHeight;
  });
});

watch(
  () => store.state.room.selectedRoom,
  async () => {
    await store.dispatch("fetchMessages", store.state.room.selectedRoom._id);
    messagePanel.value.scrollTop = messagePanel.value.scrollHeight;
  }
);

function sendMessage() {
  if (message.value.length > 0) {
    store.dispatch("sendMessage", {
      content: message.value,
      room: store.state.room.selectedRoom._id,
      author: store.state.user.username,
    });
    message.value = "";
  }
}
</script>

<template>
  <div class="chats">
    <div class="sidebar">
      <div class="header">
        <div class="title">Chats</div>
      </div>
      <Rooms />
    </div>
    <div class="selected-room">
      <div class="header">
        <div class="room-name">#{{ store.state.room.selectedRoom.name }}</div>
      </div>
      <div class="messages" ref="messagePanel">
        <div
          class="message"
          v-for="message in store.state.message.messages[
            store.state.room.selectedRoom._id
          ]"
          :key="message._id"
          :class="{ me: message?.sender == store.state.user.id }"
        >
          <div class="avatar">
            <img src="https://via.placeholder.com/150" />
          </div>
          <div class="details">
            <div class="author">{{ message.author }}</div>
            <div class="content">
              {{ message.content }}
            </div>
            <div class="created-at">
              {{ moment(message.createdAt).format("LLL") }}
            </div>
          </div>
        </div>
        <Spinner
          v-if="
            !store.state.message.fetchStatus[store.state.room.selectedRoom._id]
          "
          class="spinner"
        ></Spinner>
      </div>
      <div class="send-message">
        <input
          v-model="message"
          @keyup.enter="sendMessage"
          type="text"
          class="enter-message"
          :placeholder="`Message #${store.state.room.selectedRoom.name}`"
          :disabled="
            !store.state.message.fetchStatus[store.state.room.selectedRoom._id]
          "
        />
        <button
          :disabled="
            store.state.message.fetchStatus[store.state.room.selectedRoom._id]
          "
          class="send"
          @click="sendMessage"
        >
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </div>
</template>

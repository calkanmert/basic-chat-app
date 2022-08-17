<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const username = ref("");
const store = useStore();

async function join() {
  store.state.socket.emit("join", username.value);
  store.state.socket.on("welcome", async (args) => {
    store.dispatch("join", { id: args.id, username: username.value });
  });
}
</script>

<template>
  <div class="login">
    <div class="title">LOGIN</div>
    <div class="form">
      <input
        @keydown.enter="join"
        type="text"
        v-model="username"
        class="enter-name"
        placeholder="Enter Name"
      />
      <button @click="join" class="login-button">Login</button>
    </div>
  </div>
</template>

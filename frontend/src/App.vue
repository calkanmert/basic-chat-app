<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import Login from "./components/Login.vue";
import Chat from "./components/Chat.vue";

const store = useStore();

onMounted(() => {
  console.log(import.meta.env.VITE_BACKEND_URL);
  store.state.socket.on("alert", (args) => {
    Swal.fire({
      title: args.title,
      text: args.text,
      icon: args.icon,
      confirmButtonText: "OK",
    });
  });
});
</script>

<template>
  <Login v-if="!store.state.login" />
  <Chat v-else />
</template>

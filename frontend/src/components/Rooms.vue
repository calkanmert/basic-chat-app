<script setup>
import Spinner from "./Spinner.vue";
import { onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

onMounted(async () => {
  await store.dispatch("fetchRooms");
});
</script>
<template>
  <div class="rooms">
    <div class="title">Rooms</div>
    <div class="room-list" name="slide-fade" tag="div">
      <div
        v-for="room in store.state.room.rooms"
        :key="room._id"
        class="room"
        @click="store.dispatch('selectRoom', room)"
        :class="{ active: store.state.room.selectedRoom._id === room._id }"
      >
        <div class="name">#{{ room.name }}</div>
      </div>
      <Spinner
        v-if="!store.state.room.roomsFetchStatus"
        class="spinner"
      ></Spinner>
    </div>
  </div>
</template>

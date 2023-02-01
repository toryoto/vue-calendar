<template>
  <div>
    <h1 class="text-h1">Calendar</h1>
    <v-list>
      <v-list-item v-for="event in events" :key="event.id">
        {{ event.name }}
      </v-list-item>
    </v-list>
    <v-btn type="submit" @click="fetchEvents()">fetchEvents</v-btn>

    <CalendarDetails />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Calendar',
  computed: {
    // 最初は空
    // return this.$store.getters['events/events']
    ...mapGetters('events', ['events']),
  },
  methods: {
    // mapActionsはthis.$store.dispatchを記述しやすくするためのヘルパー
    // this.$store.dispatch('events/fetchEvents')
    ...mapActions('events', ['fetchEvents']),
  },
};
</script>

<template>
  <div>
    <v-sheet height="6vh" class="d-flex align-center">
      <v-btn outlined small class="ma-4" @click="setToday()">今日</v-btn>
      <v-btn icon @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-toolbar>{{ title }}</v-toolbar>
    </v-sheet>
    <v-sheet height="94vh">
      <v-calendar
        v-model="value"
        :events="events"
        @change="fetchEvents"
        ref="calendar"
        locale="jp"
        :day-format="(timestamp) => new Date(timestamp.date).getDate()"
        :month-format="(timestamp) => new Date(timestamp.date).getMonth() + 1 + ' /'"
      ></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { format } from 'date-fns';

export default {
  name: 'Calendar',
  data: () => ({
    value: format(new Date(), 'yyyy/MM/dd'),
  }),
  computed: {
    // 第一引数はパス
    // return this.$store.gettersのヘルパー
    ...mapGetters('events', ['events']),
    title() {
      return format(new Date(this.value), 'yyyy年M月');
    },
  },
  methods: {
    ...mapActions('events', ['fetchEvents']),
    setToday() {
      this.value = format(new Date(), 'yyyy/MM/dd');
    },
  },
};
</script>

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
        @click:event="showEvent"
        @click:day="initEvent"
      ></v-calendar>
    </v-sheet>

    <!-- eventに値があればダイアログ表示 -->
    <v-dialog :value="event !== null" @click:outside="closeDialog" width="600">
      <EventDetailDialog v-if="event !== null && !isEditMode" />
      <EventFormDialog v-if="event !== null && isEditMode" />
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { format } from 'date-fns';
import EventDetailDialog from './EventDetaildialog.vue';
import EventFormDialog from './EventFormDialog.vue';

export default {
  name: 'Calendar',
  data: () => ({
    value: format(new Date(), 'yyyy/MM/dd'),
  }),
  components: {
    EventDetailDialog,
    EventFormDialog,
  },
  computed: {
    // 第一引数はパス
    // return this.$store.gettersのヘルパー
    ...mapGetters('events', ['events', 'event', 'isEditMode']),
    title() {
      return format(new Date(this.value), 'yyyy年M月');
    },
  },
  methods: {
    ...mapActions('events', ['fetchEvents', 'setEvent', 'setEditMode']),
    setToday() {
      this.value = format(new Date(), 'yyyy/MM/dd');
    },
    showEvent({ nativeEvent, event }) {
      this.setEvent(event);
      nativeEvent.stopPropagation();
    },
    closeDialog() {
      this.setEvent(null);
      this.setEditMode(false);
    },
    initEvent({ date }) {
      // dateには2021-10-07のように値が渡される
      date = date.replace(/-/g, '/');
      const start = format(new Date(date), 'yyyy/MM/dd 00:00:00');
      const end = format(new Date(date), 'yyyy/MM/dd 01:00:00');
      this.setEvent({ name: '', start, end, timed: true });
      this.setEditMode(true);
    },
  },
};
</script>

<!-- 日付入力コンポーネント -->
<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on" :class="{ 'red lighten-4 rounded': isError }">{{ formatDateToJa(value) || '日付を選択' }}</v-btn>
    </template>
    <!-- :valueはpropsから受け取る値を保持する変数
    @inputはその変数が更新された時の処理 -->
    <v-date-picker
      :value="value.replace(/\//g, '-')"
      @input="$emit('input', $event.replace(/-/g, '/'))"
      no-title
      locale="ja-ja"
      :day-format="(value) => new Date(value).getDate()"
    ></v-date-picker>
    <p>{{ value }}</p>
  </v-menu>
</template>

<script>
import { formatDateToJa } from '../functions/datetime';

export default {
  name: 'DateForm',
  props: ['value', 'isError'],
  methods: {
    formatDateToJa,
  },
};
</script>

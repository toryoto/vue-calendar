import axios from 'axios';
import { serializeCalendar } from '../../functions/serializers';

const apiUrl = 'http://localhost:3000';

// stateはアプリケーション全体のデータ状態を管理
const state = {
  calendars: [],
};

// gettersはstateの値を算出したものを返す(第一引数はstate)(computedと近い)
const getters = {
  calendars: (state) => state.calendars.map((calendar) => serializeCalendar(calendar)),
};

// mutationsはstateの更新だけを行う(非同期処理は含まない)
const mutations = {
  setCalendars: (state, calendars) => (state.calendars = calendars),
};

// mutationsの呼び出し(直接stateの変更できない)
const actions = {
  async fetchCalendars({ commit }) {
    const response = await axios.get(`${apiUrl}/calendars`);
    commit('setCalendars', response.data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

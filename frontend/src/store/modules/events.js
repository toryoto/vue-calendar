import axios from 'axios';

const apiUrl = 'http://localhost:3000';

const state = {
  events: [],
};

const getters = {
  // startとendをDate型で返す
  // スプレッド構文で新しいオブジェクトを作ってDate型に上書き
  events: (state) =>
    state.events.map((event) => {
      return {
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      };
    }),
};

const mutations = {
  setEvents: (state, events) => (state.events = events),
};

const actions = {
  async fetchEvents({ commit }) {
    const response = await axios.get(`${apiUrl}/events`);
    commit('setEvents', response.data); // mutationを呼び出す
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

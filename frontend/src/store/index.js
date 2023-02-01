import Vuex from 'vuex';
import events from './modules/events';

export default new Vuex.Store({
  modules: {
    events,
  },
});

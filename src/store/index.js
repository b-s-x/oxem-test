import Vue from 'vue'
import Vuex from 'vuex'

const SMALL_DATA = "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
const BIG_DATA = "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataSet: [],
    loading: true,
  },

  mutations: {
    settingData(state, data) {
      state.dataSet = data
    },

    addNewTableItem(state, data) {
      state.dataSet.push(data)
      console.log('done');
    },

    changeLoading(state, selector) {
      state.loading = (selector === "false") ? false : true
    },
  },

  actions: {
    async fetchData({commit}, selector = BIG_DATA) {
      if(selector === 'small') selector = SMALL_DATA
      const result = await fetch(selector)

      if (!result.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const data = await result.json()
        commit('settingData', data)
        commit("changeLoading", "false")
      }
    }
  },

  getters: {
    getDataSet(store) {
      return store.dataSet
    },

    getLoading: (state) => {
      return state.loading
  },
  }
})

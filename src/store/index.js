import Vue from 'vue'
import Vuex from 'vuex'

const SMALL_DATA = "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
const BIG_DATA = "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataSet: [],
  },
  mutations: {
    settingData(state, data) {
      state.dataSet = data
    }
  },
  actions: {
    async fetchData({commit}, selector = BIG_DATA) {
      if(selector === 'small') selector = SMALL_DATA

      const result = await fetch(selector)
      const data = await result.json()

      commit('settingData', data)
    }
  },
  getters: {
    getDataSet(store) {
      return store.dataSet
    }
  }
})

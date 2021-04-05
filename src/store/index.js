import Vue from 'vue'
import Vuex from 'vuex'

const SMALL_DATA = "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
const BIG_DATA = "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"

Vue.use(Vuex)

function compareKey(keySet, selector) {
  for (let key of Object.keys(keySet)) {
    if (key === selector) return key;
  }
}

export default new Vuex.Store({
  state: {
    dataSet: [],
    loading: true,
    keySet: {
      SMALL_DATA,
      BIG_DATA
    }
  },

  mutations: {
    setData(state, data) {
      state.dataSet = data
    },

    addNewTableItem(state, data) {
      state.dataSet.push(data)
      console.log('done');
    },

    changeLoading(state) {
      state.loading = !state.loading
    },
  },

  actions: {
    async fetchData({commit, state}, selector) {

      const activeKey = compareKey(state.keySet, selector)
      const result = await fetch(state.keySet[activeKey])

      if (!result.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const data = await result.json()
        commit('setData', data)
        commit("changeLoading")
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

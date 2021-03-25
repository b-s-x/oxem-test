<template>
  <div class="main">
    <div class="btn__container">
      <button class="btn" @click="isVisible = !isVisible"> Добавить </button>
    </div>

    <transition name="fade" mode="out-in">
      <add-table-item
        v-if="isVisible"
        @createTableItem="sendToDataSet($event)"
        />
    </transition>

     <div class="table__container">
      <table-template
        :dataTable="getDataSet"
        :dataTitle="dataTitle"
        >

        <template #tableTitle="{ title }" >
          <div class="table__item" @click="sortBy(title)">
            <div class="item" >{{ title }}</div>
          </div>
        </template>


        <template #tableItem="{ item }">
          <div class="table__item">
            <div class="item">{{ item.id }}</div>
            <div class="item">{{ item.firstName }}</div>
            <div class="item">{{ item.lastName }}</div>
            <div class="item">{{ item.email }}</div>
            <div class="item">{{ item.phone }}</div>
          </div>
        </template>

      </table-template>
    </div>
  </div>
</template>

<script>

import TableTemplate from "../components/TableTemplate"
import AddTableItem from "../components/AddTableItem"
import { mapGetters } from "vuex"

export default {
  name: "App",
  components: {
    TableTemplate,
    AddTableItem
  },

  data() {
    return {
      dataTitle: ["id", "firstName", "lastName", "email", "phone"],
      sortKeyId: true,
      sortKeyFirstName: true,
      sortKeyLastName: true,
      sortKeyEmail: true,
      sortKeyPhone: false,
      isVisible: false,
    }
  },

  computed: {
    ...mapGetters({
      getDataSet: "getDataSet",
    }),

    getDataTable() {
      return this.getDataSet
    },
  },

  methods: {
    sortBy(item) {
      if(item === "id") this.sortByNum("id", "sortKeyId")
      if(item === "firstName") this.sortByName("firstName", "sortKeyFirstName")
      if(item === "lastName") this.sortByName("lastName", "sortKeyLastName")
      if(item === "email") this.sortByName("email", "sortKeyEmailName")
      if(item === "phone") this.sortByPhone()
    },

    sendToDataSet(data) {
      this.$store.commit('addNewTableItem', data)
    },

    sortByPhone() {
      this.sortKeyPhone = !this.sortKeyPhone
        this.getDataSet.sort((a,b) => {
          let nameA = a.phone.split("")[1]
          let nameB = b.phone.split("")[1]
          if(this.sortKeyPhone) {
            return nameA - nameB
          } else {
            return nameB - nameA
          }
        })
    },

    sortByNum(selector, keySelector) {
      this.[keySelector] = !this.[keySelector]
      if(this.[keySelector]) {
        return this.getDataSet.sort((a, b) => a.[selector] - b.[selector])
      } else {
        return this.getDataSet.reverse()
      }
    },

    sortByName(selector, keySelector) {
      this.[keySelector] = !this.[keySelector]

      this.getDataSet.sort((a, b) => {
        let nameA = a[selector].toLowerCase()
        let nameB = b[selector].toLowerCase()

        if(this.[keySelector]) {
          if( nameA < nameB) return 1
          if( nameA > nameB) return -1
        } else {
          if( nameA < nameB) return -1
          if( nameA > nameB) return 1
        }

        return 0
      })
    }
  },

  async mounted() {
    await this.$store.dispatch("fetchData", "small")
  }
}

</script>

<style lang="scss" scoped>

@import "../styles/common";

.table {
  &__container {
    width: 100%;
    height: 100%;
  }

  &__item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px 0;
    width: 100%;
    height: 100%;
  }
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: clamp(100px, 50%, 160px);
}

.main {
  width: 100%;
}

.btn {
  @extend %btn;

  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
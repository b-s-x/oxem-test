<template>
  <div class="main">
    <div class="btn__container">
      <button class="btn" @click="isVisible = !isVisible">Добавить</button>
    </div>

    <transition name="fade" mode="out-in">
      <add-table-item
        v-if="isVisible"
        @createTableItem="sendToDataSet($event)"
      />
    </transition>

    <div class="table__container">
      <paginate :list="getDataSet" :per="5" name="pages">

        <table-template :dataTable="paginated('pages')" :header="header">
          <template #header="{ column, index }">
            <div class="table__item" @click="sortBy(column.field, index)">
              <div class="item">
                <div>{{ column.caption }}</div>

                <div class="dropdown__box">
                  <svg class="dropdown__img" :class="checkASortKey">
                    <use
                      xlink:href="../../public/down-arrow.svg#dropdown"/>
                  </svg>
                </div>
              </div>
            </div>
          </template>

          <template #tableItem="{ item }">
            <div class="table__item" @click="selectingUser(item.id)">
              <div class="item">{{ item.id }}</div>
              <div class="item">{{ item.firstName }}</div>
              <div class="item">{{ item.lastName }}</div>
              <div class="item">{{ item.email }}</div>
              <div class="item">{{ item.phone }}</div>
            </div>
          </template>
        </table-template>
      </paginate>


      <paginate-links
        for="pages"
        :show-step-links="true"
        :step-links="{
          next: 'Следующая страница',
          prev: 'Предыдущая страница',
        }"
      />

      <form-representation
        v-if="pickAUser"
        :pickAUser="pickAUser"
        class="form__represent"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import TableTemplate from "../components/TableTemplate";
import AddTableItem from "../components/AddTableItem";
import FormRepresentation from "../components/FormRepresentation";

export default {
  name: "App",
  components: {
    TableTemplate,
    AddTableItem,
    FormRepresentation,
  },

  data() {
    return {
      header: [
        { field: 'id', caption: 'ID' },
        { field: 'firstName', caption: 'First Name' },
        { field: 'lastName', caption: 'Last Name' },
        { field: 'email', caption: 'Email' },
        { field: 'phone', caption:' Phone' },
      ],

      keyMap: {
        sortKeyId: true,
        sortKeyFirstName: true,
        sortKeyLastName: true,
        sortKeyEmail: true,
        sortKeyPhone: true,
      },

      isVisible: false,
      pickAUser: null,

      paginate: ["pages"],
    };
  },

  computed: {
    ...mapGetters({
      getDataSet: "getDataSet",
    }),

    getDataTable() {
      return this.getDataSet;
    },

    checkASortKey() {
      return { dropdown__img__active: false }
    }
  },

  methods: {
    sortBy(field, index) {
      // console.log(field, index);
      if (field === "id") this.sortByNum("id", "sortKeyId");
      if (field === "firstName") this.sortByName("firstName", "sortKeyFirstName");
      if (field === "lastName") this.sortByName("lastName", "sortKeyLastName");
      if (field === "email") this.sortByName("email", "sortKeyEmailName");
      if (field === "phone") this.sortByPhone();
    },

    log(id) {
      console.log(id);
    },

    selectingUser(id) {
      this.getDataSet.filter((elem) => {
        if (elem.id === id) {
          this.pickAUser = elem;
        }
      });
    },

    sendToDataSet(data) {
      this.$store.commit("addNewTableItem", data);
      this.isVisible = false;
    },

    sortByPhone() {
      this.keyMap.sortKeyPhone = !this.keyMap.sortKeyPhone;
      this.getDataSet.sort((a, b) => {
        let nameA = a.phone.split("")[1];
        let nameB = b.phone.split("")[1];
        if (this.keyMap.sortKeyPhone) {
          return nameA - nameB;
        } else {
          return nameB - nameA;
        }
      });
    },

    sortByNum(selector, keySelector) {
      this.keyMap[keySelector] = !this.keyMap[keySelector];
      if (this.keyMap[keySelector]) {
       return this.getDataSet.sort((a, b) => a[selector] - b[selector]);
      } else {
        return this.getDataSet.reverse();
      }
    },

    sortByName(selector, keySelector) {
      this.keyMap[keySelector] = !this.keyMap[keySelector];
      this.getDataSet.sort((a, b) => {
        let nameA = a[selector].toLowerCase();
        let nameB = b[selector].toLowerCase();

        if (this.keyMap[keySelector]) {
          if (nameA < nameB) return 1;
          if (nameA > nameB) return -1;
        } else {
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
        }

        return 0;
      });
    },
  },

  async mounted() {
    await this.$store.dispatch("fetchData", "small");
  },
};
</script>

<style lang="scss"    >
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

.dropdown {
  &__box {
    width: 20px;
    height: 20px;
    margin-left: 10px;
  }

  &__img {
    fill: black;
    width: 100%;
    height: 100%;

    &__active {
      transform: rotate(180deg)
    }
  }
}

.form__represent {
  margin-top: 40px;
}

.paginate-links {
  display: flex;
  list-style-type: none;
  justify-content: space-around;
  font-size: 24px;

}

.paginate-links.pages {
  user-select: none;
  & a {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  li.active a {
    font-weight: bold;
    text-decoration: underline;
  }
}


</style>

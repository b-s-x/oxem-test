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

    <list-loader class="loader" v-if="getLoading"/>

    <div v-else class="table__container">
      <paginate :list="getDataTable" :per="50" name="pages">
        <table-template :dataTable="paginated('pages')" :header="header">

          <template #header="{ column, index }">

            <div class="table__item" @click="sortBy(column.field, index)">
              <div class="item">
                <div>{{ column.caption }}</div>

                <div class="dropdown__box">
                  <svg class="dropdown__img" :class="checkASortKey(index)">
                    <use xlink:href="../../public/down-arrow.svg#dropdown" />
                  </svg>
                </div>
              </div>
            </div>
          </template>

          <template #tableItem="{ item }">

            <div class="table__item" @click="selectUserId(item.id)">

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
        :limit="10"
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
import ListLoader from "../components/ListLoader"

export default {
  name: "App",
  components: {
    TableTemplate,
    AddTableItem,
    FormRepresentation,
    ListLoader,
  },

  data() {
    return {
      header: [
        { field: "id", caption: "ID" },
        { field: "firstName", caption: "First Name" },
        { field: "lastName", caption: "Last Name" },
        { field: "email", caption: "Email" },
        { field: "phone", caption: " Phone" },
      ],

      sort: {
        // Array.prototype.sort() мутирует массив на котором вызван, поэтому
        // сохраняем отдельно ссылку на отсортированные данные (можно это
        // сделать внутри store )
        data: null,
        field: null,
        reverse: false,
      },

      isVisible: false,
      pickAUser: null,
      activeDropdown: null,

      paginate: ["pages"],
    };
  },

  computed: {
    ...mapGetters({
      getDataSet: "getDataSet",
      getLoading: "getLoading"
    }),

    getDataTable() {
      return this.sort.data || this.getDataSet;
    },
  },

  methods: {
    sortBy(field, index) {
      this.sort.reverse =
        this.sort.field === field ? !this.sort.reverse : false;
      this.sort.field = field;
      this.sort.data = this.sortByField(field);

      this.setActiveDropdown(index)
    },

    checkASortKey(index) {
      return {
        dropdown__img__active: index === this.activeDropdown && !this.sort.reverse,
      };
    },

    setActiveDropdown(index) {
      this.activeDropdown = index;
    },

    selectUserId(id) {
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

    sortByField(field) {
      const factor = this.sort.reverse ? -1 : 1;

      return this.getDataSet.slice().sort((a, b) => {
        let [lhs, rhs] = [a[field], b[field]];

        if (field === "phone") {
          [lhs, rhs] = [a.phone.charAt(1), b.phone.charAt(1)];
        } else if (["firstName", "lastName"].includes(field)) {
          [lhs, rhs] = [lhs.toLowerCase(), rhs.toLowerCase()];
        }

        return factor * (rhs < lhs ? 1 : rhs > lhs ? -1 : 0);
      });
    },
  },

  async mounted() {
    await this.$store.dispatch("fetchData");
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
    transition: 0.5s ease;

    &__active {
      transform: rotate(180deg);
      transition: 0.5s ease;
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

.loader {
  display: flex;
  margin-top: 150px;
}

</style>

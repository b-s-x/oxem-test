<template>
  <div class="content-box">
    <div class="table-title divider">
      <div
        class="title"
        v-for="(col, index) of header"
        :key="index"
      >
        <slot name="header" :column="col" :index="index"> </slot>
      </div>
    </div>

    <div class="table-context"
      v-for="(data, index) of dataTable"
      :key="index"
    >
      <slot name="tableItem" :item="data"> </slot>
    </div>
  </div>

</template>

<script>

export default {
  props: {
    dataTable: { type: Array, default: () => [] },

    // Если бы это был Typescript, можно было бы явно указать что header должен
    // быть массивом из объектов с полями field, caption
    header: { type: Array, default: () => [] },
  },
}
</script>

<style lang="scss" scoped>

.table-title {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.divider {
  border-bottom: 1px solid grey;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  width: clamp(100px, 50%, 160px);
  text-align: center;
}

</style>

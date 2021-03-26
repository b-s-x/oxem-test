<template>
  <div class="represent">
    <div class="represent__text">
      Выбран пользователь:
      <b> {{ pickAUser.firstName }} {{ pickAUser.lastName }} </b>
    </div>

    <div class="represent__text">Описание:</div>
    <textarea class="represent__textarea">
      {{ pickAUser.description }}
    </textarea>

    <div class="represent__text">
      Адрес проживания:
      <b> {{ pickAUser.address.streetAddress }} </b>
    </div>

    <div class="represent__text">
      Город:
      <b> {{ pickAUser.address.city }} </b>
    </div>

    <div class="represent__text">
      Провиниция/штат:
      <b> {{ pickAUser.address.state }} </b>
    </div>

    <div class="represent__text">
      Индекс:
      <b> {{ pickAUser.address.zip }} </b>
    </div>
  </div>
</template>

<script>
function defaultOptions() {
  return {
    id: 876,
    firstName: "Angelique",
    lastName: "Pillai",
    email: "VCallison@vitae.net",
    phone: "(736)103-3243",
    address: {
      streetAddress: "5633 Nunc St",
      city: "Miami",
      state: "AL",
      zip: "37191",
    },
    description:
      "aliquam amet lacus placerat egestas malesuada sagittis nec egestas nullam magna morbi consequat amet sed dolor vel convallis lacus etiam ac sed dolor vel molestie tincidunt porta etiam lorem libero porta molestie",
  };
}

export default {
  props: {
    pickAUser: {
      type: Object,
      default: () => ({
        ggg: 222,
      }),
    },
  },
};
</script>

<style lang="scss" scoped>
.represent {
  &__textarea {
    width: 400px;
    height: 150px;
    font-size: 16px;
  }

  &__text {
    font-size: 24px;
  }
}
</style>

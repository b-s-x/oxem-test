<template>
  <div class="input__container">
    <form class="input__container" @submit.prevent="createTableItem" unvalidate>
      <div class="input__group">
        <label for="id" class="input__label"> id </label>
        <input
          class="input__item"
          type="text"
          :class="status(this.$v.formItem.id)"
          @blur="$v.formItem.id.$touch()"
          v-model="formItem.id"
          id="id"
        />

        <transition name="fade" mode="out-in">
          <div v-if="errorVisible.id" class="form-error__text">
            {{ msgIsANumber }}
          </div>
        </transition>
      </div>

      <div class="input__group">
        <label for="name" class="input__label"> name </label>
        <input
          class="input__item"
          type="text"
          :class="status(this.$v.formItem.name)"
          @blur="$v.formItem.name.$touch()"
          v-model="formItem.name"
          id="name"
        />

        <transition name="fade" mode="out-in">
          <div v-if="errorVisible.name" class="form-error__text">
            {{ msgAlpha }}
          </div>
        </transition>
      </div>

      <div class="input__group">
        <label for="surname" class="input__label"> surname </label>
        <input
          class="input__item"
          type="text"
          :class="status(this.$v.formItem.surname)"
          @blur="$v.formItem.surname.$touch()"
          v-model="formItem.surname"
          id="surname"
          />

          <transition name="fade" mode="out-in">
            <div v-if="errorVisible.surname" class="form-error__text">
              {{ msgAlpha }}
            </div>
          </transition>
      </div>

      <div class="input__group">
        <label for="email" class="input__label"> email </label>
        <input
          class="input__item"
          type="text"
          :class="status(this.$v.formItem.email)"
          @blur="$v.formItem.email.$touch()"
          v-model="formItem.email"
          id="email"
          />

          <transition name="fade" mode="out-in">
            <div v-if="errorVisible.email" class="form-error__text">
              {{ msgToBeEmail }}
            </div>
          </transition>
      </div>

      <div class="input__group">
        <label class="input__label"> phone </label>
        <input
          class="input__item"
          type="text"
          @blur="$v.formItem.phone.$touch()"
          :class="status(this.$v.formItem.phone)"
          v-model="formItem.phone"
          v-imask="masks"
          placeholder="+7(777)777-77-77"
          />

        <transition name="fade" mode="out-in">
          <div v-if="errorVisible.phone" class="form-error__text">
            {{ msgRequired }}
          </div>
        </transition>
      </div>

      <button
        class="btn"
        type="submit"
        :disabled="disabledRegister"
        >Добавить в таблицу</button>
    </form>
  </div>
</template>

<script>
import { IMaskDirective } from 'vue-imask';

import { email, numeric, helpers, required, minLength } from "vuelidate/lib/validators";
const alpha = helpers.regex("alpha", /^[a-zA-Za-яёА-ЯЁ]*$/);

// Если бы FormItem был бы классом, эта функция пропала бы отсюда, и везде вызывался бы
// какой нибудь FormItem.empty()
const newEmptyFormItem = () => {
  return {
    id: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
  };
};

export default {
  data() {
    return {
      submitStatus: null,
      msgIsANumber: "В поле не должно содержаться букв и других символов, только цифры",
      msgAlpha: "В поле должны быть только буквы",
      msgToBeEmail: "Это поле должно быть email адресом",
      msgRequired: "Это поле обязательно для заполнения",
      masks: {
        mask: "{+7}(000)000-00-00",
        lazy: true,
      },

      formItem: newEmptyFormItem(),
    };
  },

  validations: {
    formItem: {
      id: {
        numeric,
        required
      },
      name: {
        alpha,
        required
      },
      surname: {
        alpha,
        required
      },
      email: {
        required,
        email,
      },
      phone: {
        required,
        minLength: minLength(16)
      }
    },
  },

  directives: {
    imask: IMaskDirective
  },

  methods: {
    status(validator) {
      return {
        "form-error": validator.$error,
      };
    },

    clearForm() {
      this.formItem = newEmptyFormItem();
    },

    createTableItem() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        // Это называется early return - если выполнение ветки if'а не
        // подразумевает продолжение выполнения можно просто сделать return
        // Уровень вложенности кода при этом падает на 1 (нет ветки else)
        return;
      }

      this.submitStatus = "OK";

      // for (let input in this.formItem) {
      //   this.formItem[input] = "";
      // }
      this.$v.$reset();
      this.$emit('createTableItem', {
        id: this.formItem.id,
        firstName: this.formItem.name,
        lastName: this.formItem.surname,
        email: this.formItem.email,
        phone: this.formItem.phone,
      });

      this.clearForm();
    },
  },

  computed: {
    errorVisible() {
      const { id, name, surname, email, phone } = this.$v.formItem;

      return {
        id: id.$dirty && id.$error,
        name: name.$dirty && name.$error,
        surname: surname.$dirty && surname.$error,
        email: email.$dirty && email.$error,
        phone: phone.$dirty && phone.$error,
      }
    },
    disabledRegister() {
      return this.$v.$anyError;
    },
  },
};
</script>

<style lang="scss" scoped>

@import "../styles/common";

.input {
  &__container {
    margin-top: 35px;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  &__group {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  &__item {
    margin: 15px;
    height: 30px;
    border-radius: 15px;
    outline: none;
  }

  &__label {
    margin-left: 25px;
  }
}

.btn {
  @extend %btn;
}

.form-error {
  background: red;

  &__text {
    color: red;
    width: 250px;
  }
}

</style>

<template>
  <div>
    <base-dialog :show="!!error" title="註冊失敗" @close="handleError">
      {{ error }}
    </base-dialog>
    <base-dialog :show="isLoading" fixed title="請稍等">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="text" id="email" v-model.trim="email" />
        </div>

        <div class="form-control">
          <label for="password">password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>

        <p v-if="!formIsValid">請輸入有效的email,且密碼至少6位數</p>

        <base-button>{{ submitBtnCaption }}</base-button>
        <base-button @click="switchAuthMode" type="button" mode="flat">
          {{ switchBtnCaption }}
        </base-button>
      </form>
    </base-card>
  </div>
</template>


<script>
export default {
  data() {
    return {
      mode: '登入',
      email: '',
      password: null,
      formIsValid: true,
      isLoading: false,
      error: null,
    };
  },

  computed: {
    submitBtnCaption() {
      if (this.mode === '登入') {
        return '登入';
      } else {
        return '註冊';
      }
    },

    switchBtnCaption() {
      if (this.mode === '登入') {
        return '沒有帳號嗎？現在註冊';
      } else {
        return '已經有帳號了？現在登入';
      }
    },
  },

  methods: {
    switchAuthMode() {
      if (this.mode == '登入') {
        this.mode = '註冊';
      } else {
        this.mode = '登入';
      }
    },

    async submitForm() {
      this.formIsValid = true;
      this.formValidation();

      if (!this.formIsValid) {
        return;
      }

      this.isLoading = true;

      const actionPayload = {
        email: this.email,
        password: this.password,
      };

      try {
        if (this.mode === '註冊') {
          await this.$store.dispatch('signup', actionPayload);
        } else {
          await this.$store.dispatch('login', actionPayload);
        }

        const redirectUrl = `/${this.$route.query.redirect || 'coaches'}`;

        this.$router.replace(redirectUrl);
      } catch (error) {
        this.error = error;
      }

      this.isLoading = false;
    },

    formValidation() {
      if (
        this.email == '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
      }
    },

    handleError() {
      this.error = null;
    },
  },
};
</script>



<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

p {
  color: red;
}
</style>
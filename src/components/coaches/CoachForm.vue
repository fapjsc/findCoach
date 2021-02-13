<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstname.isValid }">
      <label for="firstname">Firstname</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstname.val"
        @input="clearValid('firstname')"
      />
      <p v-if="!firstname.isValid">firstname must not be empty</p>
    </div>

    <div class="form-control" :class="{ invalid: !lastname.isValid }">
      <label for="lastname">lastname</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="lastname.val"
        @input="clearValid('lastname')"
      />
      <p v-if="!lastname.isValid">lastname must not be empty</p>
    </div>

    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.val"
        @input="clearValid('description')"
      ></textarea>
      <p v-if="!description.isValid">description must not be empty</p>
    </div>

    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="hourlyrate">hourly rate</label>
      <input
        type="number"
        id="hourlyrate"
        v-model.number="rate.val"
        @input="clearValid('rate')"
      />
      <p v-if="!rate.isValid">rate must not be empty</p>
    </div>

    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          v-model="areas.val"
          value="frontend"
          @change="clearValid('areas')"
        />
        <label for="frontend">frontend</label>
      </div>

      <div>
        <input
          type="checkbox"
          id="backend"
          v-model="areas.val"
          value="backend"
          @change="clearValid('areas')"
        />
        <label for="backend">backend</label>
      </div>

      <div>
        <input
          type="checkbox"
          id="career"
          v-model="areas.val"
          value="career"
          @change="clearValid('areas')"
        />
        <label for="career">career</label>
      </div>
    </div>

    <p v-if="!areas.isValid">at less one expertise must be select</p>

    <p v-if="!formIsValid">please fix the above errors and submit again!</p>

    <base-button>Register</base-button>
  </form>
</template>


<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstname: {
        val: '',
        isValid: true,
      },
      lastname: {
        val: '',
        isValid: true,
      },
      description: {
        val: '',
        isValid: true,
      },
      rate: {
        val: null,
        isValid: true,
      },
      areas: {
        val: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },

  methods: {
    clearValid(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.firstname.val === '') {
        this.firstname.isValid = false;
        this.formIsValid = false;
      }

      if (this.lastname.val === '') {
        this.lastname.isValid = false;
        this.formIsValid = false;
      }

      if (this.description.val === '') {
        this.description.isValid = false;
        this.formIsValid = false;
      }

      if (!this.rate.val || this.rate <= 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }

      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        first: this.firstname.val,
        last: this.lastname.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val,
      };

      this.$emit('save-data', formData);
    },
  },
};
</script>




<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
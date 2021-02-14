<template>
  <base-dialog
    :show="!!error"
    :title="'something went wrong'"
    @close="handleError"
  >
    {{ error }}
  </base-dialog>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <base-spinner v-if="isLoading"></base-spinner>
      <CoachForm v-else @saveData="saveData" />
    </base-card>
  </section>
</template>



<script>
import CoachForm from '@/components/coaches/CoachForm';
export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  components: {
    CoachForm,
  },
  methods: {
    async saveData(data) {
      this.isLoading = true;

      try {
        await this.$store.dispatch('coaches/registerCoach', data);
        this.$router.replace('/coaches');
      } catch (error) {
        this.error = error || 'register error';
      }
      this.isLoading = false;
    },

    handleError() {
      this.error = null;
    },
  },
};
</script>
<template>
  <div>
    <base-dialog
      :show="!!error"
      :title="'something went wrong'"
      @close="handleError"
      >{{ error }}</base-dialog
    >
    <section>
      <base-card>
        <header>
          <h2>Requests Recived</h2>
        </header>

        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasRequests && !isLoading">
          <RequestItem
            v-for="req in receivedRequests"
            :key="req.id"
            :email="req.userEmail"
            :message="req.message"
          />
        </ul>
        <h3 v-else-if="hasToken && !isLoading">目前還沒有訊息</h3>
        <h3 v-else-if="!hasToken && !isLoading">請先登入並且註冊爲coach</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import RequestItem from '@/components/requests/RequestItem';

export default {
  created() {
    this.loadRequests();
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  components: {
    RequestItem,
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/requests'];
    },

    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    },

    hasToken() {
      return this.$store.getters['token'];
    },
  },

  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/loadRequests');
      } catch (error) {
        this.error = error.message || 'loading request error';
      }
      this.isLoading = false;
    },

    handleError() {
      this.error = null;
    },
  },
};
</script>


<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
<template>
  <div>
    <base-dialog
      :show="!!error"
      :title="'smoething is wrong'"
      @close="handleError"
    >
      {{ error }}
    </base-dialog>
    <section>
      <CoachFilter @changeFilter="setFilter" />
    </section>

    <section>
      <base-card>
        <div class="controls">
          <base-button @click="loadCoaches(true)" class="outline"
            >更新</base-button
          >
          <base-button
            v-if="!isCoach && !isLoading && isLogin"
            link
            to="/register"
            >成為coach</base-button
          >

          <base-button
            v-if="!isCoach && !isLoading && !isLogin"
            link
            to="/auth?redirect=register"
            >登入並且成為coach</base-button
          >
        </div>

        <base-spinner v-if="isLoading"></base-spinner>

        <ul v-else-if="hasCoaches">
          <CoachItem
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :coach="coach"
          />
        </ul>

        <h3 v-else>No Coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>


<script>
import CoachItem from '@/components/coaches/CoachItem';
import CoachFilter from '@/components/coaches/CoachFilter';

export default {
  created() {
    this.loadCoaches();
  },
  data() {
    return {
      filterActive: {
        frontend: true,
        backend: true,
        career: true,
      },

      isLoading: false,
      error: null,
    };
  },
  components: {
    CoachItem,
    CoachFilter,
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];

      return coaches.filter((coache) => {
        if (this.filterActive.frontend && coache.areas.includes('frontend')) {
          return true;
        }

        if (this.filterActive.backend && coache.areas.includes('backend')) {
          return true;
        }

        if (this.filterActive.career && coache.areas.includes('career')) {
          return true;
        }

        return false;
      });
    },

    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },

    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },

    isLogin() {
      return this.$store.getters['isVerification'];
    },
  },

  methods: {
    setFilter(updatefilter) {
      this.filterActive = updatefilter;
    },

    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error || 'fetch coaches error';
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
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
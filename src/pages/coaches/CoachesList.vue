<template>
  <section>
    <CoachFilter @changeFilter="setFilter" />
  </section>

  <section>
    <base-card>
      <div class="controls">
        <base-button @click="loadCoaches" class="outline">Refresh</base-button>
        <base-button v-if="!isCoach && !isLoading" link to="/register"
          >Register as coach</base-button
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
  },

  methods: {
    setFilter(updatefilter) {
      this.filterActive = updatefilter;
    },

    async loadCoaches() {
      this.isLoading = true;
      await this.$store.dispatch('coaches/loadCoaches');
      this.isLoading = false;
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
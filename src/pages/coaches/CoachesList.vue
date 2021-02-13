<template>
  <section>
    <CoachFilter @changeFilter="setFilter" />
  </section>

  <section>
    <base-card>
      <div class="controls">
        <base-button class="outline">Refresh</base-button>
        <base-button link to="/register">Register as coach</base-button>
      </div>

      <ul v-if="hasCoaches">
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
  data() {
    return {
      filterActive: {
        frontend: true,
        backend: true,
        career: true,
      },
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
  },

  methods: {
    setFilter(updatefilter) {
      this.filterActive = updatefilter;
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
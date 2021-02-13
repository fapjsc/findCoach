<template>
  <section>
    <CoachFilter />
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
  components: {
    CoachItem,
    CoachFilter,
  },
  computed: {
    filteredCoaches() {
      return this.$store.getters['coaches/coaches'];
    },

    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
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
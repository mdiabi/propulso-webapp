<template>
  <div class="statistics-container">
    <h1>Statistics</h1>
    <form @submit.prevent="fetchStoreStatistics">
      <label for="dateInput">Enter Date:</label>
      <input id="dateInput" type="date" v-model="selectedDate" required />
      <button type="submit">Fetch Store Statistics</button>
    </form>
    <div v-if="statistics" class="statistics-section">
      <div class="stat">
        <span class="stat-label">Average time visit:</span>
        <span>{{ statistics['average_time_visit'] }}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Total day visit:</span>
        <span>{{ statistics['total_daily_visits'] }}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Total day visitors:</span>
        <span>{{ statistics['total_daily_visitors'] }}</span>
      </div>
    </div>

    <!-- Error handling -->
    <div v-if="error !== null" class="error-container">
      <span>Error: {{ error }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface StoreStatistics {
  average_time_visit: string;
  total_daily_visits: number;
  total_daily_visitors: number;
}

export default defineComponent({
  data() {
    return {
      selectedDate: '', 
      statistics: {} as StoreStatistics,
      error: null as string | null,
    };
  },
  methods: {
    async fetchStoreStatistics() {
      try {
        const response = await fetch(`http://localhost:8000/store/1/statistics/${this.selectedDate}`);
        if (!response.ok) {
          throw new Error('Failed to fetch store statistics');
        }
        const responseData = await response.json();
        this.statistics = responseData as StoreStatistics;
        this.error = null; // Reset error on successful fetch
      } catch (error) {
        this.error = 'An error occurred while fetching store statistics';
        console.error('Error fetching store statistics:', error);
      }
    },
  },
});
</script>

<style scoped>
.statistics-container {
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

form {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

label {
  margin-right: 10px;
}

input[type="date"] {
  padding: 8px;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  background-color: #3498db;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}

.statistics-section {
  margin-top: 20px;
}

.stat {
  margin-bottom: 10px;
}

.stat-label {
  font-weight: bold;
  margin-right: 10px;
}

.error-container {
  margin-top: 20px;
  color: red;
  font-weight: bold;
}
</style>
<template>
  <div class="visitors-container">
    <h1>List of Visitors</h1>
    <button class="fetch-button" @click="fetchVisitors">Fetch Visitors</button>


    <div class="table-container">
      <table class="visitors-table">
        <thead>
          <tr>
            <th>Visitor ID</th>
            <!-- Add other table headers -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="visitor in paginatedVisitors" :key="visitor.visitor_id">
            <td>{{ visitor.visitor_id }}</td>
            <!-- Display other visitor data -->
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination-controls">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage * perPage >= totalVisitors">Next</button>
    </div>

    <div class="error-container" v-if="error !== null">
      <p>Error: {{ error }}</p>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

// Define interfaces
interface Entry {
  visitor_id: string;
  // Define other properties of Entry
}

interface Visit {
  entries: Entry[];
  duration: string;
  // Define other properties of Visit
}

interface Visitor {
  visitor_id: string;
  visits: Visit[];
  // Define other properties of Visitor
}

interface StoreStatistics {
  average_time_visit: string;
  total_daily_visits: number;
  total_daily_visitors: number;
}

export default defineComponent({
  data() {
    return {
      statistics: {} as StoreStatistics, // Store statistics
      visitors: [] as Visitor[], // All visitors data
      paginatedVisitors: [] as Visitor[], // Paginated visitors data
      perPage: 10, // Visitors per page
      currentPage: 1, // Current page
      totalVisitors: 0, // Total number of visitors
      error: null as string | null,
    };
  },
  methods: {
    async fetchVisitors() {
      try {
        const response = await fetch(`http://localhost:8000/store/1/visitors?page=${this.currentPage}&page_size=${this.perPage}`);
        if (!response.ok) {
          throw new Error('Failed to fetch visitors');
        }
        const responseData = await response.json();
        this.visitors = responseData;
        this.totalVisitors = responseData.length; // Update total number of visitors
        this.paginatedVisitors = this.visitors.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
        this.error = null; // Reset error on successful fetch
      } catch (error) {
        this.error = 'An error occurred while fetching visitors';
        console.error('Error fetching visitors:', error);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.paginatedVisitors = this.visitors.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
      }
    },
    nextPage() {
      if (this.currentPage * this.perPage < this.totalVisitors) {
        this.currentPage++;
        this.paginatedVisitors = this.visitors.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
      }
    },
  },
});
</script>

<style scoped>
.visitors-container {
  margin: 20px;
}

.fetch-button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  background-color: #3498db;
  color: white;
  cursor: pointer;
}

.fetch-button:hover {
  background-color: #2980b9;
}

.pagination-controls {
  margin-bottom: 10px;
}

.pagination-controls button {
  margin: 0 5px;
  padding: 5px 10px;
  font-size: 14px;
  background-color: #f0f0f0;
  cursor: pointer;
}

.pagination-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.table-container {
  overflow-x: auto;
}

.visitors-table {
  width: 100%;
  border-collapse: collapse;
}

.visitors-table th,
.visitors-table td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.error-container {
  margin-top: 10px;
  color: red;
}
</style>
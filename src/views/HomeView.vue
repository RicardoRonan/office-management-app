<template>
  <div class="page">
    <div class="home-heading-div">
      <h2 class="home-heading">All Offices</h2>
    </div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error" class="error-message">
      <p>Error loading offices: {{ error }}</p>
      <button @click="loadData" class="retry-button">Retry</button>
    </div>
    <div v-else-if="offices.length">
      <OfficeCard
      v-for="office in offices"
      :key="office.id"
      :office="office"
      @edit-worker="editWorker"
      @delete-worker="deleteWorker"
      @add-worker="addWorker"
      @delete-office="deleteOffice"
      @click="viewOffice(office)"
      />
    </div>
    <div v-else class="no-offices">
      <p>No offices found. Create your first office!</p>
    </div>
    <div class="add-button">
      <router-link to="/office/new"><img src="../assets/add-button.svg" alt="add-button"  /></router-link>
    </div>
  </div>
</template>
<script>
import OfficeCard from '../components/OfficeCard.vue'
import { useOfficeStore } from '../store';  // Import Pinia store

export default {
  components: {
    OfficeCard
  },
  data() {
    return {
      officeStore: null,
      isLoading: true,
      error: null
    }
  },
  computed: {
    offices() {
      if (!this.officeStore) return [];
      return this.officeStore.getOffices;
    }
  },
  async mounted() {
    this.officeStore = useOfficeStore();
    await this.loadData();
  },
  methods: {
    async loadData() {
      this.isLoading = true;
      this.error = null;
      try {
        await this.officeStore.loadState();
      } catch (err) {
        console.error("Error loading state:", err);
        this.error = err.message || "Failed to load offices. Please check your connection.";
      } finally {
        this.isLoading = false;
      }
    },
    viewOffice(office) {
      this.$router.push({ name: "office", params: { id: office.id } });
    },
    editWorker(worker) {
      // Handle edit worker if needed
    },
    deleteWorker(workerId) {
      // Handle delete worker if needed
    },
    addWorker(officeId) {
      // Handle add worker if needed
    },
    deleteOffice(officeId) {
      // Handle delete office if needed
    }
  }
}
</script>
<style scoped>
.error-message {
  text-align: center;
  padding: 2rem;
  color: var(--delete-button-color);
}

.retry-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: var(--action-button-color);
  color: white;
  border-radius: 0.25rem;
  cursor: pointer;
}

.retry-button:hover {
  opacity: 0.9;
}

.no-offices {
  text-align: center;
  padding: 2rem;
  color: var(--text-font-color);
}
</style>
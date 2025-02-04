<template>
  <div class="page">
    <div class="page-header">
      <button @click="goBack()" class="back-button"><img src="../assets/arrow-left.svg" alt="back-button" class="icon" /> </button>
      <div class="page-heading-div">
        <h3 class="page-heading">Office</h3>
      </div>
    </div>

    <OfficeCard
      v-if="office"
      :office="office"
      @edit-worker="editWorker"
      @delete-worker="deleteWorker"
      @add-worker="addWorker"
      @delete-office="deleteOffice"
    />
    <div v-if="office">
      <input class="search-staff-member" placeholder="Search" type="text"/>
      <!-- Display workers associated with the office -->
       <div id="staff-members-heading-div">
          <h4 id="staff-members-heading">Staff Members In Office</h4> 
          <h4 id="staff-members-count">{{ office.workers.length }} </h4>
       </div>
      <ul>
        <div v-for="worker in office.workers" :key="worker.workerId">
          {{ worker.name }} - {{ worker.role }}
          <button @click="editWorker(worker)">Edit</button>
          <button @click="deleteWorker(worker.workerId)">Delete</button>
        </div>
      </ul>

      <!-- Add New Worker -->
      <button @click="addWorker"><img src="../assets/add-button.svg" alt="add-button" class="add-button" /></button>

      <router-link :to="`/office/${office.id}/edit`">Edit Office</router-link>

      <button  @click="deleteOffice">Delete Office</button>
    </div>

    <p v-else>Loading...</p>
  </div>
</template>

<script>
import { useOfficeStore } from '../store';  
import OfficeCard from '@/components/OfficeCard.vue';

export default {
  components: {
    OfficeCard
  },
  data() {
    return {
      office: null
    }
  },
  computed: {
    officeId() {
      return this.$route.params.id
    }
  },
  methods: {
    goBack() {
        this.$router.go(-1)
      },
      fetchOffice() {
      const officeStore = useOfficeStore(); // Access Pinia store

      // Fetch office details by ID using the getter
      const officeData = officeStore.getOffices.find(o => o.id === parseInt(this.officeId));

      if (officeData) {
        this.office = { ...officeData }; // Copy to avoid modifying store data
        this.office.workers = officeStore.getWorkers.filter(worker => worker.officeId === this.office.id);
      } else {
        this.office = null; // Reset if office is not found
      }
    },

    deleteOffice() {
      if (confirm("Are you sure you want to delete this office?")) {
        const officeStore = useOfficeStore();
        officeStore.deleteOffice(this.office.id);
        this.$router.push('/');
      }
    },
    addWorker() {
      // Redirect to worker form for adding a new worker (assuming you have a worker form page)
      this.$router.push({ name: 'addWorker', params: { officeId: this.office.id } });
    },
    editWorker(worker) {
  this.$router.push({
    name: 'editWorker',
    params: { workerId: worker.workerId, officeId: this.office.id }
  });
},
       deleteWorker(workerId) {
        if (confirm("Are you sure you want to delete this worker?")) {
      const officeStore = useOfficeStore();
      officeStore.deleteWorker(workerId);  
      this.fetchOffice(); 
         } // Re-fetch the office data to update the UI after deleting a worker
    }
  },
  watch: {
    '$route.params.id': 'fetchOffice'
  },
  created() {
    this.fetchOffice();
  }
}
</script>
<style scoped>
.page{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.search-staff-member {
  padding: 0.75rem 0.5rem;
  border: none;
  border-radius: 0.5rem;
  width: 21.25rem;
}
#staff-members-heading-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width:100%;
  height :3.875rem;
}
#staff-members-heading {
  font-size: 1.5rem;
  letter-spacing: -2%;
  font-weight: 600;
  color: #000;
  line-height: 1.816rem;
}
#staff-members-count {
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.5rem;
}
</style>

<template>
  <div>
    <h1>Office Details</h1>

    <!-- Display office details if they exist -->
    <div v-if="office">
      <h3>{{ office.name }}</h3>
      <p><strong>Location:</strong> {{ office.location }}</p>
      <p> {{ office.workers.length }} Staff members in Office</p>

      <!-- Display workers associated with the office -->
      <h4>Staff Members In Office</h4> 
      <ul>
        <div v-for="worker in office.workers" :key="worker.workerId">
          {{ worker.name }} - {{ worker.role }}
          <button @click="editWorker(worker)">Edit</button>
          <button @click="deleteWorker(worker.workerId)">Delete</button>
        </div>
      </ul>

      <!-- Add New Worker -->
      <button @click="addWorker">Add Worker</button>

      <router-link :to="`/office/${office.id}/edit`">Edit Office</router-link>

      <button  @click="deleteOffice">Delete Office</button>
    </div>

    <p v-else>Loading...</p>
  </div>
</template>

<script>
import { useOfficeStore } from '../store';  
// import { useRouter } from 'vue-router'; 

export default {
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
    fetchOffice() {
      const officeStore = useOfficeStore();
      
      // Fetch office details by ID
      this.office = officeStore.getOffices.find(o => o.id === parseInt(this.officeId));

      if (this.office) {
        // Fetch and attach workers based on the office ID
        this.office.workers = officeStore.getWorkers.filter(worker => worker.officeId === this.office.id);
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

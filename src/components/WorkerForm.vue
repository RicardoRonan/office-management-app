<template>
  <div>
    <h3>{{ isEdit ? 'Edit' : 'Add' }} Worker</h3>
    <form @submit.prevent="submitForm">
      <input v-model="worker.name" placeholder="Worker Name" />
      <input v-model="worker.role" placeholder="Role" />
      <button type="submit">{{ isEdit ? 'Save Changes' : 'Add Worker' }}</button>
    </form>
  </div>
</template>

<script>
import { useOfficeStore } from '../store';

export default {
  props: ['officeId'],  // Receive the officeId as a prop from the route params
  data() {
    return {
      worker: { workerId: null, name: '', role: '', officeId: this.officeId },
    };
  },
  computed: {
    isEdit() {
      return !!this.$route.params.workerId;  // Checks if workerId exists in route params to determine edit mode
    },
    workerId() {
      return this.$route.params.workerId; // Get workerId from the route params
    }
  },
  methods: {
    submitForm() {
  const officeStore = useOfficeStore();  // Accessing Pinia store

  if (this.isEdit) {
    // If editing, create a new worker object with updated data
    const updatedWorker = { ...this.worker, workerId: parseInt(this.workerId, 10) };  // Ensure workerId is from route
    console.log('Updating worker:', updatedWorker);  // Debugging
    officeStore.editWorker(updatedWorker);  // Update worker in the store
  } else {
    // If adding, generate a new worker ID and add the worker
    const maxWorkerId = this.getMaxWorkerId();
    const workerId = maxWorkerId + 1;  // Calculate the new workerId
    const newWorker = { 
      ...this.worker, 
      workerId, 
      officeId: Number(this.officeId) 
    };
    console.log('Adding new worker:', newWorker);  // Debugging
    officeStore.addWorker(newWorker);  // Add new worker to the store
  }

  officeStore.loadState();  // Persist state if needed
  this.$router.push(`/office/${this.officeId}`);  // Redirect back to office details page
},

    getMaxWorkerId() {
      const officeStore = useOfficeStore();  // Get store to access workers
      return Math.max(...officeStore.getWorkers.map(worker => worker.workerId), 0);  // Get max workerId
    }
  },
  created() {
    if (this.isEdit) {
      const officeStore = useOfficeStore();
      const workerToEdit = officeStore.getWorkers.find(worker => worker.workerId === parseInt(this.workerId));  // Get worker to edit

      if (workerToEdit) {
        this.worker = { ...workerToEdit };  // Pre-fill worker data for editing
      }
    }
  }
};
</script>

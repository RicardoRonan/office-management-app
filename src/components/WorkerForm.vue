<template>
  <div>
    <h3>{{ isEdit ? "Edit" : "Add" }} Worker</h3>
    <form @submit.prevent="submitForm">
      <input v-model="worker.FirstName" placeholder="First Name" />
      <input v-model="worker.LastName" placeholder="Last Name" />
      <div>
        <label for="avatar">Choose an Avatar:</label>
        <div>
          <img
            v-for="avatar in availableAvatars"
            :key="avatar"
           :src="avatar"
            :value="avatar"
            :class="{ selected: worker.Avatar === avatar }"
            @click="selectAvatar(avatar)"
            class="avatar-option"
          />
        </div>
      </div>
      <button type="submit">
        {{ isEdit ? "Update Staff Member" : "Add Staff Member" }}
      </button>
    </form>
  </div>
</template>

<script>
import { useOfficeStore } from "../store";

export default {
  props: ["officeId"],
  data() {
    return {
      worker: {
        workerId: null,
        officeId: this.officeId,
        FirstName: "",
        LastName: "",
        Avatar: "",
      },
    };
  },
  computed: {
    isEdit() {
      return !!this.$route.params.workerId; // Checks if workerId exists in route params to determine edit mode
    },
    workerId() {
      return this.$route.params.workerId; // Get workerId from the route params
    },
    availableAvatars() {
      const officeStore = useOfficeStore();
      return officeStore.availableAvatars;
    },
  },
  methods: {
    submitForm() {
      const officeStore = useOfficeStore(); 

      if (this.isEdit) {
        const updatedWorker = {
          ...this.worker,
          workerId: parseInt(this.workerId, 10),
        }; 
        officeStore.editWorker(updatedWorker); 
      } else {
        const maxWorkerId = this.getMaxWorkerId();
        const workerId = maxWorkerId + 1; 
        const newWorker = {
          ...this.worker,
          workerId,
          officeId: Number(this.officeId),
        };
        officeStore.addWorker(newWorker); 
      }

      officeStore.loadState(); // Persist state if needed
      this.$router.push(`/office/${this.officeId}`); // Redirect back to office details page
    },

    getMaxWorkerId() {
      const officeStore = useOfficeStore(); // Get store to access workers
      return Math.max(...officeStore.getWorkers.map((worker) => worker.workerId), 0);
    },
    selectAvatar(avatar) {
    this.worker.Avatar = avatar; 
    },
  },
  created() {
    if (this.isEdit) {
      const officeStore = useOfficeStore();
      const workerToEdit = officeStore.getWorkers.find(
  (worker) => worker.workerId === parseInt(this.workerId)
);

      if (workerToEdit) {
        this.worker = { ...workerToEdit }; // Pre-fill worker data for editing
      }
    }
  },
};
</script>
<style scoped>
.avatar-option:hover {
  border: 2px solid #ccc;
}

.selected {
  border: 3px solid #007bff; /* Blue border for selected avatar */
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
}
</style>

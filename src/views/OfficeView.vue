<template>
  <div class="page">
    <div class="page-header">
      <button @click="goBack()" class="back-button">
        <img src="../assets/arrow-left.svg" alt="back-button" class="icon" />
      </button>
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
      <div class="search-staff-member-div">
        <input class="search-staff-member" placeholder="Search" type="text" />
      </div>
      <!-- Display workers associated with the office -->
      <div id="staff-members-heading-div">
        <h4 id="staff-members-heading">Staff Members In Office</h4>
        <h4 id="staff-members-count">{{ office.workers.length }}</h4>
      </div>
      <ul>
        <div
          v-for="worker in office.workers"
          :key="worker.workerId"
          class="worker-div"
        >
          <div class="worker-details">
            <img v-bind:src="worker.Avatar" alt="avatar" />
            <p class="worker-name">
              {{ worker.FirstName }} {{ worker.LastName }}
            </p>
          </div>
          <div class="worker-menu">
            <img src="../assets/3-dots.svg" class="icon" alt="3-dot-menu" />
          </div>
        </div>
        <div class="menu-pop-up">

          <button @click="editWorker(office.worker)">Edit</button>
          <button @click="deleteWorker(office.worker.workerId)">Delete</button>
        </div>
      </ul>

      <!-- Add New Worker -->
      <button @click="addWorker">
        <img
          src="../assets/add-button.svg"
          alt="add-button"
          class="add-button"
        />
      </button>

      <!-- <router-link :to="`/office/${office.id}/edit`">Edit Office</router-link> -->

      <!-- <button @click="deleteOffice">Delete Office</button> -->
    </div>

    <p v-else>Loading...</p>
  </div>
</template>

<script>
import { useOfficeStore } from "../store";
import OfficeCard from "@/components/OfficeCard.vue";

export default {
  components: {
    OfficeCard,
  },
  data() {
    return {
      office: null,
    };
  },
  computed: {
    officeId() {
      return this.$route.params.id;
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    fetchOffice() {
      const officeStore = useOfficeStore();

      const officeData = officeStore.getOffices.find(
        (o) => o.id === parseInt(this.officeId)
      );

      if (officeData) {
        this.office = { ...officeData };
        this.office.workers = officeStore.getWorkers.filter(
          (worker) => worker.officeId === this.office.id
        );
      } else {
        this.office = null;
      }
    },

    deleteOffice() {
      if (confirm("Are you sure you want to delete this office?")) {
        const officeStore = useOfficeStore();
        officeStore.deleteOffice(this.office.id);
        this.$router.push("/");
      }
    },
    addWorker() {
      // Redirect to worker form for adding a new worker (assuming you have a worker form page)
      this.$router.push({
        name: "addWorker",
        params: { officeId: this.office.id },
      });
    },
    editWorker(worker) {
      this.$router.push({
        name: "editWorker",
        params: { workerId: worker.workerId, officeId: this.office.id },
      });
    },
    deleteWorker(workerId) {
      if (confirm("Are you sure you want to delete this worker?")) {
        const officeStore = useOfficeStore();
        officeStore.deleteWorker(workerId);
        this.fetchOffice();
      } // Re-fetch the office data to update the UI after deleting a worker
    },
  },
  watch: {
    "$route.params.id": "fetchOffice",
  },
  created() {
    this.fetchOffice();
  },
};
</script>
<style scoped>
.page-header {
height: 1.563rem;
display: flex;
flex-direction: row;
gap: 4.188rem;
align-items: center;
width: 23.438rem;
padding: 0rem 0rem 1.438rem 1rem;
}
.page-heading-div {
width: 9.563rem;
}
.page-heading{
  font-size: 1.125rem;
  line-height:1.361rem ;
 letter-spacing: -2%;
text-align:center;
}
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.search-staff-member-div {
  display: flex;
  justify-content: center;
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
  width: 100%;
  height: 3.875rem;
  padding: 1rem 1rem 1rem 0rem;
  width: 23.438rem;
  height: 3.875rem;
}
#staff-members-heading {
  font-size: 1.5rem;
  letter-spacing: -2%;
  font-weight: 600;
  color: #000;
  line-height: 1.816rem;
  padding: 1rem 0rem 1rem 1rem;
}
#staff-members-count {
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.5rem;
  padding: 1rem 1.313rem 1rem 0rem;
}
.worker-div {
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 21.438rem;
  height: 3.25rem;
  padding: 0rem 1.031rem 0rem 1.031rem;
}
.worker-details {
  display: flex;
  align-items: center;
  gap: 1.875rem;
}
.worker-menu {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
}
.worker-name {
  color: #000;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 400;
}
</style>

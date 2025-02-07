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
    <div v-if="office" id="office">
      <div class="input-div" id="search-staff-member-div">
        <input
          id="search-staff-member"
          class="input"
          v-model="searchQuery"
          placeholder="Search"
          type="text"
        />
      </div>
      <div id="staff-members-heading-div">
        <h4 id="staff-members-heading">Staff Members In Office</h4>
        <h4 id="staff-members-count">{{ office.workers.length }}</h4>
      </div>
      <ul>
        <div
          v-for="worker in filteredWorkers"
          :key="worker.workerId"
          class="worker-div"
        >
          <div class="worker-details">
            <BaseModal :show="showFirstModal" @close="showFirstModal = false">
              <div class="buttons-div">
                <button
                  class="primary-button"
                  @click="openWorkerEditModal(worker.workerId)"
                >
                  EDIT STAFF MEMBER
                </button>
                <button
                  class="secondary-button"
                  @click="deleteWorker(worker.workerId)"
                >
                  DELETE STAFF MEMBER
                </button>
              </div>
            </BaseModal>
            <img :src="worker.Avatar" alt="avatar" />
            <p class="worker-name">
              {{ worker.FirstName }} {{ worker.LastName }}
            </p>
          </div>
          <div class="worker-menu">
            <img
              @click="showFirstModal = true"
              src="../assets/3-dots.svg"
              class="icon"
              alt="3-dot-menu"
            />
          </div>
        </div>
      </ul>
      <WorkerForm
        :officeId="officeId"
        :workerId="workerId"
        @edit-worker="editWorker"
        :show="showSecondModal"
        @close="showSecondModal = false"
      />

      <button @click="addWorker">
        <img
          src="../assets/add-button.svg"
          alt="add-button"
          class="add-button"
        />
      </button>

    </div>

    <p v-else>Loading...</p>
  </div>
</template>

<script>
import { useOfficeStore } from "../store";
import BaseModal from "@/components/BaseModal.vue";
import OfficeCard from "@/components/OfficeCard.vue";
import WorkerForm from "@/components/WorkerForm.vue";

export default {
  components: {
    OfficeCard,
    BaseModal,
    WorkerForm,
  },
  data() {
    return {
      searchQuery: "",
      office: null,
      showFirstModal: false,
      showSecondModal: false,
      workerId: this.workerId,
    };
  },
  computed: {
    officeId() {
      return this.$route.params.id;
    },
    filteredWorkers() {
      const query = this.searchQuery.toLowerCase();
      return this.office.workers.filter((worker) => {
        const fullName = `${worker.FirstName} ${worker.LastName}`.toLowerCase();
        return fullName.includes(query);
      });
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
    addWorker() {
      this.workerId = null; 
      this.showSecondModal = true;
    },
    editWorker(worker) {
      const officeStore = useOfficeStore();
      officeStore.editWorker(worker);
      this.fetchOffice(); 
    },
    deleteWorker(workerId) {
      if (confirm("Are you sure you want to delete this worker?")) {
        const officeStore = useOfficeStore();
        officeStore.deleteWorker(workerId);
        this.fetchOffice();
      }
    },
    openWorkerEditModal(workerId) {
      this.workerId = workerId;
      this.showSecondModal = true;
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
#office{
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
ul {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.input-icon {
  position: absolute;
  right: 1rem; 
  width: 1rem;
  height: 1rem;
  pointer-events: none; 
}
#search-staff-member-div {
  display: flex;
  justify-content: center;
  border: 0.063rem solid #e8f3fc;
  border-radius: 0.5rem;
  width: 21.25rem;
}
.search-staff-member {
  padding: 0.75rem 0.5rem;
  border: none;
  border-radius: 0.5rem;
}
.search-staff-member::placeholder{
  font-size:0.75rem;
  line-height:1.375rem ;
  font-weight: 400;
  letter-spacing: 0%;
}
#staff-members-heading-div {
  width: 23.438rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

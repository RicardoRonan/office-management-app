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
        <li
          v-for="worker in filteredWorkers"
          :key="worker.id"
          class="worker-div"
        >
          <div class="worker-details">
            <img :src="worker.Avatar" alt="avatar" />
            <p class="worker-name">
              {{ worker.FirstName }} {{ worker.LastName }}
            </p>
          </div>
          <div class="worker-menu">
            <img
              @click="openWorkerMenu(worker.id)"
              src="../assets/3-dots.svg"
              class="icon"
              alt="3-dot-menu"
            />
          </div>
        </li>
      </ul>
      <BaseModal :show="showFirstModal" @close="showFirstModal = false">
        <div class="buttons-div">
          <button
            class="primary-button"
            @click="openWorkerEditModal(selectedWorkerId)"
          >
            EDIT STAFF MEMBER
          </button>
          <button
            class="secondary-button"
            @click="deleteWorker(selectedWorkerId)"
          >
            DELETE STAFF MEMBER
          </button>
        </div>
      </BaseModal>
      <WorkerForm
        :officeId="officeId"
        :workerId="workerId"
        :show="showSecondModal"
        @close="showSecondModal = false, showFirstModal = false"
      />

      <button @click="addWorker" class="add-button">
        <img src="../assets/add-button.svg" alt="add-button" />
      </button>
    </div>
    <p v-else>Loading...</p>
    <BaseModal
      :show="deleteWorkerModal"
      v-if="deleteWorkerModal"
      @close="cancelDelete"
    >
      <div class="confirm-delete-modal">
        <div class="modal-header">
          <button @click="cancelDelete" class="back-button">
            <img
              src="../assets/arrow-left.svg"
              alt="back-button"
              class="icon"
            />
          </button>
          <h3 class="heading">Are You Sure You Want To Delete Staff Member?</h3>
        </div>
        <div class="buttons-div">
          <button class="delete-button" @click="confirmDelete">
            DELETE STAFF MEMBER
          </button>
          <button class="secondary-button" @click="cancelDelete">
            KEEP STAFF MEMBER
          </button>
        </div>
      </div>
    </BaseModal>
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
      officeStore: useOfficeStore(),
      searchQuery: "",
      showFirstModal: false,
      showSecondModal: false,
      selectedWorkerId: null,
      deleteWorkerModal: false,
      workerId: null,
    };
  },
  computed: {
    officeId() {
      return this.$route.params.id;
    },
    office() {
      return this.officeStore.getOffices.find(
        (o) => o.id === parseInt(this.officeId)
      );
    },
    filteredWorkers() {
      if (!this.office || !this.office.workers) return [];
      const query = this.searchQuery.toLowerCase();
      return this.office.workers.filter((worker) => {
        const fullName = `${worker.FirstName} ${worker.LastName}`.toLowerCase();
        return fullName.includes(query);
      });
    },
  },
  methods: {
    async loadState() {
      await this.officeStore.loadState();
    },
    goBack() {
      this.$router.go(-1);
    },
    openWorkerMenu(workerId) {
      this.selectedWorkerId = workerId;
      this.showFirstModal = true;
    },
    openWorkerEditModal(workerId) {
      this.workerId = workerId;
      this.showSecondModal = true;
      console.log("Editing Worker ID:", workerId);
    },
    addWorker() {
      this.workerId = null;
      this.showSecondModal = true;
    },
    editWorker(worker) {
      this.officeStore.editWorker(worker);
      this.workerId = null;
    },
    deleteWorker(workerId) {
      this.workerId = workerId;
      this.deleteWorkerModal = true;
    },
    confirmDelete() {
      if (this.workerId) {
        console.log("Deleting Worker ID:", this.workerId);
        this.officeStore.deleteWorker(this.workerId);
        this.deleteWorkerModal = false;
        this.showFirstModal = false;
        this.workerId = null;
      }
    },
    cancelDelete() {
      this.deleteWorkerModal = false;
      this.workerId = null;
    },
  },
  watch: {
    "$route.params.id"() {
      this.loadState();
    },
  },
  async mounted() {
    await this.loadState();
  },
};
</script>

<style scoped>
#office {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
ul {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
.search-staff-member::placeholder {
  font-size: 0.75rem;
  line-height: 1.375rem;
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
@media (min-width: 315px) and (max-width: 375px) {
  .worker-div[data-v-c2148e8a] {
  width: 18.438rem;
}
#search-staff-member-div {
  width: 18.25rem;
}

#staff-members-heading-div{
  width: 20.438rem;
}

}
</style>

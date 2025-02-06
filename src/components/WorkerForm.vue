<template>
  <div>
    <BaseModal v-if="show" :show="show" @close="$emit('close')">
      <div>
        <div class="modal-header">
          <button @click="goBack()" class="back-button">
        <img src="../assets/arrow-left.svg" alt="back-button" class="icon" />
      </button>
      <div class="worker-heading-div">
        <h3 class="worker-heading">{{ isEdit ? "Edit" : "New" }} Staff Member</h3>
      </div>
      <button class="close-btn" @click="$emit('close')"><img src="../assets/close-circle.svg" alt="close-button" class="icon" /></button>
        </div>
      <form @submit.prevent="submitForm">
        <div v-if="currentStep === 1">
            <div class="input-div" id="worker-form-input-div">
            <input class="input" type="text" v-model="worker.FirstName" placeholder="First Name" />
            <input class="input" type="text" v-model="worker.LastName" placeholder="Last Name" />
          </div>
            <div class="buttons-div">
              <button class="primary-button" @click="nextStep">Next</button>
            </div>
        </div>
        <div v-if="currentStep === 2">
          <div class="modal-header">
         <label  class="sub-heading" id="choose-avatar" for="avatar">Avatar</label>
        </div>
  
          <div id="avatar-div">
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
          <div class="buttons-div">
            <button class="primary-button" type="submit">
              {{ isEdit ? "UPDATE STAFF MEMBER" : "ADD STAFF MEMBER" }}
            </button>

          </div>
        </div>
      </form>
    </div>
  </BaseModal>
     
  </div>
</template>

<script>
import { useOfficeStore } from "../store";
import BaseModal from "@/components/BaseModal.vue";

export default {
  components: {
    BaseModal,
  },

  props: {
    officeId: {
      type: [String, Number],
      required: true,
    },
    workerId: {
      type: [String, Number],
      default: null,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      currentStep: 1,
      worker: this.workerId ? this.getWorkerById(this.workerId) : this.initializeWorker(),
    };
  },

  computed: {
    isEdit() {
      return !!this.workerId;
    },
    availableAvatars() {
      const officeStore = useOfficeStore();
      return officeStore.availableAvatars;
    },
  },

  methods: {
    goBack() {
      if (this.currentStep > 1) this.currentStep--
    },

    getWorkerById(workerId) {
      const officeStore = useOfficeStore();
      const worker = officeStore.getWorkers.find(
        (worker) => worker.workerId === parseInt(workerId, 10)
      );
      return worker ? { ...worker } : this.initializeWorker();
    },

    initializeWorker() {
      return {
        workerId: "",
        officeId: this.officeId,
        FirstName: "",
        LastName: "",
        Avatar: "",
      };
    },

    nextStep() {
      if (this.currentStep < 2) this.currentStep++;
    },

    prevStep() {
      if (this.currentStep > 1) this.currentStep--;
    },

    getMaxWorkerId() {
      const officeStore = useOfficeStore();
      const workers = officeStore.getWorkers;
      return workers.length ? Math.max(...workers.map((worker) => worker.workerId)) : 0;
    },

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

      this.$emit('close');
      this.$emit(this.isEdit ? 'edit-worker' : 'add-worker', this.worker);
      this.$router.push(`/`)
    },

    selectAvatar(avatar) {
      this.worker.Avatar = avatar;
    },
  },

  watch: {
    workerId: {
      immediate: true,
      handler(newWorkerId) {
        if (newWorkerId) {
          this.worker = this.getWorkerById(newWorkerId);
        } else {
          this.worker = this.initializeWorker();
        }
      },
    },
    show: {
      immediate: true,
      handler(newShow) {
        if (!newShow) {
          this.worker = this.initializeWorker();
          this.currentStep = 1;
        }
      },
    },
  },
};
</script>

<style scoped>
.close-btn{
  background-color: var(--bg-color);
}
#avatar-div {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin: 0rem 0rem  1.75rem 0rem;
}
.selected {
  border: 0.25rem solid var(--text-font-color);
  border-radius: 50%;
}
#worker-form-input-div{
margin : 0rem 0rem 1.75rem 0rem;
}
.worker-heading-div {
display: flex;
align-items: center;
}
.sub-heading {
font-size: 1.5rem;
font-weight: 800;
line-height: 1.816rem;
letter-spacing: -2%;
color: #000;
gap: 0.75rem;
}
.modal-header {
height: 2.625rem;
width: 21.563rem;
padding: 0rem 0rem 1.75rem 0rem;
display: flex;
align-content: center;
justify-content: space-between;
gap: 0.75rem;
}
#choose-avatar{
  font-weight: 600;
}
</style>
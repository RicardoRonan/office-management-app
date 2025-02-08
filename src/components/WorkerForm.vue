<template>
  <BaseModal v-if="show" :show="show" @close="$emit('close')">
    <div>
      <div class="modal-header">
        <button v-if="currentStep === 2" @click="goBack" class="back-button">
          <img src="../assets/arrow-left.svg" alt="back-button" class="icon" />
        </button>
        <h3 class="heading" :class="{ 'edit-mode': isEdit }">
          {{ isEdit ? "Edit" : "New" }} Staff Member
        </h3>
        <button class="close-btn" @click="$emit('close')">
          <img
            src="../assets/close-circle.svg"
            alt="close-button"
            class="icon"
          />
        </button>
      </div>

      <form @submit.prevent="submitForm">
        <div v-if="currentStep === 1">
          <div class="input-div">
            <input
              v-model="worker.FirstName"
              class="input"
              type="text"
              placeholder="First Name"
              required
            />
            <input
              v-model="worker.LastName"
              class="input"
              type="text"
              placeholder="Last Name"
              required
            />
          </div>

          <div class="step-indicator">
            <div
              class="dot"
              :class="{ active: currentStep === 1 }"
              @click="setStep(1)"
            ></div>
            <div
              class="dot"
              :class="{ active: currentStep === 2 }"
              @click="setStep(2)"
            ></div>
          </div>
          <button class="primary-button" @click="nextStep">Next</button>
        </div>

        <div v-if="currentStep === 2">
          <label class="sub-heading" for="avatar">Avatar</label>
          <div id="avatar-div">
            <img
              v-for="avatar in availableAvatars"
              :key="avatar"
              :src="avatar"
              :class="{ selected: worker.Avatar === avatar }"
              @click="selectAvatar(avatar)"
              class="avatar-option"
            />
          </div>
          <div class="step-indicator">
            <div
              class="dot"
              :class="{ active: currentStep === 1 }"
              @click="setStep(1)"
            ></div>
            <div
              class="dot"
              :class="{ active: currentStep === 2 }"
              @click="setStep(2)"
            ></div>
          </div>
          <button class="primary-button" type="submit">
            {{ isEdit ? "Update Staff Member" : "Add Staff Member" }}
          </button>
        </div>
      </form>
    </div>
  </BaseModal>
</template>

<script>
import { useOfficeStore } from "../store";
import BaseModal from "@/components/BaseModal.vue";

export default {
  components: { BaseModal },
  props: {
    workerId: { type: [String, Number], default: null },
    show: { type: Boolean, required: true },
    officeId: { type: [String, Number], required: true },
  },
  data() {
    return {
      currentStep: 1,
      worker: this.initializeWorker(),
      officeStore: useOfficeStore(),
    };
  },
  computed: {
    isEdit() {
      return !!this.workerId;
    },
    availableAvatars() {
      return this.officeStore.availableAvatars;
    },
    offices() {
      return this.officeStore.offices;
    },
  },
  created() {
    this.loadWorker();
  },
  methods: {
    loadWorker() {
      if (this.isEdit) {
        const existingWorker = this.officeStore.getWorkerById(this.workerId);
        if (existingWorker) {
          this.worker = JSON.parse(JSON.stringify(existingWorker));
        } else {
          this.worker = this.initializeWorker();
        }
      } else {
        this.worker = this.initializeWorker();
      }
    },

    initializeWorker() {
      return {
        workerId: "",
        officeId: parseInt(this.officeId),
        FirstName: "",
        LastName: "",
        Avatar: "",
      };
    },
    setStep(step) {
      this.currentStep = step;
    },
    nextStep() {
      if (this.currentStep < 2) this.currentStep++;
    },
    goBack() {
      if (this.currentStep > 1) this.currentStep--;
    },
    selectAvatar(avatar) {
      this.worker.Avatar = avatar;
    },
    submitForm() {
      if (this.isEdit) {
        this.officeStore.editWorker({
          ...this.worker,
          workerId: this.workerId,
        });
      } else {
        this.officeStore.addWorker({
          ...this.worker,
          workerId: Date.now(),
          officeId: parseInt(this.worker.officeId, 10),
        });
      }
      this.$emit("close");
    },
  },
  watch: {
    workerId(newVal) {
      if (newVal) this.loadWorker();
    },
    show(newShow) {
      if (newShow) {
        this.loadWorker(); // Reload worker data when modal is opened
      } else {
        this.worker = this.initializeWorker();
        this.currentStep = 1;
      }
    },
  },
};
</script>
<style scoped>
.step-indicator {
  display: flex;
  justify-content: center;
  gap: 0.188rem;
  margin: 1.75rem 0rem;
}
.dot {
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 50%;
  background-color: white;
  border: 0.094rem solid var(--accent-color);
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}
.dot.active {
  background-color: var(--accent-color);
}
.dot-filled {
  width: 0.25rem;
  height: 0.25rem;
  background-color: var(--accent-color);
  border: 0.094rem solid white;
}
.heading.edit-mode {
  color: #000;
}
.edit-mode {
  padding: 0rem 1rem;
}
.close-btn {
  background-color: var(--bg-color);
}
#avatar-div {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin: 0rem 0rem 1.75rem 0rem;
}
.selected {
  border: 0.25rem solid var(--text-font-color);
  border-radius: 50%;
}
#worker-form-input-div {
  margin: 0rem 0rem 1.75rem 0rem;
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
#choose-avatar {
  font-weight: 600;
}
</style>

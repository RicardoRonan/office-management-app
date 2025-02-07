<template>
  <div>
    <BaseModal v-if="show" :show="show" @close="$emit('close')">
      <div>
        <div class="modal-header">
          <button
            v-if="currentStep === 2"
            @click="goBack()"
            class="back-button"
          >
            <img
              src="../assets/arrow-left.svg"
              alt="back-button"
              class="icon"
            />
          </button>
          <div class="worker-heading-div">
            <h3 class="heading" :class="{ 'edit-mode': isEdit }">
              {{ isEdit ? "Edit" : "New" }} Staff Member
            </h3>
          </div>
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
            <div class="input-div" id="worker-form-input-div">
              <input
                class="input"
                type="text"
                v-model="worker.FirstName"
                placeholder="First Name"
                required
              />
              <input
                class="input"
                type="text"
                v-model="worker.LastName"
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
            <div class="buttons-div">
              <button class="primary-button" @click="nextStep">Next</button>
            </div>
          </div>
          <div v-if="currentStep === 2">
            <div class="modal-header">
              <label class="sub-heading" id="choose-avatar" for="avatar"
                >Avatar</label
              >
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
      worker: this.initializeWorker(),
      isNewWorker: false,
    };
  },
  created() {
    if (this.workerId) {
      this.worker = this.getWorkerById(this.workerId);
      this.isNewWorker = false;
    } else {
      this.worker = this.initializeWorker();
      this.isNewWorker = true;
    }
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
      if (this.currentStep > 1) this.currentStep--;
    },
    setStep(step) {
      this.currentStep = step;
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
      return workers.length
        ? Math.max(...workers.map((worker) => worker.workerId))
        : 0;
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
        this.worker.workerId = maxWorkerId + 1;
        this.worker.officeId = Number(this.officeId);
        officeStore.addWorker(this.worker);
      }

      this.$emit("close");
      this.$emit(this.isEdit ? "edit-worker" : "add-worker", this.worker);
      this.$router.push(`/`);
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
          this.worker = Object.assign({}, this.getWorkerById(newWorkerId));
          this.isNewWorker = false;
        } else {
          this.worker = this.initializeWorker();
          this.isNewWorker = true;
        }
      },
    },
    show: {
      immediate: true,
      handler(newShow) {
        if (!newShow && this.isNewWorker) {
          this.worker = this.initializeWorker();
          this.currentStep = 1;
        }
      },
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

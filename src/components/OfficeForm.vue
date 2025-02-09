<template>
  <div class="page">
    <div class="page-header">
      <button @click="goBack()" class="back-button">
        <img src="../assets/arrow-left.svg" alt="back-button" class="icon" />
      </button>
      <div class="page-heading-div">
        <h3 class="page-heading">{{ isEdit ? "Edit" : "New" }} Office</h3>
      </div>
    </div>

    <form @submit.prevent="submitForm" class="office-form">
      <input
        class="input"
        v-model="office.OfficeName"
        placeholder="Office Name"
        type="text"
        required
      />
      <input
        class="input"
        v-model="office.PhysicalAddress"
        type="text"
        placeholder="Physical Address"
      />
      <input
        class="input"
        v-model="office.EmailAddress"
        placeholder="Email Address"
        type="email"
      />
      <input
        class="input"
        v-model="office.PhoneNumber"
        placeholder="Phone Number"
        type="text"
        required
      />
      <input
        class="input"
        v-model.number="office.MaximumCapacity"
        placeholder="Maximum Capacity"
        type="number"
        min="1"
        max="25"
        required
      />
      <label for="office-color" class="sub-heading" id="office-color-heading"
        >Office Color</label
      >
      <div id="color-div">
        <div
          v-for="color in availableColors"
          :key="color.rgba"
          :style="{ backgroundColor: color.rgba }"
          :class="{ selected: office.OfficeColor === color.rgba }"
          @click="selectColor(color.rgba)"
          class="color-option"
        ></div>
      </div>
      <div class="buttons-div">
        <button class="primary-button" type="submit">
          {{ isEdit ? "UPDATE" : "ADD" }} OFFICE
        </button>
        <button
          v-if="isEdit"
          class="secondary-button"
          id="delete-office"
          @click.prevent="deleteOffice"
        >
          Delete Office
        </button>
      </div>
    </form>

    <!-- Delete Confirmation Modal -->
    <BaseModal :show="deleteOfficeModal" @close="closeDeleteModal">
      <div class="confirm-delete-modal">
        <div class="modal-header">
          <button @click="closeDeleteModal" class="back-button">
            <img
              src="../assets/arrow-left.svg"
              alt="back-button"
              class="icon"
            />
          </button>
          <h3 class="heading">Are You Sure You Want To Delete This Office?</h3>
        </div>
        <div class="buttons-div">
          <button class="delete-button" @click="confirmDelete">
            DELETE OFFICE
          </button>
          <button class="secondary-button" @click="closeDeleteModal">
            CANCEL
          </button>
        </div>
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
    id: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      office: this.id
        ? this.getOfficeById(this.id)
        : {
            OfficeName: "",
            PhysicalAddress: "",
            EmailAddress: "",
            PhoneNumber: "",
            MaximumCapacity: 1,
            OfficeColor: "",
          },
      deleteOfficeModal: false,
    };
  },
  computed: {
    isEdit() {
      return !!this.$route.params.id;
    },
    availableColors() {
      return useOfficeStore().getAvailableColors;
    },
  },
  methods: {
    goBack() {
      if (this.isEdit) {
        this.$router.push({ name: "office", params: { id: this.id } });
      } else {
        this.$router.push({ name: "home" });
      }
    },
    submitForm() {
      const officeStore = useOfficeStore();

      if (this.isEdit) {
        officeStore.editOffice(this.office);
      } else {
        const maxId = Math.max(
          ...officeStore.getOffices.map((office) => office.id),
          0
        );
        this.office.id = maxId + 1; // Ensure the new office gets a unique id
        officeStore.addOffice(this.office);
      }
      this.$router.push("/");
    },
    getOfficeById(id) {
      const officeStore = useOfficeStore();
      const office =
        officeStore.getOffices.find((office) => office.id == id) || {};

      return {
        id: office.id || null,
        OfficeName: office.OfficeName || "",
        PhysicalAddress: office.PhysicalAddress || "",
        EmailAddress: office.EmailAddress || "",
        PhoneNumber: office.PhoneNumber || "",
        MaximumCapacity: office.MaximumCapacity || 1,
        OfficeColor: office.OfficeColor,
      };
    },
    deleteOffice() {
      console.log("Delete button clicked");
      this.deleteOfficeModal = true;
    },
    confirmDelete() {
      const officeStore = useOfficeStore();
      officeStore.deleteOffice(this.office.id);
      this.closeDeleteModal();
      this.$router.push("/");
    },
    closeDeleteModal() {
      this.deleteOfficeModal = false;
    },
    selectColor(color) {
      this.office.OfficeColor = color;
    },
  },
  created() {
    if (this.id) {
      this.office = this.getOfficeById(this.id);
    }
  },
};
</script>

<style scoped>
.office-form {
  display: flex;
  flex-direction: column;
  width: 21.25rem;
  gap: 1.5rem;
}
.color-option {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
}
#color-div {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin: 0rem 0rem 1.75rem 0rem;
}
.selected {
  border: 0.15rem solid var(--text-font-color);
  border-radius: 50%;
}
#office-color-heading {
  font-weight: 600;
}
#delete-office {
  margin: 0.75rem 0rem 0rem 0rem;
}
@media (min-width: 315px) and (max-width: 375px) {
  .office-form {
    width: 18.25rem;
    gap: 1rem;
  }
  #color-div {
    gap: 0.5rem;
  }
}
</style>

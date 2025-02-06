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
      />
      <input
        class="input"
        v-model="office.PhysicalAddress"
        placeholder="Physical Address"
      />
      <input
        class="input"
        v-model="office.EmailAddress"
        placeholder="Email Address"
      />
      <input
        class="input"
        v-model="office.PhoneNumber"
        placeholder="Phone Number"
      />
      <input
        class="input"
        v-model="office.MaximumCapacity"
        placeholder="Maximum Capacity"
      />
      <!-- Color selection dropdown -->
      <label for="office-color" class="sub-heading" id="office-color-heading">Office Color</label>
      <div id="color-div">
        <div
          v-for="color in availableColors"
          :key="color"
          :style="{ backgroundColor: color.hex }"
          :class="{ selected: office.OfficeColor.hex === color.hex }"
          @click="selectColor(color)"
          class="color-option"
        ></div>
      </div>
      <div class="buttons-div">
        <button class="primary-button" type="submit">
          {{ isEdit ? "UPDATE" : "ADD" }} OFFICE
        </button>
           <button class="secondary-button" id="delete-office" @click="deleteOffice">Delete Office</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useOfficeStore } from "../store"; // Adjust the path to your store

export default {
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
            MaximumCapacity: "",
            OfficeColor: "", // Default color
          },
      availableColors: useOfficeStore().getAvailableColors,
    };
  },
  computed: {
    isEdit() {
      return !!this.$route.params.id;
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    submitForm() {
      const officeStore = useOfficeStore();

      if (this.isEdit) {
        officeStore.editOffice(this.office);
      } else {
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
        MaximumCapacity: office.MaximumCapacity || "",
        OfficeColor: office.OfficeColor,
      };
    },
    deleteOffice() {
      if (confirm("Are you sure you want to delete this office?")) {
        const officeStore = useOfficeStore();
        officeStore.deleteOffice(this.office.id);
        this.$router.push("/");
      }
    },

    selectColor(color) {
      this.office.OfficeColor = color;
    },
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
#office-color-heading{
  font-weight :600
}
#delete-office{
margin:0.75rem 0rem 0rem 0rem;
}
</style>

<template>
  <div>
    <h3>{{ isEdit ? 'Edit' : 'Add' }} Office</h3>
    <form @submit.prevent="submitForm">
      <input v-model="office.OfficeName" placeholder="Office Name" />
      <input v-model="office.PhysicalAddress" placeholder="Physical Address" />
      <input v-model="office.EmailAddress" placeholder="Email Address" />
      <input v-model="office.PhoneNumber" placeholder="Phone Number" />
      <input v-model="office.MaximumCapacity" placeholder="Maximum Capacity" />

      <!-- Color selection dropdown -->
      <label for="office-color">Select Office Color:</label>
      <select v-model="office.OfficeColor" id="office-color">
        <option v-for="color in availableColors" :key="color.hex" :value="color.hex">
          {{ color.name }}
        </option>
      </select>

      <button type="submit">{{ isEdit ? 'Save' : 'Add' }}</button>
    </form>
  </div>
</template>


<script>
import { useOfficeStore } from '../store';  // Adjust the path to your store

export default {
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      office: this.id ? this.getOfficeById(this.id) : {
        OfficeName: '',
        PhysicalAddress: '',
        EmailAddress: '',
        PhoneNumber: '',
        MaximumCapacity: '',
        OfficeColor: '#FF5733',  // Default color
      },
      availableColors: useOfficeStore().getAvailableColors // Access available colors from the store
    };
  },
  computed: {
    isEdit() {
      return !!this.id;
    }
  },
  methods: {
    submitForm() {
      const officeStore = useOfficeStore();

      if (this.isEdit) {
        officeStore.editOffice(this.office);
      } else {
        officeStore.addOffice(this.office); 
      }
      this.$router.push('/');
    },
    
    getOfficeById(id) {
      const officeStore = useOfficeStore();
      const office = officeStore.getOffices().find(office => office.id == id) || {};
      
      return {
        id: office.id || null,
        OfficeName: office.OfficeName || '',
        PhysicalAddress: office.PhysicalAddress || '',
        EmailAddress: office.EmailAddress || '',
        PhoneNumber: office.PhoneNumber || '',
        MaximumCapacity: office.MaximumCapacity || '',
        OfficeColor: office.OfficeColor || '#FF5733'  // Ensure we retrieve the color too
      };
    }
  }
};

</script>

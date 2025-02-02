<template>
  <div>
    <h1 class="page-heading">All Offices</h1>
    <div v-for="office in officesWithWorkerCount" 
         :style="{ borderLeft: '1rem solid ' + office.OfficeColor }"
         :key="office.id" 
         @click="viewOffice(office)" 
         class="office-card">
      
      <!-- Office Name Display -->
      <div class="heading-div">
        <h2 class="heading">{{ office.OfficeName }} </h2>
        <router-link :to="`/office/${office.id}/edit`" custom v-slot="{ navigate }">
          <button @click.stop="navigate" class="edit-button">
            <img src="../assets/Edit.svg" alt="Edit" class="icon" />
          </button>
        </router-link>
      </div>
      
      <!-- Staff Count -->
      <div class="staff-count-div">
        <img src="../assets/people.svg" alt="people-group" class="icon" />
        <p class="body-text"><b>{{ office.workerCount }}</b> Staff Members in Office</p>
      </div>

      <!-- Delete Button -->
      <!-- <button @click="deleteOffice(office.id)">Delete</button> -->
      
      <!-- More Info Accordion -->
      <div class="accordion">
        <button @click="toggleAccordion(office.id)" @click.stop="navigate"  class="accordion-toggle">
          More Info
        <img src="../assets/arrow-down.svg" alt="people-group" class="icon" />
        </button>
        <div v-show="isAccordionOpen(office.id)" class="accordion-content">
          <span><img src="../assets/Phone.svg" alt="phone" class="icon" />{{ office.PhoneNumber }}</span>
          <span><img src="../assets/Email.svg" alt="email" class="icon" /> {{ office.EmailAddress }}</span>
          <span><img src="../assets/people-one-tone.svg" alt="people-group-one-tone" class="icon" />Office Capacity: {{ office.MaximumCapacity }}</span>
          <span><img src="../assets/location.svg" alt="location" class="icon" /> {{ office.PhysicalAddress }}</span>
        </div>
      </div>
      
    </div>
  </div>
</template>



<script>
import { useOfficeStore } from '../store';  

export default {
  data() {
    return {
      // To manage which office's accordion is open
      openAccordions: []
    };
  },
  computed: {
    officesWithWorkerCount() {
      const officeStore = useOfficeStore();
      return officeStore.getOffices.map(office => {
        const workersInOffice = officeStore.getWorkers.filter(worker => worker.officeId === office.id);
        const workerCount = workersInOffice.length;
        return { 
          ...office, 
          workerCount, 
          workersInOffice 
        };
      });
    }
  },
  methods: {
    viewOffice(office) {
      this.$router.push({ name: 'office', params: { id: office.id } })
    },
    deleteOffice(officeId) {
      if (confirm("Are you sure you want to delete this office?")) {
        const officeStore = useOfficeStore();
        officeStore.deleteOffice(officeId); 
      }
    },
    
    toggleAccordion(officeId) {
      const index = this.openAccordions.indexOf(officeId);
      if (index === -1) {
        this.openAccordions.push(officeId); // Open this accordion
      } else {
        this.openAccordions.splice(index, 1); // Close this accordion
      }
    },
    
    isAccordionOpen(officeId) {
      return this.openAccordions.includes(officeId);
    }
  }
};
</script>
<style scoped>
.office-card{
  width: 21.25rem;
  
  background-color: white;
border: 0.063rem solid #e8f3fc;
border-radius:0.5rem;
padding: 0.5rem;
display: flex;
flex-direction: column;
align-items: center;
margin: 1rem;
}

.heading-div {
  font-family: "Poppins", serif;
  font-weight: 700;
  font-style: normal;
  display: flex;
  justify-content: space-between;
  width: 18.25rem;
  
}
.staff-count-div {
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 0.053rem solid var(--action-button-color);
  margin-bottom: 0.5rem;
  width: 18.25rem;
}
.edit-button{
  background-color: white;
  border:none;
}
.accordion-toggle {
  background-color: white;
  border: none;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-font-color);
}
.accordion {
width: 18.25rem;
display: flex;
flex-direction: column;
}
.accordion-content {
display: flex;
flex-direction: column;
}
span {
display: flex;
gap: 0.75rem;
justify-content: flex-start;
align-items: center;
padding: 0.5rem;
}
</style>
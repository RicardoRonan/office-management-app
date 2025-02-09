<template>
  <div
    class="office-card"
    :style="{ borderLeft: '0.75rem solid ' + office.OfficeColor }"
  >
    <!-- Office Name Display -->
    <div class="heading-div">
      <h3 class="heading">{{ office.OfficeName }}</h3>
      <router-link :to="`/office/${office.id}/edit`">
        <button class="edit-button">
          <img src="../assets/Edit.svg" alt="Edit" class="icon" />
        </button>
      </router-link>
    </div>

    <!-- Staff Count -->
    <div class="staff-count-div">
      <img src="../assets/people.svg" alt="people-group" class="icon" />
      <p class="body-text">
        <b id="staff-members-amount">{{ office.workers.length }}</b> Staff
        Members in Office
      </p>
    </div>
    <!-- More Info Accordion -->
    <div class="accordion">
      <button
        @click="toggleAccordion(office.id)"
        @click.stop="navigate"
        class="accordion-toggle"
      >
        More info
        <img :src="getImageSource(office.id)" alt="arrow-icon" class="icon" />
      </button>
      <div v-show="isAccordionOpen(office.id)" class="accordion-content">
        <span
          ><img src="../assets/Phone.svg" alt="phone" class="icon" />{{
            office.PhoneNumber
          }}</span
        >
        <span
          ><img src="../assets/Email.svg" alt="email" class="icon" />
          {{ office.EmailAddress }}</span
        >
        <span
          ><img
            src="../assets/people-one-tone.svg"
            alt="people-group-one-tone"
            class="icon"
          />Office Capacity: {{ office.MaximumCapacity }}</span
        >
        <span
          ><img src="../assets/location.svg" alt="location" class="icon" />
          {{ office.PhysicalAddress }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { useOfficeStore } from "../store";
export default {
  props: {
    office: Object,
  },
  data() {
    return {
      arrowDown: require("@/assets/arrow-down.svg"),
      arrowUp: require("@/assets/arrow-up.svg"),
      openAccordions: [],
    };
  },
  methods: {
    getOffices: (state) => {
      return state.offices.map((office) => ({
        ...office, 
        workers: state.workers.filter(
          (worker) => worker.officeId === office.id
        ), 
      }));
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
        this.openAccordions.push(officeId); 
      } else {
        this.openAccordions.splice(index, 1); 
      }
    },

    isAccordionOpen(officeId) {
      return this.openAccordions.includes(officeId);
    },
    getImageSource(officeId) {
      return this.isAccordionOpen(officeId) ? this.arrowUp : this.arrowDown;
    },
  },
};
</script>

<style >
#staff-members-amount {
  font-weight: 700;
}
.office-card {
  width: 21.25rem;
  background-color: white;
  border: 0.063rem solid #e8f3fc;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.5rem;
}
.heading-div {
  display: flex;
  justify-content: space-between;
  width: 18.25rem;
}
.staff-count-div {
  display: flex;
  align-items: center;
  border-bottom: 0.025rem solid var(--action-button-color);
  width: 18.25rem;
  gap: 0.75rem;

  padding: 0.694rem 0rem 0.596rem 0rem;
}
.edit-button {
  padding: 0.896rem 0rem 0rem 0rem;
}
.accordion-toggle {
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-font-color);
  gap: 0.5rem;
  padding: 0.831rem 0rem 0.639rem 0rem;
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
  align-items: center;
  padding: 0.5rem;
}
@media (min-width: 315px) and (max-width: 375px) {
  .office-card {
    width: 18.25rem;
  }

  .heading-div {
    width: 15.25rem;
  }

  .staff-count-div {
    width: 15.25rem;
  }
}
</style>

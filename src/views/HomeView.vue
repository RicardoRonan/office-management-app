<template>
  <div class="page">
    <div class="home-heading-div">
      <h2 class="home-heading">All Offices</h2>
    </div>
    <OfficeCard
      v-for="office in offices"
      :key="office.id"
      :office="office"
      @edit-worker="editWorker"
      @delete-worker="deleteWorker"
      @add-worker="addWorker"
      @delete-office="deleteOffice"
      @click="viewOffice(office)"
    />

    <router-link to="/office/new"><img src="../assets/add-button.svg" alt="add-button" class="add-button" /></router-link>
  </div>
</template>
<script>
import OfficeCard from '../components/OfficeCard.vue'
import { useOfficeStore } from '../store';  // Import Pinia store

export default {
  components: {
    OfficeCard
  },
  computed: {
  offices() {
    const officeStore = useOfficeStore();
    return officeStore.getOffices;
  }
},
  mounted() {
    const officeStore = useOfficeStore(); 
    officeStore.loadState(); 
  },
  methods:{
    viewOffice(office) {
      this.$router.push({ name: "office", params: { id: office.id } });
    },
  }
}
</script>
<style scoped>

</style>
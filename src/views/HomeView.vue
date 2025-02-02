<template>
  <div>

    <OfficeList />

    <router-link to="/office/new">Add New Office</router-link>
  </div>
</template>
<script>
import OfficeList from '../components/OfficeList.vue'
import { useOfficeStore } from '../store';  // Import Pinia store

export default {
  components: {
    OfficeList
  },
  mounted() {
    const officeStore = useOfficeStore(); 
    officeStore.loadState();  // Load the state once the component is mounted
  }
}
</script>
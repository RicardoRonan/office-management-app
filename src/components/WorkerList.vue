<template>
  <div>
    <h2>Offices</h2>
    <ul>
  <li v-for="office in officeStore.getOffices" :key="office.id">
    {{ office.name }} ({{ office.location }})
    <button @click="addWorker(office.id)">+ Add Worker</button>
    <ul>
      <li v-for="worker in officeStore.getWorkers.filter(worker => worker.officeId === office.id)" :key="worker.workerId">
        {{ worker.name }} - {{ worker.role }}
      </li>
    </ul>
  </li>
</ul>
  </div>
</template>

<script>
import { useOfficeStore } from '../store';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const officeStore = useOfficeStore();
    const router = useRouter();

    const addWorker = (officeId) => {
      router.push({ name: 'addWorker', params: { officeId } });
    };

    return { officeStore, addWorker };
  }
};
</script>

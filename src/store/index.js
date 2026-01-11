import { defineStore } from "pinia";
import axios from "axios";
import apiConfig from "@/config/api";
import astronautPeace from "@/assets/staff-avatar/astronaut-peace-emote.svg";
import astronautSuper from "@/assets/staff-avatar/astronaut-super.svg";
import astronautRocket from "@/assets/staff-avatar/astronaut-sitting-on-rocket.svg";
import astronautBadBoy from "@/assets/staff-avatar/astronaut-bad-boy.svg";
import astronautJupiter from "@/assets/staff-avatar/astronaut-holding-jupiter.svg";
import astronautMoon from "@/assets/staff-avatar/astronaut-hanging-on-moon.svg";
import astronautBalloons from "@/assets/staff-avatar/astronaut-balloons.svg";

export const useOfficeStore = defineStore("officeStore", {
  state: () => ({
    offices: [],
    workers: [],
    availableColors: [
      { "name": "Sunglow", "rgba": "rgba(255, 190, 11, 0.5)" },
      { "name": "Coral Orange", "rgba": "rgba(255, 155, 113, 0.5)" },
      { "name": "Orange Red", "rgba": "rgba(251, 86, 7, 0.5)" },
      { "name": "Copper", "rgba": "rgba(151, 81, 44, 0.5)" },
      { "name": "Pale Lilac", "rgba": "rgba(219, 186, 221, 0.5)" },
      { "name": "Hollywood Cerise", "rgba": "rgba(255, 0, 110, 0.5)" },
      { "name": "Magic Mint", "rgba": "rgba(169, 240, 209, 0.5)" },
      { "name": "Mint Green", "rgba": "rgba(0, 180, 2, 0.5)" },
      { "name": "Steel Blue", "rgba": "rgba(72, 157, 218, 0.5)" },
      { "name": "Bright Navy Blue", "rgba": "rgba(0, 114, 232, 0.5)" },
      { "name": "Electric Purple", "rgba": "rgba(131, 56, 236, 0.5)" }
    ]
    ,
    availableAvatars: [
      astronautPeace.toString(),
      astronautSuper.toString(),
      astronautRocket.toString(),
      astronautBadBoy.toString(),
      astronautJupiter.toString(),
      astronautMoon.toString(),
      astronautBalloons.toString(),
    ],
  }),

  getters: {
    getOffices: (state) => {
      return state.offices.map((office) => {
        const workersForOffice = state.workers.filter(
          (worker) => worker.officeId === office.id
        );
        return {
          ...office,
          workers: workersForOffice,
        };
      });
    },
    getWorkers: (state) => state.workers,
    getAvailableColors: (state) => state.availableColors,
  },

  actions: {
    async loadState() {
      try {
        const [officesRes, workersRes] = await Promise.all([
          axios.get(apiConfig.endpoints.offices),
          axios.get(apiConfig.endpoints.workers),
        ]);

        this.offices = officesRes.data.map(office => ({
          ...office,
          workers: [],
        }));
        this.workers = workersRes.data;
        this.workers.forEach(worker => {
          const office = this.offices.find(office => office.id === worker.officeId);
          if (office) {
            office.workers.push(worker);
          }
        });
      } catch (error) {
        console.error("Error loading state from db.json:", error);
        // Re-throw the error so components can handle it
        throw error;
      }
    },

    async saveState() {
      console.warn("saveState() is now managed by API calls, no localStorage usage.");
    },

    async addOffice(office) {
      try {
        // Remove id if it's null/undefined (let JSON Server generate it)
        const officeToAdd = { ...office };
        if (!officeToAdd.id) {
          delete officeToAdd.id;
        }
        const response = await axios.post(apiConfig.endpoints.offices, officeToAdd);
        this.offices.push({ ...response.data, workers: [] });
      } catch (error) {
        console.error("Error adding office:", error);
        throw error; // Re-throw so UI can handle it
      }
    },

    async editOffice(updatedOffice) {
      try {
        if (!updatedOffice.id) {
          console.error("Error updating office: Office ID is missing");
          return;
        }
        await axios.put(`${apiConfig.endpoints.offices}/${updatedOffice.id}`, updatedOffice);
        const index = this.offices.findIndex((office) => office.id === updatedOffice.id);
        if (index !== -1) this.offices.splice(index, 1, updatedOffice);
      } catch (error) {
        console.error("Error updating office:", error);
        throw error; // Re-throw so UI can handle it
      }
    },

    async deleteOffice(officeId) {
      try {
        if (!officeId) {
          console.error("Error deleting office: Office ID is missing");
          return;
        }
        await axios.delete(`${apiConfig.endpoints.offices}/${officeId}`);
        this.offices = this.offices.filter((office) => office.id !== officeId);
      } catch (error) {
        console.error("Error deleting office:", error);
        throw error; // Re-throw so UI can handle it
      }
    },

    async addWorker(worker) {
      try {
        // Remove id if it's null/undefined (let JSON Server generate it)
        const workerToAdd = { ...worker };
        if (!workerToAdd.id) {
          delete workerToAdd.id;
        }
        const response = await axios.post(apiConfig.endpoints.workers, workerToAdd);
        this.workers.push(response.data);
        const office = this.offices.find(office => office.id === worker.officeId);
        if (office) {
          office.workers.push(response.data);
        }
      } catch (error) {
        console.error("Error adding worker:", error);
        throw error; // Re-throw so UI can handle it
      }
    },

    async editWorker(updatedWorker) {
      try {
        // Ensure we have a valid ID
        if (!updatedWorker.id) {
          console.error("Error updating worker: Worker ID is missing");
          return;
        }
        await axios.put(`${apiConfig.endpoints.workers}/${updatedWorker.id}`, updatedWorker);
        const index = this.workers.findIndex((worker) => worker.id === updatedWorker.id);
        if (index !== -1) this.workers.splice(index, 1, updatedWorker);
        const office = this.offices.find(office => office.id === updatedWorker.officeId);
        if (office) {
          const workerIndex = office.workers.findIndex(worker => worker.id === updatedWorker.id);
          if (workerIndex !== -1) office.workers.splice(workerIndex, 1, updatedWorker);
        }
      } catch (error) {
        console.error("Error updating worker:", error);
        throw error; // Re-throw so UI can handle it
      }
    },

    async deleteWorker(workerId) {
      try {
        if (!workerId) {
          console.error("Error deleting worker: Worker ID is missing");
          return;
        }
        await axios.delete(`${apiConfig.endpoints.workers}/${workerId}`);
        this.workers = this.workers.filter((worker) => worker.id !== workerId);
        this.offices.forEach(office => {
          office.workers = office.workers.filter(worker => worker.id !== workerId);
        });
      } catch (error) {
        console.error("Error deleting worker:", error);
        throw error; // Re-throw so UI can handle it
      }
    },
  },
});
import { defineStore } from "pinia";
import axios from "axios";
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
      { "name": "Islamic Green", "rgba": "rgba(0, 180, 2, 0.5)" },
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
          axios.get("https://lydian-ossified-cesium.glitch.me/offices"),
          axios.get("https://lydian-ossified-cesium.glitch.me/workers"),
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
      }
    },

    async saveState() {
      console.warn("saveState() is now managed by API calls, no localStorage usage.");
    },

    async addOffice(office) {
      try {
        const response = await axios.post("https://lydian-ossified-cesium.glitch.me/offices", office);
        this.offices.push({ ...response.data, workers: [] });
      } catch (error) {
        console.error("Error adding office:", error);
      }
    },

    async editOffice(updatedOffice) {
      try {
        await axios.put(`https://lydian-ossified-cesium.glitch.me/offices/${updatedOffice.id}`, updatedOffice);
        const index = this.offices.findIndex((office) => office.id === updatedOffice.id);
        if (index !== -1) this.offices.splice(index, 1, updatedOffice);
      } catch (error) {
        console.error("Error updating office:", error);
      }
    },

    async deleteOffice(officeId) {
      try {
        await axios.delete(`https://lydian-ossified-cesium.glitch.me/offices/${officeId}`);
        this.offices = this.offices.filter((office) => office.id !== officeId);
      } catch (error) {
        console.error("Error deleting office:", error);
      }
    },

    async addWorker(worker) {
      try {
        const response = await axios.post("https://lydian-ossified-cesium.glitch.me/workers", worker);
        this.workers.push(response.data);
        const office = this.offices.find(office => office.id === worker.officeId);
        if (office) {
          office.workers.push(response.data);
        }
      } catch (error) {
        console.error("Error adding worker:", error);
      }
    },

    async editWorker(updatedWorker) {
      try {
        await axios.put(`https://lydian-ossified-cesium.glitch.me/workers/${updatedWorker.id}`, updatedWorker);
        const index = this.workers.findIndex((worker) => worker.id === updatedWorker.id);
        if (index !== -1) this.workers.splice(index, 1, updatedWorker);
        const office = this.offices.find(office => office.id === updatedWorker.officeId);
        if (office) {
          const workerIndex = office.workers.findIndex(worker => worker.id === updatedWorker.id);
          if (workerIndex !== -1) office.workers.splice(workerIndex, 1, updatedWorker);
        }
      } catch (error) {
        console.error("Error updating worker:", error);
      }
    },

    async deleteWorker(workerId) {
      try {
        await axios.delete(`https://lydian-ossified-cesium.glitch.me/workers/${workerId}`);
        this.workers = this.workers.filter((worker) => worker.id !== workerId);
        this.offices.forEach(office => {
          office.workers = office.workers.filter(worker => worker.id !== workerId);
        });
      } catch (error) {
        console.error("Error deleting worker:", error);
      }
    },
  },
});
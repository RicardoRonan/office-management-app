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
      { name: "Sunglow", hex: "#ffbe0b" },
      { name: "Coral Orange", hex: "#ff9b71" },
      { name: "Orange Red", hex: "#fb5607" },
      { name: "Copper", hex: "#97512c" },
      { name: "Pale Lilac", hex: "#dbbadd" },
      { name: "Hollywood Cerise", hex: "#ff006e" },
      { name: "Magic Mint", hex: "#a9f0d1" },
      { name: "Islamic Green", hex: "#00b402" },
      { name: "Steel Blue", hex: "#489dda" },
      { name: "Bright Navy Blue", hex: "#0072e8" },
      { name: "Electric Purple", hex: "#8338ec" },
    ],
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
          axios.get("http://localhost:5000/offices"),
          axios.get("http://localhost:5000/workers"),
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
        const response = await axios.post("http://localhost:5000/offices", office);
        this.offices.push({ ...response.data, workers: [] });
      } catch (error) {
        console.error("Error adding office:", error);
      }
    },

    async editOffice(updatedOffice) {
      try {
        await axios.put(`http://localhost:5000/offices/${updatedOffice.id}`, updatedOffice);
        const index = this.offices.findIndex((office) => office.id === updatedOffice.id);
        if (index !== -1) this.offices.splice(index, 1, updatedOffice);
      } catch (error) {
        console.error("Error updating office:", error);
      }
    },

    async deleteOffice(officeId) {
      try {
        await axios.delete(`http://localhost:5000/offices/${officeId}`);
        this.offices = this.offices.filter((office) => office.id !== officeId);
      } catch (error) {
        console.error("Error deleting office:", error);
      }
    },

    async addWorker(worker) {
      try {
        const response = await axios.post("http://localhost:5000/workers", worker);
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
        await axios.put(`http://localhost:5000/workers/${updatedWorker.id}`, updatedWorker);
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
        await axios.delete(`http://localhost:5000/workers/${workerId}`);
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
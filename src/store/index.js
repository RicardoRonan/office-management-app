import { defineStore } from "pinia";
import astronautPeace from '@/assets/staff-avatar/astronaut-peace-emote.svg';
import astronautSuper from '@/assets/staff-avatar/astronaut-super.svg';
import astronautRocket from '@/assets/staff-avatar/astronaut-sitting-on-rocket.svg';
import astronautBadBoy from '@/assets/staff-avatar/astronaut-bad-boy.svg';
import astronautJupiter from '@/assets/staff-avatar/astronaut-holding-jupiter.svg';
import astronautMoon from '@/assets/staff-avatar/astronaut-hanging-on-moon.svg';
import astronautBalloons from '@/assets/staff-avatar/astronaut-balloons.svg';

export const useOfficeStore = defineStore("officeStore", {
  state: () => ({
    offices: [
      {
        id: 1,
        OfficeName: "Specno",
        PhysicalAddress: "test place",
        EmailAddress: "",
        PhoneNumber: "",
        "Maximum Capacity": "",
        OfficeColor: "#FF5733", // Example default color
      },
      {
        id: 2,
        OfficeName: "Company Name",
        PhysicalAddress: "test place 2",
        EmailAddress: "",
        PhoneNumber: "",
        "Maximum Capacity": "",
        OfficeColor: "#33FF57", // Example default color
      },
    ],
    workers: [
      {
        workerId: 1,
        officeId: 1,
        FirstName: "Ricardo",
        LastName: "Moses",
        Avatar: "",
      },
      {
        workerId: 2,
        officeId: 2,
        FirstName: "Joshua",
        LastName: "Huckleberry",
        Avatar: "",
      },
      {
        workerId: 3,
        officeId: 2,
        FirstName: "John",
        LastName: "Doughnuts",
        Avatar: "",
      },
    ],

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
      astronautBalloons.toString()
    ]
  }),

  getters: {
    getOffices: (state) => {
      return state.offices.map((office) => {
        office.workers = state.workers.filter(
          (worker) => worker.officeId === office.id
        );
        return office;
      });
    },
    getWorkers: (state) => state.workers,
    getAvailableColors: (state) => state.availableColors, // Getter for colors
  },

  actions: {
    //#region ADD OFFICE
    addOffice(office) {
      const newId = this.offices.length
        ? Math.max(...this.offices.map((o) => o.id)) + 1
        : 1;
      office.id = newId;

      if (!this.availableColors.some((c) => c.hex === office.OfficeColor)) {
        office.OfficeColor = this.availableColors[0].hex;
      }

      this.offices.push(office);
      this.saveState();
    },
    //#endregion

    //#region EDIT OFFICE
    editOffice(updatedOffice) {
      const index = this.offices.findIndex(
        (office) => office.id === updatedOffice.id
      );
      if (index !== -1) {
        if (
          !this.availableColors.some((c) => c.hex === updatedOffice.OfficeColor)
        ) {
          updatedOffice.OfficeColor = this.availableColors[0].hex;
        }

        this.offices.splice(index, 1, updatedOffice);
        this.saveState();
      }
    },
    //#endregion

    //#region DELETE OFFICE
    deleteOffice(officeId) {
      this.offices = this.offices.filter((office) => office.id !== officeId);
      this.saveState();
    },
    //#endregion

    //#region ADD WORKER
    addWorker(worker) {
      if (!worker.Avatar) {
        worker.Avatar = this.availableAvatars[0]; 
      }
      this.workers.push(worker);
      this.saveState();
    },
    //#endregion

    //#region EDIT WORKER
    editWorker(updatedWorker) {
      const index = this.workers.findIndex(
        (worker) => worker.workerId === updatedWorker.workerId
      );
      if (index !== -1) {
        if (!updatedWorker.Avatar) {
          updatedWorker.Avatar = this.availableAvatars[0];  
        }
        this.workers.splice(index, 1, updatedWorker);
        this.saveState();
      }
    },
    //#endregion

    //#region DE:ETE WORKER
    deleteWorker(workerId) {
      const index = this.workers.findIndex(
        (worker) => worker.workerId === workerId
      );
      if (index !== -1) {
        this.workers.splice(index, 1);

        this.saveState();
      }
    },
    //#endregion

    // Save state to localStorage
    saveState() {
      localStorage.setItem("offices", JSON.stringify(this.offices));
      localStorage.setItem("workers", JSON.stringify(this.workers));
    },

    // Load state from localStorage
    loadState() {
      const offices = JSON.parse(localStorage.getItem("offices")) || [];
      const workers = JSON.parse(localStorage.getItem("workers")) || [];
      this.offices = offices;
      this.workers = workers;
    },
  },
});

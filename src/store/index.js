import { defineStore } from 'pinia';

export const useOfficeStore = defineStore('officeStore', {
  state: () => ({
    offices: [
      {
        "id": 1,
        "OfficeName": "Specno",
        "PhysicalAddress": "test place",
        "EmailAddress": "",
        "PhoneNumber": "",
        "Maximum Capacity": "",
        "OfficeColor": "#FF5733"  // Example default color
      },
      {
        "id": 2,
        "OfficeName": "Company Name",
        "PhysicalAddress": "test place 2",
        "EmailAddress": "",
        "PhoneNumber": "",
        "Maximum Capacity": "",
        "OfficeColor": "#33FF57"  // Example default color
      }
    ],
    workers: [
      {
        "workerId": 1,
        "officeId": 1,
        "FirstName": "Ricardo",
        "LastName": "Moses"
      },
      {
        "workerId": 2,
        "officeId": 2,
        "FirstName": "Joshua",
        "LastName": "Huckleberry"
      },
      {
        "workerId": 3,
        "officeId": 2,
        "FirstName": "John",
        "LastName": "Doughnuts"
      }
    ],
    
    availableColors: [  // List of colors with names
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
      { name: "Electric Purple", hex: "#8338ec" }
    ]
  }),

  getters: {
    getOffices: (state) => state.offices,
    getWorkers: (state) => state.workers,
    getAvailableColors: (state) => state.availableColors // Getter for colors
  },

  actions: {
    // Add Office
    addOffice(office) {
      const newId = this.offices.length ? Math.max(...this.offices.map(o => o.id)) + 1 : 1;
      office.id = newId;

      // Ensure OfficeColor is valid
      if (!this.availableColors.some(c => c.hex === office.OfficeColor)) {
        office.OfficeColor = this.availableColors[0].hex; // Default to the first color
      }

      this.offices.push(office);
      this.saveState();
    },
    
    // Edit Office
    editOffice(updatedOffice) {
      const index = this.offices.findIndex(office => office.id === updatedOffice.id);
      if (index !== -1) {
        // Ensure the OfficeColor is valid
        if (!this.availableColors.some(c => c.hex === updatedOffice.OfficeColor)) {
          updatedOffice.OfficeColor = this.availableColors[0].hex; // Default color
        }

        this.offices.splice(index, 1, updatedOffice);
        this.saveState();
      }
    },

    // Delete Office
    deleteOffice(officeId) {
      this.offices = this.offices.filter(office => office.id !== officeId);
      this.saveState();
    },
 // Add Worker
 addWorker(worker) {
  this.workers.push(worker);
  this.saveState();  // Save updated state
},
// Edit Worker
editWorker(updatedWorker) {
  const index = this.workers.findIndex(worker => worker.workerId === updatedWorker.workerId);
  if (index !== -1) {
    // Ensure reactivity by directly modifying the array
    this.workers.splice(index, 1, updatedWorker);
  this.saveState();  // Save updated state

  }
},
deleteWorker(workerId) {
  const index = this.workers.findIndex(worker => worker.workerId === workerId);
  if (index !== -1) {
    this.workers.splice(index, 1);  // Remove the worker from the array
    
    this.saveState();  // Optional, if you want to persist changes
  }
},

    // Save state to localStorage
    saveState() {
      localStorage.setItem('offices', JSON.stringify(this.offices));
      localStorage.setItem('workers', JSON.stringify(this.workers));
    },

    // Load state from localStorage
    loadState() {
      const offices = JSON.parse(localStorage.getItem('offices')) || [];
      const workers = JSON.parse(localStorage.getItem('workers')) || [];
      this.offices = offices;
      this.workers = workers;
    }
  }
});

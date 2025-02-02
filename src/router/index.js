import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OfficeView from '../views/OfficeView.vue'
import WorkerForm from '../components/WorkerForm.vue'
import OfficeForm from '../components/OfficeForm.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/office/:id',
    name: 'office',
    component: OfficeView,
    props: true
  },
  {
    path: '/worker/add/:officeId',  
    name: 'addWorker',            
    component: WorkerForm,          
    props: true                     
  },
  {
    path: '/office/new',  
    name: 'addOffice',        
    component: OfficeForm,          
    props: true                     
  },
  {
    path: '/office/:officeId/worker/:workerId/edit',
    name: 'editWorker',
    component: WorkerForm,
    props: true // Ensure that params are passed as props
  },
  {
    path: '/office/:id/edit',
    name: 'edit-office',
    component: OfficeForm, 
    props: true
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

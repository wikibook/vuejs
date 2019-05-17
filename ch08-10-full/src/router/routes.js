import KbnBoardView from '@/components/templates/KbnBoardView.vue'
import KbnLoginView from '@/components/templates/KbnLoginView.vue'
import KbnTaskDetailModal from '@/components/templates/KbnTaskDetailModal.vue'

export default [{
  path: '/',
  component: KbnBoardView,
  meta: { requiresAuth: true },
  children: [{
    path: 'tasks/:id',
    component: KbnTaskDetailModal,
    name: 'taskDetailModal',
    meta: { requiresAuth: true }
  }]
}, {
  path: '/login',
  component: KbnLoginView
}, {
  path: '*',
  redirect: '/'
}]

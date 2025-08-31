import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/questions',
    name: 'questions',
    component: () => import('../pages/QuestionsPage.vue'),
    children: [
      {
        path: 'new',
        component: () => import('../components/questions/NewQuestionForm.vue'),
      },
    ],
  },
  {
    path: '/questions/:id/edit',
    name: 'edit-question',
    props: true,
    component: () => import('../pages/EditQuestionPage.vue'),
  },
  {
    path: '/quiz-setup',
    name: 'quiz-setup',
    component: () => import('../pages/QuizSetupPage.vue'),
    children: [
      {
        path: 'new-user',
        component: () => import('../components/quiz/NewUserForm.vue'),
      },
    ],
  },
  {
    path: '/quiz',
    name: 'quiz',
    props: true,
    component: () => import('../pages/QuizPage.vue'),
    children: [
      {
        path: ':id',
        props: true,
        component: () => import('../components/quiz/QuizQuestion.vue'),
      },
    ],
  },
  {
    path: '/quiz-finish',
    name: 'quiz-finish',
    component: () => import('../pages/QuizFinishPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../pages/PageNotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

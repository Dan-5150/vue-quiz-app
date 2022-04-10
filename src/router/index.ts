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
    component: () => import(/* webpackChunkName: "questions" */ '../pages/QuestionsPage.vue'),
    children: [
      {
        path: 'new',
        component: () => import(/* webpackChunkName: "new-question" */ '../components/questions/NewQuestionForm.vue'),
      },
    ],
  },
  {
    path: '/questions/:id/edit',
    name: 'edit-question',
    props: true,
    component: () => import(/* webpackChunkName: "edit-question" */ '../pages/EditQuestionPage.vue'),
  },
  {
    path: '/quiz-setup',
    name: 'quiz-setup',
    component: () => import(/* webpackChunkName: "quiz-setup" */ '../pages/QuizSetupPage.vue'),
    children: [
      {
        path: 'new-user',
        component: () => import(/* webpackChunkName: "new-user" */ '../components/quiz/NewUserForm.vue'),
      },
    ],
  },
  {
    path: '/quiz',
    name: 'quiz',
    props: true,
    component: () => import(/* webpackChunkName: "quiz" */ '../pages/QuizPage.vue'),
    children: [
      {
        path: ':id',
        props: true,
        component: () => import(/* webpackChunkName: "quiz-question" */ '../components/quiz/QuizQuestion.vue'),
      },
    ],
  },
  {
    path: '/quiz-finish',
    name: 'quiz-finish',
    component: () => import(/* webpackChunkName: "quiz-finish" */ '../pages/QuizFinishPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "not-found" */ '../pages/PageNotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

<template>
  <section>
    <base-card>
      <h1>Edit Questions</h1>
      <p>View, add, update or delete questions here.</p>
      <base-button
        :link="true"
        to="/questions/new"
      >
        New Question
      </base-button>
      <router-view />
      <question-item
        :questions="questions"
        @delete-question="deleteQuestion"
      />
    </base-card>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useQuestionsStore } from '@/stores/questions'
import QuestionItem from '../components/questions/QuestionItem.vue'

const questionsStore = useQuestionsStore()
const { questions } = storeToRefs(questionsStore)
const { deleteQuestion } = questionsStore
</script>

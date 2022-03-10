import { render } from '@testing-library/vue'
import QuestionItem from '@/components/questions/QuestionItem.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import BaseButton from '@/components/UI/BaseButton.vue'
import defaultQuestions from '@/assets/default-questions'

describe('QuestionItem.vue', () => {
  test('renders question name', () => {
    const { getByText, debug } = render(QuestionItem, {
      components: { BaseCard, BaseButton },
      stubs: ['router-link'],
      props: {
        questions: defaultQuestions,
      },
    })
    getByText('1. What is the capital of Australia?')
    getByText('2. What does BBC stand for?')
    getByText('3. What out of the following is NOT a continent?')
    getByText('4. How long is an olympic swimming pool in metres?')
    // debug()
  })
})

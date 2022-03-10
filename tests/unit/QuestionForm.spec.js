import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import QuestionForm from '@/components/questions/QuestionForm.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import BaseButton from '@/components/UI/BaseButton.vue'
// import defaultQuestions from '@/assets/default-questions'

describe('QuestionForm.vue', () => {
  test('renders question form', () => {
    const newQuestion = {
      question: 'This is a test?',
      questionType: 'multipleChoice',
      choices: [
        {
          answer: 'A',
          correct: true,
        },
        {
          answer: 'B',
          correct: false,
        },
      ],
    }

    const { debug, getByLabelText, getByText } = render(QuestionForm, {
      components: { BaseCard, BaseButton },
      stubs: ['router-link'],
      props: {
        processType: 'new',
        // editQuestion: defaultQuestions[0],
      },
    })
    
    // Question input
    const questionInput = getByLabelText(/Question/i)
    userEvent.type(questionInput, newQuestion.question)
    expect(questionInput.value).toEqual(newQuestion.question)

    // Radio buttons
    const multipleChoiceRadio = getByLabelText(/Multiple Choice/i)
    expect(multipleChoiceRadio).not.toBeChecked()
    const textRadio = getByLabelText(/Text Answer/i)
    expect(textRadio).not.toBeChecked()

    // Select multiple choice radio button
    userEvent.click(multipleChoiceRadio)
    expect(multipleChoiceRadio).toBeChecked()
    expect(screen.getByText('Add New Choice')).toBeInTheDocument()
    // debug()
  })
})

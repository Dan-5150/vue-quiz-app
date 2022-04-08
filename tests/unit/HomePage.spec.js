import { shallowMount } from '@vue/test-utils'
import HomePage from '@/pages/HomePage.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import BaseButton from '@/components/UI/BaseButton.vue'

describe('HomePage.vue', () => {
  // it('renders props.msg when passed', () => {
  //   const msg = 'new message'
  //   const wrapper = shallowMount(HomePage, {
  //     propsData: { msg },
  //   })
  //   expect(wrapper.text()).toMatch(msg)
  // })

  test('renders the home page', () => {
    const wrapper = shallowMount(HomePage, {
      components: { BaseCard, BaseButton },
      stubs: ['router-link'],
    })

    const h1 = wrapper.findComponent('h1')
    const p = wrapper.findComponent('p')
    const button1 = wrapper.findAllComponents(BaseButton).at(0)
    const button2 = wrapper.findAllComponents(BaseButton).at(1)

    expect(h1.text()).toBe('Welcome to the Quiz App')
    expect(p.text()).toBe('Feel free to explore the app...')
    expect(button1.text()).toBe('Edit Questions')
    expect(button2.text()).toBe('Take the Quiz')
  })
})

import Vue from 'vue'
import Chat from '@/views/Chat'

describe('Chat.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Chat)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .toEqual('Welcome to Your Vue.js App')
  })
})

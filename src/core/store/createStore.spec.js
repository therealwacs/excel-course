import {createStore} from './createStore'

describe('TEST', () => {
  test('Should be defined', () => {
    const store = createStore(() => {}, {})
    expect(store).toBeDefined()
  })
})

// from '@core/store/createStore'

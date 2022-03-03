import { EmailValidatorAdapter } from './email-validator-adapter'

describe('EmailValidator Adapter', () => {
  test('Should return false if validator return false', () => {
    const sut = new EmailValidatorAdapter()
    const isValidEmail = sut.isValid('invalid_email@mail.com')
    expect(isValidEmail).toBeFalsy()
  })
})

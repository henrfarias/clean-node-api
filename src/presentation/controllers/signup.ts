import { badRequest, serverError } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError, InvalidParamError } from '../errors'

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValidEmail = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }
      return { statusCode: 400, body: '' }
    } catch (error) {
      return serverError()
    }
  }
}

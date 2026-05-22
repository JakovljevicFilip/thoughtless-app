import { ThoughtSettings } from 'src/application/Microservice/Thought/Domain/ThoughtSettings'

import type { InputFieldValidation } from 'src/application/Platform/AggregateSchema/Application/Input/InputValidation'

export const thoughtInput: {
  content: InputFieldValidation<string>
} = {
  content: {
    rules: [
      (v: string) => (!!v && v.trim().length > 0) || 'Content is required',
      (v: string) =>
        v.trim().length >= ThoughtSettings.minContentLength ||
        `Minimum ${ThoughtSettings.minContentLength} characters`,
      (v: string) =>
        v.trim().length <= ThoughtSettings.maxContentLength ||
        `Maximum ${ThoughtSettings.maxContentLength} characters`,
    ],

    isValid(value: string): boolean {
      return this.rules.every(rule => rule(value) === true)
    },
  },
}

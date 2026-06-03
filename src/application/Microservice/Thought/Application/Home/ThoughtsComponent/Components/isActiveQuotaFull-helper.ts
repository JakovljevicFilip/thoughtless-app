import { ThoughtSettings } from 'src/application/Microservice/Thought/Domain/ThoughtSettings'

export const isActiveQuotaFull = (numberOfActiveThoughts: number): boolean => {
  return numberOfActiveThoughts >= ThoughtSettings.maxActive
}

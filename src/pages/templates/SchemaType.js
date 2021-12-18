import TemplateCalendar from './Calendar/schema'

const Templates = [
  TemplateCalendar,
]

export default Templates

export const TemplatesDictionary = Templates.reduce((dic, c) => {
  dic[c.name] = c.factory
  return dic
}, {})

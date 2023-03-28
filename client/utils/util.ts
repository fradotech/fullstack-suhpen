import dayjs from 'dayjs'

export class Util {
  static isValidJSON = (str: string): boolean => {
    try {
      JSON.parse(str)
    } catch (e) {
      return false
    }
    return true
  }

  static fieldCamelToSnake = (model: object): object => {
    const camelKeys = Object.keys(model)
    const snakeKeys = camelKeys.map((key) => this.camelToSnake(key))

    return { ...snakeKeys }
  }

  static titleCase = (str: string) => {
    const res2 = str.replace(/([A-Z])/g, ' $1')
    return res2.charAt(0).toUpperCase() + res2.slice(1)
  }

  static camelToSnake = (str: string) => {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
  }

  static camelToTitle = (str: string) => {
    const result = str.replace(/([A-Z])/g, ' $1')
    return result.charAt(0).toUpperCase() + result.slice(1)
  }

  static formatDate = (date: Date | string | dayjs.Dayjs) => {
    const newDate = dayjs(date).format('YYYY MM DD')
    return newDate == 'Invalid Date' ? '-' : newDate
  }

  static formatDatetime = (date: Date | string | dayjs.Dayjs) => {
    const newDate = dayjs(date).format('YYYY MM DD - HH:MM')
    return newDate == 'Invalid Date' ? '-' : newDate
  }

  static formatCurrency = (str: number | string) => {
    const formatter = new Intl.NumberFormat('in-ID', {
      style: 'currency',
      currency: 'IDR',
    })

    const currency = formatter.format(+str)

    return currency.substring(0, currency.length - 3)
  }
}

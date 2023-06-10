import { REGEX_EMAIL, REGEX_PASSWORD } from './character.constant'

export const rule = {
  required: { required: true },
  email: {
    required: true,
    pattern: REGEX_EMAIL,
    message: 'Email must be an email',
  },
  password: {
    required: true,
    min: 6,
    pattern: REGEX_PASSWORD,
    message:
      'Password at least 6 character with lower case, upper case, and number',
  },
}

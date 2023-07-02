import { Modules } from '../../../../../@server/modules/modules'

const root = `/${Modules.Account}`

export const accountPath = {
  index: root,
  edit: `${root}/edit`,
}

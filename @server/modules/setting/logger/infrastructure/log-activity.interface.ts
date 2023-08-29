import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'

export interface ILogActivity {
  id: string
  createdAt: Date
  executeTimeInMs: number
  method: string
  path: string
  headers: Headers
  remoteAddress: string
  user: IUser
  body: ReadableStream<Uint8Array> | null
}

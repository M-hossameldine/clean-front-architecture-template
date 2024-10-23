export enum USER_STATUS {
  ACTIVE = 1,
  INACTIVE = 0,
}

export type User = {
  username: string
  email: string
  uuid: string
  status: USER_STATUS
}

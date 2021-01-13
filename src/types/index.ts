export interface IUser {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
  id: number,
  avatar: null | string,
}

export interface IChat {
  id: number,
  title: string | null,
  avatar: string,
  created_by: number,
}

export interface IMessage {
  id: number,
  chat_id: number,
  user_id: number,
  content: string,
  time: string,
}

export interface IServerError {
  reason: string,
}

export type IError = IServerError | Error;

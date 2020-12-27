export interface IUser {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
  id: number,
  avatar: null | string,
};

export interface IChat {
  id: number,
  title: string | null,
  avatar: string,
  created_by: number,
};

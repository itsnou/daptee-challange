export interface ILogin {
  user: string
  password: string
}

export interface IAddress {
  street: string
  suite: string
  city: string
  zipcode: string
}

export interface IDataUser {
  id: number
  name: string
  username: string
  email: string
  address: IAddress
  phone: string
}

export interface IDataProduct {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

import { IPhoto } from "./iphoto"

export interface IMember {
  id: number
  userName: string
  age: number
  knownAs: string
  created: Date
  lastActive: Date
  gender: string
  introduction: string
  lookingFor: string
  interests: string
  city: string
  country: string
  photos: IPhoto[]
  photoUrl: string
}



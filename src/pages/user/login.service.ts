import { BeforeRouteEnter } from '@/types'

export class LoginService implements BeforeRouteEnter {
  beforeRouteEnter(to, from, next) {
    console.log('this is called beforeRouteEnter')
    next()
  }
}

export const loginService = new LoginService()

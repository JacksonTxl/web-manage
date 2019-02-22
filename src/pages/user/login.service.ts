import { BeforeRouteEnter, StRoute } from '@/types'

export class LoginService implements BeforeRouteEnter {
  beforeRouteEnter(to: StRoute, from: StRoute, next: Function) {
    console.log('this is called beforeRouteEnter')
    next()
  }
}

export const loginService = new LoginService()

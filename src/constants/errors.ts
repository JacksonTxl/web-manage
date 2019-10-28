import { Injectable } from 'vue-service-app'

@Injectable()
export class Errors {
  REDIRECT_ROUTE_EMPTY = 50001
  REDIRECT_ROUTE_NAME_NOT_EXIST = 50002
  NO_AUTH_TAB_CAN_REDIRECT = 50003
}

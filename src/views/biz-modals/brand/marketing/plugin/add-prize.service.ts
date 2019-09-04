import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { UserService } from '@/services/user.service'

@Injectable()
export class AddPrizeService {
  shops$ = this.userService.getOptions$('plugin.shop_setting')
  prizeType$ = this.userService.getOptions$('plugin.prize_type')
  imgType$ = this.userService.getOptions$('plugin.img_type')
  constructor(private userService: UserService) {}
}

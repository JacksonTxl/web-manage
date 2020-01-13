import { Injectable } from 'vue-service-app'
import { UserService } from '@/services/user.service'
@Injectable()
export class RemedialCourseInfoService {
  constructor(private userService: UserService) {}
  reserveStatusOptions$ = this.userService.getOptions$(
    'small_course.reserve_status'
  )
}

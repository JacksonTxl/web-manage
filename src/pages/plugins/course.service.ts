import { BeforeRouteEnter, StRoute } from '@/types'

class CourseService implements BeforeRouteEnter {
  beforeRouteEnter(to: StRoute, from: StRoute, next: Function) {
    console.log('this is course')
    next()
  }
}

export const courseService = new CourseService()

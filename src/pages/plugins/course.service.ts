import { BeforeRouteEnter } from '@/types'

class CourseService implements BeforeRouteEnter {
  beforeRouteEnter(to, from, next) {
    console.log('this is course')
    next()
  }
}

export const courseService = new CourseService()

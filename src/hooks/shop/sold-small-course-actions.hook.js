import SoldCourseSmallCourseTransfer from '@/views/biz-modals/sold/course/small-course/transfer'
import SoldCourseSmallCourseChange from '@/views/biz-modals/sold/course/small-course/change'

const useSmallCourseActions = () => {
  return {
    modals: {
      SoldCourseSmallCourseTransfer,
      SoldCourseSmallCourseChange
    },
    methods: {
      onTrasnfer(record) {
        this.$modalRouter.push({
          name: 'sold-course-small-course-transfer',
          props: {
            id: record.id
          },
          on: {
            success: () => {
              this.$emit('refresh')
            }
          }
        })
      },
      onChangeSmallCourse(record) {
        this.$modalRouter.push({
          name: 'sold-course-small-course-change',
          props: {
            id: record.id
          },
          on: {
            success: () => {
              this.$emit('refresh')
            }
          }
        })
      }
    }
  }
}

export default useSmallCourseActions

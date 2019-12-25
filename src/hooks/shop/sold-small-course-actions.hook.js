import SoldCourseSmallCourseTransfer from '@/views/biz-modals/sold/course/small-course/transfer'

const useSmallCourseActions = () => {
  return {
    modals: {
      SoldCourseSmallCourseTransfer
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
      }
    }
  }
}

export default useSmallCourseActions

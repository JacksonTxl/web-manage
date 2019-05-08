<template>
  <st-modal title="批量新增课程排期" @ok="save" v-model="show">
    <st-container>
      <st-table :columns="columns" :dataSourse="data">

      </st-table>
    </st-container>
  </st-modal>
</template>

<script>
export default {
  name: 'AddCourseScheduleBatch',
  data() {
    return {
      data: '[]',
      show: false,
      form: this.$form.createForm(this),
      columns: [{
        title: '日期',
        dataIndex: 'name',
        width: '20%',
        scopedSlots: { customRender: 'name' }
      }, {
        title: '课程',
        dataIndex: 'gender',
        width: '20%'
      }, {
        title: '上课教练',
        dataIndex: 'email'
      }, {
        title: '人数',
        dataIndex: 'name',
        scopedSlots: { customRender: 'name' }
      }, {
        title: '课时费',
        dataIndex: 'gender',
        width: '20%'
      }, {
        title: '操作',
        dataIndex: 'action'
      }]
    }
  },
  methods: {
    onChange() {

    },
    save() {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>

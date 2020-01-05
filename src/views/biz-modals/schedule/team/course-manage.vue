<template>
  <st-modal
    title="团课周课表管理"
    @ok="save"
    okText="确定"
    v-model="show"
    width="874px"
    wrapClassName="modal-schedule-team-course-manage"
  >
    <div class="border-box">
      <st-form-table hoverable :isEmpty="false">
        <thead>
          <tr>
            <th>创建时间</th>
            <th>课表名称</th>
            <th>团课类型</th>
            <th>最大排课节数</th>
            <th>创建人</th>
            <th style="width:120px">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="6" class="st-form-table__add">
              <st-button type="dashed" icon="add" block @click="addCourse">
                添加
              </st-button>
            </td>
          </tr>

          <template v-for="(item, index) in courseList">
            <tr :key="index">
              <td>{{ item.time }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.num }}</td>
              <td>{{ item.person }}</td>
              <td>
                <template>
                  <a class="course-edit" @click="delRow(index)">
                    编辑
                  </a>
                  <a @click="delRow(index)">
                    删除
                  </a>
                </template>
              </td>
            </tr>
          </template>
        </tbody>
      </st-form-table>
    </div>
  </st-modal>
</template>
<script>
import { CourseManageService } from './course-manage.service'
// import { MessageService } from '@/services/message.service'
// import { PatternService } from '@/services/pattern.service'
export default {
  serviceInject() {
    return {
      courseManageService: CourseManageService
    }
  },
  name: 'courseManageService',
  props: {},
  data() {
    return {
      courseList: [
        {
          time: '2019-11-11 09:00:00',
          name: '周一课表',
          type: '类型一',
          num: '20',
          person: '王新元'
        }
      ],
      show: false
    }
  },
  created() {},
  methods: {
    // 添加课表
    addCourse() {
      this.$emit('add')
    },
    delRow(index) {
      this.sites.splice(index, 1)
    },
    save(e) {
      let self = this
      let verify = true
      e.preventDefault()
      const sites = this.sites.map(item => {
        !self.pattern.CN_EN_NUM_SPACE('1-6').test(item.name) && (verify = false)
        return item.name
      })
      if (!verify) {
        this.messageService.warning({
          content: '输入的场馆名称格式错误，请重新输入'
        })
        return
      }
      let data = {
        venues_id: this.venuesId,
        sites: self.sites.map(item => item.name)
      }
      self.Service.addSites(data).subscribe(state => {
        this.messageService.success({ content: '添加成功' })
        self.show = false
        self.$emit('success', true)
      })
    }
  }
}
</script>

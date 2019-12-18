<template>
  <div>
    <div class="st-des">
      已添加{{ resData.total }}个，支持添加{{ resData.max }}个
    </div>
    <st-form-table class="mg-t8" :loading="loading.getCourseGroupRangeList">
      <thead>
        <tr>
          <th>课程范围</th>
          <th>标记课程数</th>
          <th>创建人</th>
          <th>最后修改时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-if="auth.add" colspan="5" class="st-form-table__add">
            <st-button
              type="dashed"
              icon="add"
              block
              :disabled="resData.total >= resData.max"
              v-modal-link="{
                name: 'course-range-add',
                on: {
                  success: onListChange
                }
              }"
            >
              添加小班课适用范围
            </st-button>
          </td>
        </tr>
        <tr v-for="(item, index) in resData.list" :key="index">
          <td>{{ item.setting_name }}</td>
          <td>{{ item.used_number }}</td>
          <td>{{ item.operator_name }}</td>
          <td>{{ item.updated_time }}</td>
          <td>
            <st-table-actions>
              <a
                v-if="item.auth['brand_shop:course:course_scope|edit']"
                v-modal-link="{
                  name: 'course-range-edit',
                  props: { info: item },
                  on: { success: onListChange }
                }"
              >
                编辑
              </a>
              <st-popconfirm
                v-if="item.auth['brand_shop:course:course_scope|del']"
                :title="
                  `删除后不可进行恢复，${
                    item.used_number ? '已标记的课程将删除此训练目的，' : ''
                  }确定删除此课程范围？`
                "
                @confirm="onDelete(item.id)"
              >
                <a>删除</a>
              </st-popconfirm>
            </st-table-actions>
          </td>
        </tr>
      </tbody>
    </st-form-table>
  </div>
</template>
<script>
import { columns } from './group-range.config'
import { GroupRangeService } from './group-range.service'
import { MessageService } from '@/services/message.service'
import CourseRangeAdd from '@/views/biz-modals/course-range/add'
import CourseRangeEdit from '@/views/biz-modals/course-range/edit'
export default {
  serviceInject() {
    return {
      groupRangeService: GroupRangeService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      resData: this.groupRangeService.resData$,
      loading: this.groupRangeService.loading$,
      auth: this.groupRangeService.auth$
    }
  },
  modals: {
    CourseRangeAdd,
    CourseRangeEdit
  },
  computed: {
    columns
  },
  methods: {
    onDelete(id) {
      this.groupRangeService.deleteCourseRange(id).subscribe(() => {
        this.messageService.success({
          content: '删除成功'
        })
        this.onListChange()
      })
    },
    onListChange() {
      this.$router.push({
        query: {}
      })
    }
  }
}
</script>

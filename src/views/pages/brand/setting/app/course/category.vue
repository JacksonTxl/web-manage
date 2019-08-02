<template>
  <div>
    <div class="st-des">
      已添加{{ resData.total }}个，支持添加{{ resData.max }}个
    </div>
    <st-form-table class="mg-t8" :loading="loading.getCourseCategoryList">
      <thead>
        <tr>
          <th>课程类别</th>
          <th>标记课程数</th>
          <th>创建人</th>
          <th>最后修改时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="auth.add">
          <td colspan="5" class="st-form-table__add">
            <st-button
              type="dashed"
              icon="add"
              block
              :disabled="resData.total >= resData.max"
              v-modal-link="{
                name: 'course-category-add',
                on: { change: onListChange }
              }"
            >
              添加课程类型
            </st-button>
          </td>
        </tr>
        <tr v-for="(item, index) in resData.list" :key="index">
          <td>{{ item.setting_name }}</td>
          <td>{{ item.used_number }}</td>
          <td>{{ item.operator_name }}</td>
          <td>{{ item.updated_time }}</td>
          <td v-if="item.auth">
            <st-table-actions>
              <a
                v-if="item.auth['brand_shop:course:course_type|edit']"
                v-modal-link="{
                  name: 'course-category-edit',
                  props: { id: item.id, setting_name: item.setting_name },
                  on: { change: onListChange }
                }"
              >
                编辑
              </a>
              <a-popconfirm
                v-if="item.auth['brand_shop:course:course_type|del']"
                :title="
                  `删除后不可进行恢复，${
                    item.used_number ? '已标记的课程将删除此课程类型，' : ''
                  }确定删除此课程类型？`
                "
                @confirm="onDelete(item.id)"
              >
                <a>删除</a>
              </a-popconfirm>
            </st-table-actions>
          </td>
        </tr>
      </tbody>
    </st-form-table>
  </div>
</template>
<script>
import { CategoryService } from './category.service'
import { RouteService } from '@/services/route.service'
import { MessageService } from '@/services/message.service'
import CourseCategoryAdd from '@/views/biz-modals/course-category/add'
import CourseCategoryEdit from '@/views/biz-modals/course-category/edit'
export default {
  serviceInject() {
    return {
      listService: CategoryService,
      routeService: RouteService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      resData: this.listService.resData$,
      loading: this.listService.loading$,
      query: this.routeService.query$,
      auth: this.listService.auth$
    }
  },
  modals: {
    CourseCategoryAdd,
    CourseCategoryEdit
  },
  methods: {
    onDelete(id) {
      this.listService.deleteCourseCategory({ id }).subscribe(() => {
        this.messageService.success({
          content: '删除成功'
        })
        this.onListChange()
      })
    },
    onListChange() {
      this.$router.push({
        query: {},
        force: true
      })
    }
  }
}
</script>

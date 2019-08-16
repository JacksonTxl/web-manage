<template>
  <div>
    <div class="st-des">
      已添加{{ resData.total }}个，支持添加{{ resData.max }}个
    </div>
    <st-form-table class="mg-t8">
      <thead>
        <tr>
          <th>擅长项目</th>
          <th>标记员工数</th>
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
                name: 'skillful-add',
                on: { change: onListChange }
              }"
            >
              添加擅长项目
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
                v-if="item.auth['brand_shop:coach:good_at|edit']"
                v-modal-link="{
                  name: 'skillful-edit',
                  props: { id: item.id, setting_name: item.setting_name },
                  on: { change: onListChange }
                }"
              >
                编辑
              </a>
              <st-popconfirm
                v-if="item.auth['brand_shop:coach:good_at|del']"
                :title="
                  `删除后不可进行恢复，${
                    item.used_number ? '已标记的员工将删除此擅长项目，' : ''
                  }确定删除此擅长项目？`
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
import { SkillfulService } from './skillful.service'
import { RouteService } from '@/services/route.service'
import { MessageService } from '@/services/message.service'
import SkillfulAdd from '@/views/biz-modals/skillful/add'
import SkillfulEdit from '@/views/biz-modals/skillful/edit'
export default {
  modals: {
    SkillfulAdd,
    SkillfulEdit
  },
  serviceInject() {
    return {
      listService: SkillfulService,
      routeService: RouteService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      resData: this.listService.resData$,
      query: this.routeService.query$,
      auth: this.listService.auth$
    }
  },
  methods: {
    onDelete(id) {
      this.listService.deleteSkillful({ id }).subscribe(() => {
        this.messageService.success({
          content: '删除成功'
        })
        this.onListChange()
      })
    },
    onListChange() {
      this.$router.reload()
    }
  }
}
</script>

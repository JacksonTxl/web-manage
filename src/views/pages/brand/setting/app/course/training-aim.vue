<template>
  <div>
    <div class="st-des">
      已添加{{resData.total}}个，支持添加{{resData.max}}个
    </div>
    <st-form-table class="mg-t8" :loading="loading.getTrainingAimList">
      <thead>
        <tr>
          <th>训练目的</th>
          <th>标记课程数</th>
          <th>创建人</th>
          <th>最后修改时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="auth.add">
          <td colspan="5" class="st-form-table__add">
            <st-button type="dashed" block :disabled="resData.total >= resData.max"
              v-modal-link="{ name: 'training-add', on: {
              change: onListChange } }"
            >添加训练目的
            </st-button>
          </td>
        </tr>
        <tr v-for="(item, index) in resData.list" :key="index">
          <td>{{item.setting_name}}</td>
          <td>{{item.used_number}}</td>
          <td>{{item.operator_name}}</td>
          <td>{{item.updated_time}}</td>
          <td>
            <st-table-actions>
              <a v-if="item.auth['brand_shop:course:training_aim|edit']"
                v-modal-link="{ name: 'training-edit',
                props: { id: item.id, setting_name: item.setting_name },
                on: { change: onListChange } }">编辑
              </a>
              <a-popconfirm
                v-if="item.auth['brand_shop:course:training_aim|del']"
                :title="`删除后不可进行恢复，${item.used_number ? '已标记的课程将删除此训练目的，' : ''}确定删除此训练目的？`"
                @confirm="onDelete(item.id)">
                <a class="mg-l8">删除</a>
              </a-popconfirm>
            </st-table-actions>
          </td>
        </tr>
      </tbody>
    </st-form-table>
  </div>
</template>
<script>
import { TrainingAimService } from './training-aim.service'
import { RouteService } from '@/services/route.service'
import { MessageService } from '@/services/message.service'
export default {
  serviceInject() {
    return {
      listService: TrainingAimService,
      routeService: RouteService,
      messageService: MessageService
    }
  },
  rxState() {
    const { listService } = this
    return {
      resData: listService.resData$,
      loading: listService.loading$,
      query: this.routeService.query$,
      auth: listService.auth$
    }
  },
  methods: {
    onDelete(id) {
      this.listService.deleteTrainingAim({ id }).subscribe(() => {
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

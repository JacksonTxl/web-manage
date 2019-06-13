<template>
  <st-panel app v-if="auth.get">
    <st-t2>教练等级</st-t2>
    <div class="mg-t24 st-des">
      已添加{{resData.total}}个，支持添加{{resData.max}}个
    </div>
    <st-form-table class="mg-t8">
      <thead>
        <tr>
          <th>教练等级</th>
          <th>标记员工数</th>
          <th>创建人</th>
          <th>最后修改时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="auth.add">
          <td colspan="5" class="st-form-table__add">
            <modal-link tag="a" :to="{ name: 'coach-level-add', on: {
              change: onListChange } }">
              <st-button type="dashed" block :disabled="resData.total >= resData.max">添加教练等级</st-button>
            </modal-link>
          </td>
        </tr>
        <tr v-for="(item, index) in resData.list" :key="index">
          <td>{{item.setting_name}}</td>
          <td>{{item.used_number}}</td>
          <td>{{item.operator_name}}</td>
          <td>{{item.updated_time}}</td>
          <td>
            <modal-link tag="a" :to="{ name: 'coach-level-edit',
              props: { id: item.id, setting_name: item.setting_name },
              on: { change: onListChange } }">编辑
            </modal-link>
            <a-popconfirm
              :title="`删除后不可进行恢复，${item.used_number ? '已标记的员工将删除此教练等级，' : ''}确定删除此教练等级？`"
              @confirm="onDelete(item.id)">
              <a class="mg-l8">删除</a>
            </a-popconfirm>
          </td>
        </tr>
      </tbody>
    </st-form-table>
  </st-panel>
</template>
<script>
import { CoachLevelService } from './coach-level.service'
import { RouteService } from '@/services/route.service'
import { MessageService } from '@/services/message.service'
export default {
  serviceInject() {
    return {
      listService: CoachLevelService,
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
      this.listService.deleteCoachLevel({ id }).subscribe(() => {
        this.messageService.success({
          content: '删除成功'
        })
        this.onListChange()
      })
    },
    onTableChange(pagination) {
      this.$router.push({
        query: {
          page: pagination.current
        }
      })
    },
    onListChange() {
      this.$router.push({
        query: {
          page: 1
        },
        force: true
      })
    }
  }
}
</script>

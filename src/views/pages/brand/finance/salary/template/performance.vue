<template>
  <st-form-table :page="page" @change="onTableChange" :loading="loading.getList" hoverable>
    <thead>
      <tr>
        <template v-for="(item,index) in columsTitlelist">
          <th :key="index">{{ item }}</th>
        </template>
      </tr>
    </thead>
    <tbody>
      <tr v-if="auth.add">
        <td colspan="5" class="st-form-table__add">
          <st-button type="dashed" block v-modal-link=" { name: 'finance-add-performance-template',on: {change: refresh}}">
           新增业绩模板
          </st-button>
        </td>
      </tr>
      <template v-for="item in list">
        <tr :key="item.id">
          <td>{{ item.template_name }}</td>
          <td>{{ item.performance_type | enumFilter('finance.performance_type') }}</td>
          <td>
            <template v-if="item.used == 0 ">
              <span>{{ item.used }}</span>
            </template>
            <template v-if="item.used != 0 ">
              <a v-modal-link=" { name: 'finance-search-staff-list-performance', props: {id: item.id}}">
                {{ item.used }}</a>
            </template>
          </td>
          <td>{{ item.created_time }}</td>
          <td>
            <st-table-actions>
              <a v-if="item.auth['brand_shop:salary:commission_template|get']" v-modal-link=" { name: 'finance-performance-info', props: {id: item.id},on: {change: refresh}}">详情</a>
              <a v-if="item.auth['brand_shop:salary:commission_template|edit']" v-modal-link=" { name: 'finance-edit-performance-template', props: {id: item.id},on: {change: refresh}}">编辑</a>
              <a href="javascript:;" v-if="item.auth['brand_shop:salary:commission_template|del']" @click="onDelete(item.id)">删除</a>
            </st-table-actions>
          </td>
        </tr>
      </template>
    </tbody>
  </st-form-table>
</template>
<script>
import { PerformanceService } from './performance.service'
import { MessageService } from '@/services/message.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
export default {
  mixins: [tableMixin],
  serviceInject() {
    return {
      basicService: PerformanceService,
      messageService: MessageService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      list: this.basicService.list$,
      auth: this.basicService.auth$,
      page: this.basicService.page$,
      loading: this.basicService.loading$
    }
  },
  data() {
    return {
      columsTitlelist: ['模板名称', '业绩类型', '应用员工', '创建时间', '操作']
    }
  },
  methods: {
    refresh() {
      this.$router.push({
        query: {},
        force: true
      })
    },
    onPageChange(e) {
      console.log(e)
      this.$router.push({
        query: {
          size: e.pageSize,
          page: e.current
        },
        force: true
      })
    },
    onDelete(e) {
      console.log(e)
      let that = this
      this.$confirm({
        title: '提示',
        content: '是否确认删除？',
        onOk() {
          console.log('OK')
          that.basicService.deleteTemplate(e).subscribe(() => {
            console.log('ok')
            that.messageService.success({
              content: '删除成功'
            })
            that.$router.push({
              query: {},
              force: true
            })
          })
        },
        onCancel() {
          console.log('Cancel')
        },
        class: 'test'
      })
    }
  }
}

</script>

<template>
  <st-form-table :page="page" @change="onPageChange" hoverable>
    <thead>
      <tr>
        <template v-for="(item,index) in columsTitlelist">
          <th :key="index">{{ item }}</th>
        </template>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="5" class="st-form-table__add">
          <st-button type="dashed" block>
            <modal-link
              tag="a"
              :to=" { name: 'finance-add-performance-template',on: {change: refresh}}"
            >新增业绩模板</modal-link>
          </st-button>
        </td>
      </tr>
      <template v-for="item in list.list">
        <tr :key="item.id">
          <td>{{ item.template_name }}</td>
          <td>{{ item.performance_type }}</td>
          <td>
            <template v-if="item.used == 0 ">
              <span>{{ item.used }}</span>
            </template>
            <template v-if="item.used != 0 ">
              <modal-link
                tag="a"
                :to=" { name: 'finance-performance-used-list', props: {id: item.id}}"
              >{{ item.used }}</modal-link>
            </template>
          </td>
          <td>{{ item.created_time }}</td>
          <td>
            <modal-link
              tag="a"
              :to=" { name: 'finance-basic-template-edit', props: {item: item},on: {change: refresh}}"
            >详情</modal-link>
            <a-divider type="vertical"></a-divider>
            <modal-link
              tag="a"
              :to=" { name: 'finance-basic-template-edit', props: {item: item},on: {change: refresh}}"
            >编辑</modal-link>
            <a-divider type="vertical"></a-divider>
            <template v-if="item.used == 0">
              <a href="javascript:;" @click="onDelete(item.id)">删除</a>
            </template>
          </td>
        </tr>
      </template>
    </tbody>
  </st-form-table>
</template>
<script>
import { PerformanceService } from './performance.service'
import { MessageService } from '@/services/message.service'
export default {
  serviceInject() {
    return {
      basicService: PerformanceService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      list: this.basicService.list$
    }
  },
  data() {
    return {
      columsTitlelist: ['模板名称', '业绩类型', '应用员工', '创建时间', '操作'],
      page: {
        current_page: 1,
        size: 20,
        total_counts: this.list.page.total_counts,
        total_pages: this.list.page.total_pages
      }
    }
  },
  mounted() {
    console.log(this.list)
  },
  methods: {
    refresh() {
      this.$router.push({ query: {}, force: true })
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
            that.messageService.success({ content: '删除成功' })
            that.$router.push({ query: {}, force: true })
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

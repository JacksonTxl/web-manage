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
            <modal-link tag="a" :to=" { name: 'finance-add-template',on: {change: refresh}}">新增底薪模板</modal-link>
          </st-button>
        </td>
      </tr>
      <template v-for="item in basicInfo.list">
        <tr :key="item.id">
          <td>{{ item.template_name }}</td>
          <td>{{ item.salary }}</td>
          <td>{{ item.used }}</td>
          <td>{{ item.created_time }}</td>
          <td>
            <modal-link
              tag="a"
              :to=" { name: 'finance-basic-template-edit', props: {item: item},on: {change: refresh}}"
            >编辑</modal-link>
            <span style="width:1px;height: 14px;background-color:#e6e9ef;" class="mg-l8 mg-r8"></span>
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
import { BasicService } from './basic.service'
import { MessageService } from '@/services/message.service'
export default {
  serviceInject() {
    return {
      basicService: BasicService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      basicInfo: this.basicService.basicInfo$
    }
  },
  data() {
    return {
      columsTitlelist: [
        '模板名称',
        '月底薪(元)',
        '应用员工',
        '创建时间',
        '操作'
      ],
      page: {
        current_page: 1,
        size: 20,
        total_counts: this.basicInfo.page.total_counts,
        total_pages: this.basicInfo.page.total_pages
      }
    }
  },
  methods: {
    refresh() {
      this.$router.push({ query: {}, force: true })
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
    },
    onPageChange(e) {
      console.log(e)
      this.$router.push({ query: {
        size: e.pageSize,
        page: e.current
      },
      force: true })
    }
  },
  mounted() {
    console.log('list', this.basicInfo.list)
    console.log('page', this.basicInfo.page)
  }
}
</script>

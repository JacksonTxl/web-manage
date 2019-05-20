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
             <modal-link tag="a" :to=" { name: 'finance-add-template'}">薪资底薪模板</modal-link>
          </st-button>
        </td>
      </tr>
      <template  v-for="item in basicInfo.list">
        <tr :key="item.id">
          <td>{{ item.template_name }}</td>
          <td>{{ item.template_name }}</td>
          <td>{{ item.salary }}</td>
          <td>{{ item.created_time }}</td>
          <td>
            <modal-link tag="a"  v-if="item.salary != 0" :to=" { name: 'finance-basic-template-edit', props: {item: item}}">编辑</modal-link>
            <span style="width:1px;height: 14px;background-color:#e6e9ef;" class="mg-l8 mg-r8"></span>
            <a href="javascript:;" v-if="item.salary == 0" @click="onDelete(item.id)">删除</a>
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
      page: {}
      // list: [{

      // }]
    }
  },
  methods: {
    onEdit(e) {

    },
    onDelete(e) {

    },
    onPageChange(e) {
      console.log(e)
    }
  },
  mounted() {
    console.log('list', this.basicInfo.list)
    console.log('page', this.basicInfo.page)
  }
}
</script>

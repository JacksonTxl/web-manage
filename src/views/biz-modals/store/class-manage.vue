<template>
  <st-modal title="分类管理" @ok="onSubmit" v-model="show">
    <st-container>
      <st-form-table hoverable>
        <thead>
          <tr>
            <th style="padding-left: 42px">分类名称</th>
            <th style="width: 20%">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="3" class="st-form-table__add">
              <st-button type="dashed" icon="add" block @click="addClass">
                添加
              </st-button>
            </td>
          </tr>
          <tr v-for="(item, index) in tableData" :key="index">
            <td style="padding-left: 42px" v-if="item.isEdit">
              <a-input
                style="width: 278px"
                v-model="item.category_name"
              ></a-input>
            </td>
            <td style="padding-left: 42px" v-else>{{ item.category_name }}</td>
            <td>
              <a @click="saveHandle(item, index)" v-if="item.isEdit">保存</a>
              <a @click="editHandle(item, index)" v-else>编辑</a>
              |
              <a @click="cancelHandle(item, index)" v-if="item.isEdit">取消</a>
              <a @click="delHandle(item, index)" v-else>删除</a>
            </td>
          </tr>
        </tbody>
      </st-form-table>
    </st-container>
  </st-modal>
</template>
<script>
import { ClassManageService } from './class-manage.service'
export default {
  serviceInject() {
    return { classManageService: ClassManageService }
  },
  rxState() {
    return {
      tableData: this.classManageService.list$,
      loading: this.classManageService.loading$
    }
  },
  data() {
    return {
      show: false,
      // tableData: [
      //   { category_name: '营养补给', category_id: 1, isEdit: false },
      //   { category_name: '营养补给222', category_id: 2, isEdit: false }
      // ],
      oldTableData: [
        { category_name: '营养补给', category_id: 1 },
        { category_name: '营养补给222', category_id: 2 }
      ]
    }
  },
  mounted() {
    this.classManageService.getList().subscribe()
  },
  methods: {
    onSubmit() {
      this.show = false
      this.$emit('success', this.tableData)
    },
    addClass() {
      this.tableData.unshift({ category_name: '', isEdit: true, isNew: true })
      this.oldTableData.unshift({
        category_name: '',
        isEdit: true,
        isNew: true
      })
    },
    saveHandle(item, index) {
      // 新建分类
      if (item.isNew) {
        this.classManageService
          .addClass({ category_name: item.category_name })
          .subscribe(res => {
            item.category_id = res.category_id
            item.isEdit = false
            this.oldTableData[index] = item
          })
      } else {
        //  编辑分类
        this.classManageService
          .editClass(item.category_id, { category_name: item.category_name })
          .subscribe(res => {
            item.isEdit = false
            this.oldTableData[index] = item
          })
      }
    },
    editHandle(item) {
      item.isEdit = true
    },
    cancelHandle(item, index) {
      item = this.oldTableData[index]
    },
    delHandle(item, index) {
      this.classManageService.delClass(item.category_id).subscribe(res => {
        this.tableData.slice(index, 1)
        this.oldTableData.slice(index, 1)
      })
    }
  }
}
</script>

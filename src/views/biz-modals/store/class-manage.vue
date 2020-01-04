<template>
  <st-modal
    :loading="
      loadingStatus === 1
        ? loading.getList
        : loadingStatus === 2
        ? loading.addClass
        : loadingStatus === 3
        ? loading.delClass
        : loading.editClass
    "
    title="分类管理"
    @ok="onSubmit"
    v-model="show"
  >
    <st-container>
      <st-form-table>
        <thead>
          <tr>
            <th style="padding-left: 42px">分类名称</th>
            <th style="width: 20%">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="tableData.length < 10">
            <td colspan="3" class="st-form-table__add">
              <st-button type="dashed" icon="add" block @click="addClass">
                添加（{{ tableData.length }}/10）
              </st-button>
            </td>
          </tr>
          <tr v-for="(item, index) in tableData" :key="index">
            <td style="padding-left: 42px" v-if="item.isEdit">
              <a-input
                style="width: 150px"
                maxlength="6"
                v-model="item.category_name"
              ></a-input>
            </td>
            <td style="padding-left: 42px" v-else>{{ item.category_name }}</td>
            <td>
              <st-table-actions>
                <a @click="saveHandle(item, index)" v-if="item.isEdit">
                  保存
                </a>
                <a @click="editHandle(item, index)" v-else>
                  编辑
                </a>
                |
                <a @click="cancelHandle(item, index)" v-if="item.isEdit">
                  取消
                </a>
                <a @click="delHandle(item, index)" v-else>
                  删除
                </a>
              </st-table-actions>
            </td>
          </tr>
        </tbody>
      </st-form-table>
    </st-container>
  </st-modal>
</template>
<script>
import { ClassManageService } from './class-manage.service'
import { cloneDeep } from 'lodash-es'
export default {
  serviceInject() {
    return { classManageService: ClassManageService }
  },
  rxState() {
    return {
      loading: this.classManageService.loading$
    }
  },
  data() {
    return {
      show: false,
      tableData: [],
      oldTableData: [],
      loadingStatus: 1 // 1: 获取列表，2：新增分类，3删除分类，4编辑分类
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.loadingStatus = 1
      this.classManageService.getList().subscribe(res => {
        res.list.map(item => (item.isEdit = false))
        this.tableData = res.list
        this.oldTableData = cloneDeep(res.list)
      })
    },
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
        this.loadingStatus = 2
        this.classManageService
          .addClass({ category_name: item.category_name })
          .subscribe(res => {
            item.category_id = res.category_id
            item.isEdit = false
            this.oldTableData[index] = item
          })
      } else {
        this.loadingStatus = 4
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
      if (!item.category_name) {
        this.tableData.splice(index, 1)
        this.oldTableData.splice(index, 1)
      } else {
        item.isEdit = false
      }
    },
    delHandle(item, index) {
      this.loadingStatus = 3
      this.classManageService.delClass(item.category_id).subscribe(res => {
        this.getList()
      })
    }
  }
}
</script>

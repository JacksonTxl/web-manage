<template>
  <st-modal
    title='选择所属部门'
    @ok='save'
    :confirmLoading="loading.transferBrand"
    size="small"
    v-model='show'>
    <a-tree
      @select="onSelect"
      :treeData="departmentOptions">
      <template slot="title" slot-scope="{title}">
        title: {{title}}
      </template>
    </a-tree>
  </st-modal>
</template>
<script>
import { BatchImportService } from './batch-import.service'
import { StaffApi } from '@/api/v1/staff'
import { json2AntDesignTreeData } from '@/utils/json-2-tree-data'

export default {
  name: 'BindEntityCard',
  serviceInject() {
    return {
      staffApi: StaffApi,
      batchImportService: BatchImportService
    }
  },
  rxState() {
    return {
      loading: this.batchImportService.loading$
    }
  },
  props: {
    ids: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      show: false,
      departmentOptions: [],
      department_id: 0
    }
  },
  mounted() {
    this.getDepartmentList()
  },
  methods: {
    onSelect(keys) {
      this.department_id = keys.map(item => JSON.parse(item)['key'])[0]
    },
    save(e) {
      e.preventDefault()
      console.log('department_id', this.keys)
      this.batchImportService.transferBrand({
        ids: this.ids,
        department_id: this.department_id
      }).subscribe((res) => {
        this.show = false
        this.$emit('ok', {
          department_id: this.department_id
        })
      })
    },
    traverseTree(tree) {
      // 将ID转化为String UI组件需要
      return tree.map(item => {
        return item.children ? { name: item.name, children: this.traverseTree(item.children), id: item.id + '', count: item.count } : item
      })
    },
    getDepartmentList() {
      this.staffApi.getDepartmentList().subscribe(res => {
        this.departmentOptions = json2AntDesignTreeData(res.department, {
          keyName: 'id'
        })
        console.log(this.departmentOptions)
      })
    }
  }
}
</script>

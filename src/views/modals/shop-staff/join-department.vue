<template>
  <st-modal title="选择所属部门" size="small" v-model="show" @ok="onSubmit">
    <staff-info :staff="staff"></staff-info>
    <section>
      <st-form labelWidth="60px" :form="form" @submit="onSubmit" class="mg-t24">
        <st-form-item label="部门">
          <a-tree-select
          showSearch
          class="mg-r8"
          style="width: 160px"
          v-model="query.department_id"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请选择部门"
          allowClear
          treeDefaultExpandAll
          @change="onChange"
        >
          <a-tree-select-node
            v-for="item in departmentList"
            :value="item.id"
            :title="item.name"
            :key="item.id"
          >
            <a-tree-select-node
              v-for="item1 in item.children"
              :value="item1.id"
              :title="item1.name"
              :key="item1.id"
            >
              <a-tree-select-node
                v-for="item2 in item1.children"
                :value="item2.id"
                :title="item2.name"
                :key="item2.id"
              >
                <a-tree-select-node
                  v-for="item3 in item2.children"
                  :value="item3.id"
                  :title="item3.name"
                  :key="item3.id"
                >
                  <a-tree-select-node
                    v-for="item4 in item3.children"
                    :value="item4.id"
                    :title="item4.name"
                    :key="item4.id"
                  />>
                </a-tree-select-node>
              </a-tree-select-node>
            </a-tree-select-node>
          </a-tree-select-node>
        </a-tree-select>
        </st-form-item>
      </st-form>
    </section>
  </st-modal>
</template>
<script>
import StaffInfo from './staff-info'
import { JoinDepartmentService } from './join-department.service'
export default {
  serviceInject() {
    return {
      service: JoinDepartmentService
    }
  },
  rxState() {
    return {
      departmentList: this.service.departmentList$
    }
  },
  data() {
    return {
      show: false,
      form: this.$form.createForm(this),
      treeExpandedKeys: [],
      value: undefined
    }
  },
  components: {
    StaffInfo
  },
  methods: {
    onChange(value) {
      console.log(value)
      this.value = value
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.messageService.success({ content: '加入成功' })
          this.show = false
          this.$emit('change')
        }
      })
    }
  },
  mounted() {
    this.service.getStaffDepartmentList().subscribe()
  }
}
</script>

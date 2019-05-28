<template>
  <st-modal title="选择所属部门" size="small" v-model="show" @ok="onSubmit">
    <section>
      <st-form labelWidth="60px" :form="form" @submit="onSubmit" class="mg-t24">
        <st-form-item label="部门">
          <a-tree-select
            showSearch
            :value="value"
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            v-decorator="['department_id']"
            @change="onChange"
          >
            <a-tree-select-node value="parent 1" title="parent 1" key="0-1">
              <a-tree-select-node value="parent 1-0" title="parent 1-0" key="0-1-1">
                <a-tree-select-node :selectable="false" value="leaf1" title="my leaf" key="random"/>
                <a-tree-select-node value="leaf2" title="your leaf" key="random1"/>
              </a-tree-select-node>
              <a-tree-select-node value="parent 1-1" title="parent 1-1" key="random2">
                <a-tree-select-node value="sss" key="random3">
                  <b style="color: #08c" slot="title">sss</b>
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
import { MessageService } from '@/services/message.service'
export default {
  serviceInject() {
    return {
      messageService: MessageService
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
  }
}
</script>

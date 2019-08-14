<template>
  <st-modal title="添加标签" @ok="save" v-model="show" width="328px">
    <section>
      <a-row>
        <a-col :span="6">
          <span style="line-height: 32px;">标签名称</span>
        </a-col>
        <a-col :span="18">
          <a-input v-model="inputLable" />
        </a-col>
      </a-row>
    </section>
    <section></section>
  </st-modal>
</template>
<script>
import { NewLableService } from './new-lable.service'
export default {
  serviceInject() {
    return {
      Service: NewLableService
    }
  },
  components: {},
  name: 'newLable',
  props: {
    selectedRowData: {
      type: Array
    }
  },
  data() {
    return {
      show: false,
      inputLable: ''
    }
  },
  methods: {
    getLableList() {
      let self = this
      self.Service.setMemberLabel({ tag_name: self.inputLable }).subscribe(
        state => {
          self.show = false
          self.$emit('done', true)
        }
      )
    },
    save(e) {
      e.preventDefault()
      this.getLableList()
    }
  }
}
</script>

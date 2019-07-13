
<template>
  <div>
    <div v-for="(item,key,index) in value" :key="index">
      <div v-if="key !== 'arrData'">
        <st-t4 style="margin-bottom:16px">{{item.title}}</st-t4>
        <div style="display: flex; padding-bottom:16px;   flex-direction: row;    flex-wrap: wrap;">
          <st-button
            :style="{width:item.width+'px',marginBottom: '16px',marginRight:'8px'}"
            :class="value.arrData.indexOf(item1)>=0?'active':''"
            v-for="(item1,index) in item.value"
            :key="index"
            @click="selectionFun(item1)"
          >{{typeof value.info[item1] === 'object' ?value.info[item1].description :value.info[item1] }}</st-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageService } from '@/services/message.service'
export default {
  serviceInject() {
    return {
      messageService: MessageService
    }
  },
  model: {
    type: 'value',
    event: 'dataChangge'
  },
  props: {
    value: {
      type: Object
    },
    flag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    selectionFun(item) {
      let keyData = Object.keys(this.value)
      let self = this
      if (self.value['arrData'].indexOf(item) >= 0) {
        self.value['arrData'].splice(self.value['arrData'].indexOf(item), 1)
      } else {
        if (this.flag) {
          self.value['arrData'].unshift(item)
        } else {
          this.messageService.info({ content: '已超出条件限制' })
        }
      }
    }
  },
  mounted() {
    console.log(this.value)
  }
}
</script>

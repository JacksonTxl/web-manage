
<template>
  <div>
    <div v-for="(item,key,index) in value" :key="index">
      <div v-if="key !== 'arrData'">
        <st-t4 style="margin-bottom:16px">{{item.title}}</st-t4>
        <div
          style="display: flex;justify-content: space-between; padding-bottom:16px;   flex-direction: row;    flex-wrap: wrap;"
        >
          <st-button
            :style="{width:item.width+'px',marginBottom: '16px'}"
            :class="value.arrData.indexOf(item1)>=0?'active':''"
            v-for="(item1,index) in item.value"
            :key="index"
            @click="selectionFun(item1)"
          >{{item1}}</st-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
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
      keyData.map((key, index) => {
        if (key !== 'arrData' && key !== 'getData' && key !== 'info') {
          if (self.value[key].selectionData.indexOf(item) < 0) {
            if (this.flag) {
              self.value[key].value.map(valueData => {
                if (valueData.indexOf(item) >= 0) {
                  self.value[key].selectionData.unshift(item)
                  self.value['arrData'].unshift(item)
                }
              })
            }
          } else {
            self.value[key].selectionData.splice(
              self.value[key].selectionData.indexOf(item),
              1
            )
            self.value['arrData'].splice(self.value['arrData'].indexOf(item), 1)
          }
        }
      })
    }
  },
  mounted() {}
}
</script>

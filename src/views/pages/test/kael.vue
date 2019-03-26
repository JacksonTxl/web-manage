<template>
<section>

  <stCheckboxButtonGroup v-model="groupArr" :disabled="d" @change="groupChange">
    <stCheckboxButtonItem :value="0" :disabled="a1" :label="`Monday`" @change="itemChange">周一</stCheckboxButtonItem>
    <stCheckboxButtonItem :value="1" :disabled="a2">周二</stCheckboxButtonItem>
    <stCheckboxButtonItem :value="2" :disabled="a3">周三</stCheckboxButtonItem>
    <stCheckboxButtonItem :value="3" :disabled="a4">周四</stCheckboxButtonItem>
    <stCheckboxButtonItem :value="4" :disabled="a5">周五</stCheckboxButtonItem>
    <stCheckboxButtonItem :value="5" :disabled="a6">周六</stCheckboxButtonItem>
    <stCheckboxButtonItem :value="6" :disabled="a7">周日</stCheckboxButtonItem>
  </stCheckboxButtonGroup>
  <span>groupArr:</span>{{JSON.stringify(groupArr)}}
  <div>
    <a-button @click="d=!d">禁用checkboxGroup</a-button>
    <br>
    <a-button @click="a1=!a1">禁用周一</a-button>
    <br>
    <a-button @click="a2=!a2">禁用周二</a-button>
    <br>
    <a-button @click="a3=!a3">禁用周三</a-button>
    <br>
    <a-button @click="a4=!a4">禁用周四</a-button>
    <br>
    <a-button @click="a5=!a5">禁用周五</a-button>
    <br>
    <a-button @click="a6=!a6">禁用周六</a-button>
    <br>
    <a-button @click="a7=!a7">禁用周七</a-button>
    <br>
    <br>
  </div>
</section>
</template>
<script>
import stCheckboxButtonGroup from '@/views/components/st-checkbox-button-group.vue'
import stCheckboxButtonItem from '@/views/components/st-checkbox-button-item.vue'

export default {
  components: {
    stCheckboxButtonGroup,
    stCheckboxButtonItem
  },

  data() {
    return {
      groupArr: [0, 1, 2],
      d: false,
      a1: false,
      a2: false,
      a3: false,
      a4: false,
      a5: false,
      a6: false,
      a7: false
    }
  },
  methods: {
    itemChange(data) {
      // console.table({name:'item',data})
    },
    groupChange(data) {
      // console.table({name:'group',data})
    }
  },
  mounted() {
    setTimeout(i => {
      this.d = !this.d
      this.groupArr = [5, 6, 7, 8, 9, 10]
    }, 1000)
  }
}
</script>
<style lang="less" scoped>

</style>

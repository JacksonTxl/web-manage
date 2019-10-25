<template>
  <div class="st-tag" :class="['st-tag--' + type]">{{ labelText }}</div>
</template>

<script>
const tagMap = vm => {
  return {
    'role-staff': '普通员工',
    'role-saler': '会籍销售',
    'coach-personal': `私人${vm.$c('coach')}`,
    'coach-team': `团课${vm.$c('coach')}`,

    'shop-trial': '试运营',
    'shop-opening': '营业中',
    'shop-stop': '暂停营业',
    'shop-close': '已关店',
    'shop-holiday': '放假中',

    'shop-sign': '店招',
    'period-card': '期限卡',
    'number-card': '次卡',
    'deposit-card': '储值卡',
    'cabinet-available': '空闲',
    'cabinet-inuse': '使用中'
  }
}
export default {
  name: 'StTag',
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    tagMap,
    labelText() {
      return this.tagMap[this.type]
    }
  },
  created() {
    if (!this.type) {
      throw new Error(`[st-tag] need oneOf ${Object.keys(tagMap).join('|')}`)
    }
  }
}
</script>

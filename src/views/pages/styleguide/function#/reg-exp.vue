<template>
  <section class="sg-section">
    <h3>生成正则表达式</h3>
    4-16位中文、英文、数字正则（不含标点符号）：{{CN_EN_NUM_REGEXP}}
  </section>
</template>
<script>
import { RuleConfig } from '@/constants/rule'
export default {
  serviceInject() {
    return {
      ruleConfig: RuleConfig
    }
  },
  data() {
    return {
      CN_EN_NUM_REGEXP: this.ruleConfig.generateRule('4-16')
    }
  }
}
</script>

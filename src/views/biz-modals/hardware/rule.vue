<template>
  <st-modal
    title="次卡扣费规则设置"
    v-model="show"
    @ok="postGlobalSetting"
    size="small"
  >
    <a-radio-group v-model="charge_type">
      <a-radio
        :class="bPage('radio')"
        v-for="(item, index) in rule"
        :key="index"
        :value="item.value"
      >
        <st-input-number
          :min="1"
          :max="24"
          style="width:50px;"
          v-model="charge_value"
          v-if="item.value === PAY_RULE.HOUR"
        />
        {{ item.label }}
      </a-radio>
    </a-radio-group>
  </st-modal>
</template>
<script>
import { ruleOptions } from './area.config'
import { RuleService } from './rule.service'
import { PAY_RULE } from '@/constants/setting/hardware'

export default {
  serviceInject() {
    return {
      ruleService: RuleService
    }
  },
  rxState() {
    return {
      rule: this.ruleService.rule$
    }
  },
  bem: {
    bPage: 'modal-shop-rule'
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number
    },
    type: {
      type: Number
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      show: false,
      form,
      decorators,
      charge_type: '',
      charge_value: '',
      PAY_RULE
    }
  },
  created() {
    this.charge_value = this.value || 2
    this.charge_type = this.type
  },
  computed: {},
  methods: {
    postGlobalSetting() {
      return this.ruleService
        .postGlobalSetting({
          charge_type: this.charge_type,
          charge_value: this.charge_value
        })
        .subscribe(res => {
          this.show = false
          this.$emit('success')
        })
    }
  }
}
</script>

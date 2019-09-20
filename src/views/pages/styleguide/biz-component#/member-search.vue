<template>
  <section class="sg-section">
    <h3>member-search</h3>
    <p>必须使用st-form包裹该组件</p>
    <p>
      form表单默认需要用['member_id','mobile','member_name']字段
    </p>
    <st-form :form="form">
      <form-member-search
        :form="form"
        :decorators="decorators"
        type="transaction"
      ></form-member-search>
    </st-form>
  </section>
</template>
<script>
import FormMemberSearch from '@/views/biz-components/member-search/member-search'
import container from '@/container'
import { PatternService } from '@/services/pattern.service'

const ruleOptions = () => {
  const pattern = container.get(PatternService)
  return {
    member_name: {
      rules: [
        {
          validator: (filed, value, values) => {
            if (!value || !value.match(pattern.CN_EN_NUM_SPACE('1-15'))) {
              return '请输入会员姓名，支持格式长度1~15中英文'
            }
          }
        }
      ]
    },
    member_id: {
      rules: [
        {
          validator: (fileds, value, values) => {
            if (!value || value.length > 15) {
              return '请选择会员，查询条件长度15'
            }
          }
        }
      ]
    },
    mobile: {
      rules: [
        { required: true, message: '请输入手机号' },
        {
          pattern: pattern.MOBILE,
          message: '输入的手机号格式错误，请重新输入'
        }
      ]
    }
  }
}
export default {
  components: {
    FormMemberSearch
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators
    }
  }
}
</script>

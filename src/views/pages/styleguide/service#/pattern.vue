<template>
  <section class="sg-section">
    <h3>生成正则表达式</h3>
    4-16位中文、英文、数字正则（不含标点符号）：{{CN_EN_NUM_REGEXP}}
    <st-form :form="form" labelWidth="150px" labelGutter="16px" class="mg-t16">
      <st-form-item label="CN_EN_NUM" required>
        <a-input placeholder="4-10个字，中英文及数字" v-decorator="rules.cnEnNum"/>
      </st-form-item>
      <st-form-item label="CN_EN_NUM_SPACE" required>
        <a-input placeholder="1-15个字，中英文、数字、中间空格" v-decorator="rules.name"/>
      </st-form-item>
      <st-form-item label="EN_NUM" required>
        <a-input placeholder="4-10个字，英文及数字" v-decorator="rules.enNum"/>
      </st-form-item>
      <st-form-item label="CN" required>
        <a-input placeholder="1-15个字，中文" v-decorator="rules.cn"/>
      </st-form-item>
      <st-form-item label="EN" required>
        <a-input placeholder="2-6位，英文" v-decorator="rules.en"/>
      </st-form-item>
      <st-form-item label="CN_EN" required>
        <a-input placeholder="2-6位，中英文" v-decorator="rules.cnEn"/>
      </st-form-item>
      <st-form-item label="NUM" required>
        <a-input placeholder="2-6位，整数" v-decorator="rules.num"/>
      </st-form-item>
      <st-form-item label="MOBILE" required>
        <a-input placeholder="手机号" v-decorator="rules.mobile"/>
      </st-form-item>
      <st-form-item label="TEL" required>
        <a-input placeholder="手机号或座机号" v-decorator="rules.tel"/>
      </st-form-item>
      <st-form-item label="ID" required>
        <a-input placeholder="身份证" v-decorator="rules.id"/>
      </st-form-item>
      <st-form-item label="EMAIL" required>
        <a-input placeholder="邮箱" v-decorator="rules.email"/>
      </st-form-item>
      <st-form-item label="IMG" required>
        <a-input placeholder="图片类型，例如image/jpg" v-decorator="rules.img"/>
      </st-form-item>
      <st-form-item label="备注" required>
        <st-textarea
        :autosize="{ minRow: 2, maxRow: 5 }"
        v-decorator="rules.note"
        maxlength="100"
        />
      </st-form-item>
      <st-form-item label="CN_EN_NUM" required>
        <a-input-group>
          <a-input placeholder="4-10个字，中英文及数字" v-decorator="rules.cnEnNum"/>
          <a-input placeholder="邮箱" v-decorator="rules.email"/>
        </a-input-group>
      </st-form-item>
    </st-form>
    <div class="ta-c">
      <st-button type="primary" @click="onSubmit">保存</st-button>
    </div>
  </section>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { PatternService } from '@/services/pattern.service'
import { rules } from './pattern.config'

export default {
  serviceInject() {
    return {
      pattern: PatternService,
      message: MessageService
    }
  },
  data() {
    return {
      CN_EN_NUM_REGEXP: this.pattern.CN_EN_NUM('4-16'),
      form: this.$form.createForm(this)
    }
  },
  computed: {
    rules
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields().then(() => {
        this.message.success({
          content: 'success'
        })
      })
    }
  }
}
</script>

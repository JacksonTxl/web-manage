<template>
  <st-modal
    title="变更用户类型"
    @ok="save"
    v-model="show"
    wrapClassName="shop-binding-card"
  >
    <st-form :form="form" @submit="save" labelWidth="67px">
      <st-form-item label="姓名">
        <a-input
          disabled
          :value="info.member_name"
          placeholder="支持中英文,不超过15个字"
        ></a-input>
      </st-form-item>
      <st-form-item label="用户类型" required>
        <a-select @change="minorsChange" v-decorator="decorators.is_minors">
          <a-select-option
            v-for="(item, index) in minorsType"
            :value="item.value"
            :key="index"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item label="手机号" required v-if="!isShowParent">
        <a-input-group compact>
          <a-input
            style="width:70%"
            placeholder="请输入手机号"
            v-decorator="decorators.mobile"
          />
        </a-input-group>
      </st-form-item>
      <st-form-item label="家长手机号" v-if="isShowParent" required>
        <a-input-group compact>
          <a-input
            style="width:70%"
            placeholder="请输入手机号"
            v-decorator="decorators.parent_mobile"
          />
        </a-input-group>
      </st-form-item>
      <st-form-item label="家长姓名" v-if="isShowParent" required>
        <a-input
          placeholder="支持中英文,不超过15个字"
          v-decorator="decorators.parent_username"
        >
          <a-select
            v-decorator="decorators.parent_user_role"
            slot="addonAfter"
            style="width: 60px"
          >
            <a-select-option
              v-for="(item, index) in parentType"
              :value="item.value"
              :key="index"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-input>
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
import { ChangeUserTypeService } from './change-user-type.service'
import { ruleOptions } from './change-user-type.config'
import { PatternService } from '@/services/pattern.service'

export default {
  serviceInject() {
    return {
      service: ChangeUserTypeService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      minorsType: this.service.minorsType$,
      parentType: this.service.parentType$
    }
  },
  bem: {
    b: 'shop-binding-card'
  },
  props: {
    info: {
      type: Object
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false,
      isShowParent: false
    }
  },
  methods: {
    save(e) {
      e.preventDefault()
      this.form.validate().then(values => {
        let para = {}
        this.changeUserType(values)
      })
    },
    changeUserType(values) {
      values.id = this.info.member_id
      this.service.changeUserType(values).subscribe(state => {
        this.show = false
        this.$emit('success')
      })
    },
    minorsChange(val) {
      this.isShowParent = val
    }
  }
}
</script>

<template>
  <st-modal @ok="save" v-model="show" wrapClassName="shop-binding-card">
    <div slot="title">
      <span>
        变更用户类型
        <st-help-tooltip id="TSCMT001" />
      </span>
    </div>
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
            @change="getParentInfo"
            placeholder="请输入手机号"
            v-decorator="decorators.parent_mobile"
          />
        </a-input-group>
      </st-form-item>
      <st-form-item label="家长姓名" v-if="isShowParent" required>
        <a-input
          :disabled="isEditParent"
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
      isShowParent: false,
      isEditParent: false
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
    },
    getParentInfo(e) {
      if (e.target.value.length === 11) {
        this.getParentInfoByPhone(e.target.value)
      }
    },
    getParentInfoByPhone(phone) {
      let query = {
        mobile: phone
      }
      return this.service.getParentInfoByPhone(query).subscribe(res => {
        if (res.exists) {
          this.isEditParent = true
          this.form.setFieldsValue({
            parent_username: res.info.member_name
          })
        } else {
          this.isEditParent = false
          this.form.setFieldsValue({
            parent_username: ''
          })
        }
      })
    }
  }
}
</script>

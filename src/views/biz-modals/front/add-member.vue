<template>
  <st-modal
    title="添加用户"
    v-model="show"
    width="484px"
    wrapClassName="modal-front-add-member"
  >
    <st-form :form="form" labelWidth="66px">
      <st-form-item label="姓名" required>
        <a-input v-decorator="decorators.member_name" placeholder="请输入姓名">
          <a-select
            slot="addonAfter"
            style="width: 100px"
            v-decorator="decorators.is_minors"
            @change="onChangeModel"
          >
            <a-select-option :value="0">成年人</a-select-option>
            <a-select-option :value="1">未成年人</a-select-option>
          </a-select>
        </a-input>
      </st-form-item>
      <st-form-item label="手机号" required v-if="personModel === 0">
        <input-phone
          size="default"
          v-decorator="decorators.mobile"
          placeholder="请输入手机号"
        ></input-phone>
      </st-form-item>
      <st-form-item label="家长手机号" required v-if="personModel === 1">
        <input-phone
          size="default"
          v-decorator="decorators.parent_mobile"
          placeholder="请输入手机号"
          @change="onChangeParentMobile"
        ></input-phone>
      </st-form-item>
      <st-form-item label="家长姓名" required v-if="personModel === 1">
        <a-input
          v-decorator="decorators.parent_name"
          placeholder="请输入家长姓名"
          :disabled="disabledParentMobile"
        >
          <a-select
            slot="addonAfter"
            style="width: 80px"
            v-decorator="decorators.parent_user_role"
          >
            <a-select-option
              :value="item.value"
              v-for="(item, index) in parent_types"
              :key="index"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-input>
      </st-form-item>
    </st-form>
    <template slot="footer">
      <st-button @click="show = false">取消</st-button>
      <st-button @click="onSubmit" :loading="loading.addMember" type="primary">
        确定
      </st-button>
    </template>
  </st-modal>
</template>
<script>
import { AddMemberService } from './add-member.service'
import { PatternService } from '@/services/pattern.service'
import { ruleOptions } from './add-member.config'
import InputPhone from '@/views/biz-components/input-phone/input-phone'
export default {
  name: 'ModalShopFrontAddMember',
  bem: {
    add: 'modal-front-add-member'
  },
  serviceInject() {
    return {
      pattern: PatternService,
      addMemberService: AddMemberService
    }
  },
  rxState() {
    return {
      loading: this.addMemberService.loading$,
      parent_types: this.addMemberService.parent_types$
    }
  },
  components: {
    InputPhone
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false,
      personModel: 0,
      disabledParentMobile: false
    }
  },
  methods: {
    onChangeParentMobile(val) {
      setTimeout(() => {
        this.form.validate(['parent_mobile']).then(values => {
          val.mobile = val.phone
          this.addMemberService.getParentInfoByPhone(val).subscribe(res => {
            if (res.exists) {
              this.disabledParentMobile = true
              this.form.setFieldsValue({
                parent_name: res.info.member_name
              })
            } else {
              this.disabledParentMobile = false
              this.form.setFieldsValue({
                parent_name: ''
              })
            }
          })
        })
      })
    },
    onChangeModel(val) {
      this.personModel = val
    },
    onSubmit() {
      this.form.validate().then(values => {
        this.addMemberService
          .addMember({
            member_name: values.member_name,
            mobile: values.mobile ? values.mobile.phone : undefined,
            is_minors: values.is_minors,
            parent_username: values.parent_name,
            parent_mobile: values.parent_mobile
              ? values.parent_mobile.phone
              : undefined,
            parent_country_prefix: values.parent_mobile
              ? values.parent_mobile.code_id
              : undefined,
            parent_user_role: values.parent_user_role
          })
          .subscribe(res => {
            this.show = false
            this.$emit('success', {
              id: res.info.member_id,
              name: values.member_name
            })
          })
      })
    }
  }
}
</script>

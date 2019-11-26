<template>
  <st-modal title="成员更改" v-model="show" @cancel="show = false" size="small">
    <st-form :form="form" labelWidth="88px">
      <st-form-item labelGutter="12px" label="购卡人" required>
        <a-input
          :value="info.member_name + ' ' + info.mobile"
          :disabled="true"
          placeholder="请输入购卡人姓名"
        ></a-input>
      </st-form-item>
      <st-form-item labelGutter="12px" label="卡成员" required class="mg-b0">
        <add-card-member
          v-if="info && info.sale_range"
          v-model="list"
          :max="info.support_member_num"
          :type="info.sale_range.type"
        ></add-card-member>
      </st-form-item>
    </st-form>
    <template slot="footer">
      <st-button
        @click="changeCardMember"
        :loading="loading.changeCardMember"
        type="primary"
      >
        确认提交
      </st-button>
    </template>
  </st-modal>
</template>

<script>
import { ChangeMemberService } from './change-member.service'
import { cloneDeep } from 'lodash-es'
import { timer } from 'rxjs'
import { PatternService } from '@/services/pattern.service'
import { UserService } from '@/services/user.service'
import { ruleOptions } from './sale-cabinet.config'
import AddCardMember from '@/views/biz-components/add-card-member/add-card-member'
export default {
  name: 'ModalSoldDealChangeMember',
  bem: {
    sale: 'modal-sold-deal-sale'
  },
  components: {
    AddCardMember
  },
  serviceProviders() {
    return [ChangeMemberService]
  },
  serviceInject() {
    return {
      changeMemberService: ChangeMemberService,
      userService: UserService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.changeMemberService.loading$,
      info: this.changeMemberService.info$
    }
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false,
      list: []
    }
  },
  created() {
    this.changeMemberService.getInfo(this.id).subscribe(res => {
      this.list = this.info.card_member
    })
  },
  computed: {},
  methods: {
    changeCardMember() {
      this.changeMemberService
        .changeCardMember(this.id, {
          member_ids: this.list.map(item => {
            return item.id
          })
        })
        .subscribe(res => {
          this.show = false
          this.$emit('success')
        })
    }
  }
}
</script>

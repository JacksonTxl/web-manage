<template>
  <!-- auth.get && false -->
  <st-panel v-if="auth.get && info">
    <st-t2>配置支付方式</st-t2>
    <div class="mg-t24" v-for="item in info.list" :key="item.id">
      <a-row class="align-items-center">
        <a-col :span="20">
          <st-t4 class="mg-t4">{{ item.payment_name }}</st-t4>
          <div class="st-des mg-t4">{{ item.payment_description }}</div>
        </a-col>
        <a-col :span="4" class="ta-r">
          <template v-if="item.payment_type === 1">
            <span v-if="item.is_enable" class="color-primary">
              已配置
            </span>
            <span v-else>未配置</span>
          </template>
          <st-switch
            v-if="auth.edit && item.payment_type !== 1"
            v-model="item.is_enable"
            @change="onSwitchChange(item)"
          />
        </a-col>
      </a-row>
      <st-hr></st-hr>
    </div>
  </st-panel>
</template>
<script>
import { UserService } from '@/services/user.service'
import { MessageService } from '@/services/message.service'
import { PayTypeService } from './pay-type.service'
export default {
  serviceInject() {
    return {
      userService: UserService,
      payTypeService: PayTypeService
    }
  },
  rxState() {
    const payTypeService = this.payTypeService
    return {
      loading: payTypeService.loading$,
      info: payTypeService.info$,
      auth: payTypeService.auth$
    }
  },
  methods: {
    onSwitchChange(item) {
      const { id, is_enable, payment_type } = item
      this.payTypeService
        .update({
          id,
          is_enable,
          payment_type
        })
        .subscribe(this.onListChange)
    },
    onListChange() {
      this.$router.reload()
    }
  }
}
</script>

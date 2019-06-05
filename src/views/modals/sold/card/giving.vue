<template>
  <st-modal
  title="额度赠送"
  size="small"
  v-model="show"
  wrapClassName="modal-sold-card-giving">
    <div :class="giving('content')">
      <st-form labelWidth="75px">
        <div :class="giving('giving')">
          <st-form-item label="赠送额度" required>
            <st-input-number
            v-model="gift_quota"
            :max="99999.9"
            :float="true"
            placeholder="请输入赠送额度"
            v-decorator="['price',{rules:[{validator:price_validator}]}]">
              <a-select v-model="unit" slot="addonAfter" style="width: 60px">
                <a-select-option
                v-for="(item,index) in unitList"
                :value="item"
                :key="index" >{{sold.unit.value[item]}}</a-select-option>
              </a-select>
            </st-input-number>
          </st-form-item>
          <st-form-item label="备注" class="mg-b0">
            <a-textarea v-model="description" placeholder="请输入备注" :autosize="{ minRows: 4, maxRows: 6 }" />
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <st-button type="primary">确认提交</st-button>
    </template>
  </st-modal>
</template>

<script>
import { UserService } from '@/services/user.service'
export default {
  name: 'ModalSoldCardGiving',
  bem: {
    giving: 'modal-sold-card-giving'
  },
  serviceInject() {
    return {
      userService: UserService
    }
  },
  rxState() {
    return {
      sold: this.userService.soldEnums$
    }
  },
  computed: {
    unitList() {
      return Object.keys(this.sold.unit.value)
    }
  },
  data() {
    return {
      show: false,
      gift_quota: null,
      unit: 1,
      description: ''
    }
  },
  methods: {
    price_validator(rule, value, callback) {
      if (!value || +value === 0) {
        // eslint-disable-next-line
        callback('请输入剩余价值')
      } else {
        // eslint-disable-next-line
        callback()
      }
    }
  }
}
</script>

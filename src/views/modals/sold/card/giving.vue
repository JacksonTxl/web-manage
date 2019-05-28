<template>
  <st-modal
  title="额度赠送"
  size="small"
  v-model="show"
  wrapClassName="modal-sold-card-giving">
    <div :class="giving('content')">
      <a-row :class="giving('info')">
        <a-col :span="13">
          <st-info>
            <st-info-item label="选择个数">1</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form labelWidth="75px">
        <div :class="giving('giving')">
          <st-form-item label="赠送额度" required>
            <st-input-number
            :max="99999.9"
            :float="true"
            placeholder="请输入赠送额度"
            v-decorator="['price',{rules:[{validator:price_validator}]}]">
              <template slot="addonAfter">元</template>
            </st-input-number>
          </st-form-item>
          <st-form-item label="备注" class="mg-b0">
            <a-textarea placeholder="请输入备注" :autosize="{ minRows: 4, maxRows: 6 }" />
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
export default {
  name: 'ModalSoldCardGiving',
  bem: {
    giving: 'modal-sold-card-giving'
  },
  data() {
    return {
      show: false
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

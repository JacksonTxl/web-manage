<template>
  <st-modal
    title="额度赠送"
    size="small"
    v-model="show"
    wrapClassName="modal-sold-card-giving"
  >
    <div :class="giving('content')">
      <st-form :form="form" labelWidth="75px">
        <div :class="giving('giving')">
          <st-form-item label="赠送额度" required>
            <st-input-number
              :max="99999.9"
              placeholder="请输入赠送额度"
              v-decorator="[
                'price',
                { rules: [{ required: true, message: '请输入赠送额度' }] }
              ]"
            >
              <span slot="addonAfter">
                {{ type | enumFilter('sold.unit') }}
              </span>
            </st-input-number>
          </st-form-item>
          <st-form-item label="备注" class="mg-b0">
            <a-textarea
              v-model="description"
              placeholder="请输入备注"
              :autosize="{ minRows: 4, maxRows: 6 }"
            />
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <st-button type="primary" @click="onSubmit" :loading="loading.setGive">
        确认提交
      </st-button>
    </template>
  </st-modal>
</template>

<script>
import { GivingService } from './giving.service'
export default {
  name: 'ModalSoldCardGiving',
  bem: {
    giving: 'modal-sold-card-giving'
  },
  serviceInject() {
    return {
      givingService: GivingService
    }
  },
  rxState() {
    return {
      loading: this.givingService.loading$
    }
  },
  props: {
    id: {
      type: Array,
      required: true
    },
    type: {
      type: String || Number,
      required: true
    }
  },
  data() {
    return {
      show: false,
      form: this.$form.createForm(this),
      description: ''
    }
  },
  methods: {
    onSubmit() {
      this.form.validateFields((error, values) => {
        if (!error) {
          this.givingService
            .setGive({
              sold_card_ids: this.id,
              gift_quota: +values.price,
              description: this.description
            })
            .subscribe(res => {
              this.$emit('success')
              this.show = false
            })
        }
      })
    }
  }
}
</script>

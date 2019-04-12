<template>
  <a-modal
    class="modal-card-recovery-sell"
    title="会员卡恢复售卖"
    @ok="save"
    v-model="show"
    :footer="null"
  >
    <section>
      <div class="modal-card-recovery-sell-tips">
        <a-icon class="icon" type="exclamation-circle"/>注：仅恢复会员卡为可售卖状态，该会员卡需要重新上架至门店。
      </div>
      <div class="modal-card-recovery-sell-type-box">
        <span class="modal-card-recovery-sell-type">期限卡</span>会员卡名称
      </div>
      <div>
        <span style="margin-right:16px">支持售卖时间</span>
        <a-range-picker
          @change="onChange"
          :defaultValue="[moment('2015-06-06', dateFormat), moment('2015-06-06', dateFormat)]"
        />
      </div>
    </section>
    <section>
      <footer class="footer">
        <a-button class="cancel">取消</a-button>
        <a-button>恢复售卖</a-button>
        <!-- <a-popconfirm title="确认停售该会员卡?" @confirm="onDelete(record.id)">
          <a-button type="danger">恢复售卖</a-button>
        </a-popconfirm>-->
      </footer>
    </section>
  </a-modal>
</template>
<script>
import moment from 'moment'
export default {
  name: 'recoverySell',
  data() {
    return {
      show: false,
      form: this.$form.createForm(this),
      dateFormat: 'YYYY-MM-DD'
      // entityCardIdRule: ['entityCardId', { rules: [ { message: '请输入实体卡号' }] }],
      // physicalIdRule: ['physicalID', { rules: [{ message: '请录入物理ID' }] }]
    }
  },
  methods: {
    moment,
    save(e) {
      e.preventDefault()
    },
    onChange(date, dateString) {
      console.log(date, dateString)
    }
  }
}
</script>

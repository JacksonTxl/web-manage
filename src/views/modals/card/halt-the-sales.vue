<template>
  <a-modal class="modal-card-halt-the-sales" title="会员卡停售" @ok="save" v-model="show" :footer="null">
    <section>
      <div class="modal-card-halt-the-sales-tips">
        <a-icon class="icon" type="exclamation-circle"/>注：停止售卖会员卡，将自动下架在门店售卖的本会员卡；已购买会员卡的会员仍然享有该会员卡权益。
      </div>
      <div class="modal-card-halt-the-sales-type-box">
        <span class="modal-card-halt-the-sales-type">期限卡</span>会员卡名称
      </div>
      <div class="modal-card-halt-the-sales-info-box">
        <span class>当前上架门店（家）：{{info.shelf_shop}}</span>
        <span class="modal-card-halt-the-sales-notes">(不含已下架门店)</span>
      </div>
      <div class="modal-card-halt-the-sales-info-box">
        <span>当前有效卡数（张）：{{info.valid_card}}</span>
        <span class="modal-card-halt-the-sales-notes">(不含已过期卡)</span>
      </div>
      <div class="modal-card-halt-the-sales-stop-reason">
        <div class="ant-form-item-required stop-info">停售原因</div>
        <a-textarea placeholder="请输入停售原因" maxlength="300" :rows="4"/>
      </div>
    </section>
    <section>
      <footer class="footer">
        <a-button class="cancel">取消</a-button>
        <a-popconfirm title="确认停售该会员卡?" @confirm="onDelete(record.id)">
          <a-button type="danger">确认停售</a-button>
        </a-popconfirm>
      </footer>
    </section>
  </a-modal>
</template>
<script>
import { HaltTheSalesService } from './halt-the-sales.service'
export default {
  serviceInject() {
    return {
      aService: HaltTheSalesService
    }
  },
  name: 'haltTheSales',
  props: {
    a: {
      type: Number
    }
  },
  data() {
    return {
      show: false,
      form: this.$form.createForm(this),
      info: {
        shelf_shop: 0,
        valid_card: 0
      }
      // entityCardIdRule: ['entityCardId', { rules: [ { message: '请输入实体卡号' }] }],
      // physicalIdRule: ['physicalID', { rules: [{ message: '请录入物理ID' }] }]
    }
  },
  created() {
    let self = this
    this.getListInfo({ card_id: self.a })
  },
  methods: {
    getListInfo(data) {
      let self = this
      this.aService.getListInfo(data).subscribe(state => {
        console.log(123123, state.info)
        self.info = state.info
      })
    },
    save(e) {
      e.preventDefault()
    }
  }
}
</script>

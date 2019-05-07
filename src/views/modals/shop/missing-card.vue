<template>
  <st-modal title="遗失补卡" @ok="save" v-model="show" size="small">
    <section>
      <section>
        <st-form :form="form" @submit="save" labelWidth="55px">
          <st-info>
            <st-info-item label="姓名">孙乐乐</st-info-item>
            <st-info-item label="手机号">12345678901</st-info-item>
          </st-info>
          <st-form-item label="实体卡号">
            <a-input placeholder="输入实体卡号"/>
          </st-form-item>
          <div
            style="background:rgba(247,249,252,1);padding: 20px 20px 1px 20px;margin-bottom:20px"
          >
            <st-form :form="form" @submit="save" labelWidth="125px">
              <st-info>
                <st-info-item label="当前绑定的实体卡号">213456758987654</st-info-item>
                <st-info-item label="当前物理ID">12345678901</st-info-item>
              </st-info>
            </st-form>
          </div>
          <st-form-item label="物理ID">
            <a-input placeholder="请将实体卡置于读卡器上"/>
          </st-form-item>
          <st-form-item label="手续费">
            <st-input-number v-model="inputnumber2" :float="true" placeholder="请将实体卡置于读卡器上">
              <template slot="addonAfter">元</template>
            </st-input-number>
          </st-form-item>

          <st-form-item label="支付方式">
            <a-input placeholder="输入收款的支付方式"/>
          </st-form-item>
          <st-form-item label="收款人员">
            <a-input placeholder="输入收款的工作人员"/>
          </st-form-item>
        </st-form>
      </section>
    </section>
    <section>
      <!-- <footer class="footer">
        <a-button class="cancel" @click="show=false">取消</a-button>
        <a-button type="danger">确认停售</a-button>
      </footer>-->
    </section>
  </st-modal>
</template>
<script>
export default {
  name: 'missingCard',
  props: {},
  data() {
    return {
      show: false,
      form: {},
      inputnumber2: ''
    }
  },
  created() {},
  methods: {
    save(e) {
      e.preventDefault()
      console.log(e)
    }
  },
  watch: {}
}
</script>

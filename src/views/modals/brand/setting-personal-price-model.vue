<template>
  <st-modal
    title="私教课程定价设置"
    class="modal-price-model-setting"
    v-model="show"
    :bodyStyle="{ padding: 0 }"
  >
    <a-alert message="此操作将影响所有私教课程的定价，无法撤回，请谨慎操作" banner/>
    <st-form>
      <st-container type="2">
        <!-- 私教课程定价模式 -->
        <st-t4>私教课程定价模式</st-t4>
        <!-- 教练统一定价 -->
        <div class="mg-t4">教练统一定价<span class="st-des">（每一个私教课程，所授课的教练的课程售出价格一致）</span></div>
        <!-- 教练分级定价 -->
        <!-- <div>教练分级定价<span class="st-des">（教练分级定价每一个私教课程，按教练等级进行差异化定价）</span></div> -->
        <!-- 私教课程售卖模式 -->
        <st-t4 class="mg-t24">私教课程售卖模式</st-t4>
        <a-radio-group class="full-width">
          <st-container class="mg-t8">
            <a-row>
              <a-col :span="6"><a-radio :value="1">教练谈单</a-radio></a-col>
              <a-col :span="18" class="st-des">
                <div>1. 设置课程最低课时费和最高课时费</div>
                <div>2. 超过售卖价格范围时，不支持购买</div>
                <div>3. 不支持在用户端直接购买私教课</div>
              </a-col>
            </a-row>
          </st-container>
          <st-container class="mg-t8">
            <a-row>
              <a-col :span="6"><a-radio :value="2">统一标价</a-radio></a-col>
              <a-col :span="18" class="st-des">
                <div>1. 设置课程的固定课时费</div>
                <div>2. 支持用户在用户端在线购买</div>
              </a-col>
            </a-row>
          </st-container>
        </a-radio-group>
      </st-container>
      <!-- 私教课程定价设置 -->
      <st-container type="2">
        <st-t4>私教课程定价设置</st-t4>
        <st-container type="2" class="bg-gray mg-t8">
          <div class="st-des">统一标价切换至教练谈单，需要设置私教课程范围定价，设置后遇到小数位，则四舍五入，保留1位小数</div>
          <div class="mg-t8">
            <st-form-item class="mg-b0" labelWidth="70px" label="课程最低价">
              <a-radio-group>
                <a-radio :value="1">最低价</a-radio>
                <a-radio :value="2">最高价</a-radio>
              </a-radio-group>
            </st-form-item>
          </div>
        </st-container>
      </st-container>
    </st-form>
  </st-modal>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      form: this.$form.createForm(this)
    }
  }
}
</script>

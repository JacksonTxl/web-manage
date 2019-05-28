<template>
  <st-modal
  title="入场vip区域设置"
  size="small"
  v-model="show"
  wrapClassName="modal-sold-card-area">
    <div :class="area('content')">
      <a-row :class="area('info')">
        <a-col :span="13">
          <st-info>
            <st-info-item label="选择个数">1</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form labelWidth="75px">
        <div :class="area('area')">
          <st-form-item label="入场vip区域" class="mg-b0">
            <a-checkbox-group>
                <a-checkbox
                v-for="item in 3"
                :key="+item"
                :value="+item">选项{{item}}</a-checkbox>
              </a-checkbox-group>
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
  name: 'ModalSoldCardArea',
  bem: {
    area: 'modal-sold-card-area'
  },
  data() {
    return {
      show: false
    }
  }
}
</script>

<template>
  <st-modal
  title="冻结"
  size="small"
  v-model="show"
  wrapClassName="modal-sold-course-freeze">
    <div :class="freeze('content')">
      <a-row :class="freeze('info')">
        <a-col :span="24">
          <st-info>
            <st-info-item label="课程名称">{{courseName}}</st-info-item>
            <st-info-item label="剩余课时">{{courseNum}}</st-info-item>
            <st-info-item class="mgb-24" label="有效期">{{time}}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form labelWidth="72px">
        <div :class="freeze('freeze')">
          <st-form-item label="冻结日期" required>
            <div :class="freeze('time')">
              <a-form-item class="page-a-form mg-b0">
                <a-date-picker
                  style="width: 100%;"
                  format="YYYY-MM-DD"
                  placeholder="开始时间"
                  :showToday="false"
                />
              </a-form-item>
              <span>~</span>
              <a-form-item class="page-a-form mg-b0">
                <a-date-picker
                  format="YYYY-MM-DD"
                  placeholder="结束时间"
                  :showToday="false"
                />
              </a-form-item>
            </div>
          </st-form-item>
          <st-form-item label="手续费" required>
            <st-input-number :float="true">
              <template slot="addonAfter">元</template>
            </st-input-number>
          </st-form-item>
          <st-form-item label="支付方式" required>
            <a-select placeholder="选择支付方式">
              <a-select-option value="jack">Jack</a-select-option>
              <a-select-option value="lucy">Lucy</a-select-option>
            </a-select>
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
  name: 'ModalSoldCourseFreeze',
  bem: {
    freeze: 'modal-sold-course-freeze'
  },
  props: ['courseName', 'courseNum', 'time'],

  data() {
    return {
      show: false
    }
  },
  methods: {
    onOk() {
      this.$emit('ok')
      this.show = false
    }
  }
}
</script>

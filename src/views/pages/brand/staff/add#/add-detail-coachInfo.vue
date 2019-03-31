<template>
  <st-form>
    <!-- <div class="sg-box">block 拉到本块到1144px看对齐效果</div>
    <a-row :gutter="8">
      <a-col :span="1"
        v-for="n in 24"
        :key="n">
        <div class="sg-box">{{n}}</div>
      </a-col>
    </a-row> -->
    <a-row :gutter="8">
      <a-col :lg="10"
        :xs="22"
        :offset="1">
        <st-form-item label="从业时间">
          <a-input placeholder="填写点什么吧"></a-input>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :offset="1"
        :lg="22">
        <st-form-item
          label='身份'>
          <span slot="label">
            身份&nbsp;
            <a-tooltip placement="right"
              title="What do you want others to call you?">
              <st-icon type="anticon:question-circle-o" />
            </a-tooltip>
          </span>
          <a-checkbox-group v-model="checkbox1">
            <a-checkbox value="1">普通员工</a-checkbox>
            <a-checkbox value="2">会籍销售</a-checkbox>
            <a-checkbox value="3">团课教练</a-checkbox>
            <a-checkbox value="4">私人教练</a-checkbox>
            <a-checkbox value="5">游泳教练</a-checkbox>
          </a-checkbox-group>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10"
        :xs="22"
        :offset="1">
        <st-form-item label="专业认证">
          <a-input placeholder="填写点什么吧"></a-input>
        </st-form-item>
        <st-form-item label="个人经历">
          <a-input type="textarea"  :autosize="{ minRows: 10, maxRows: 16 }" placeholder="填写点什么吧"></a-input>
        </st-form-item>
        <st-form-item label="员工风采">
          <a-input placeholder="填写点什么吧"></a-input>
        </st-form-item>
        <st-form-item label="对外展示">
          <a-input placeholder="填写点什么吧"></a-input>
        </st-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="8" class="mg-t32">
      <a-col :offset="1">
        <st-form-item labelOffset>
          <st-button type="primary"
            >保存</st-button>
          <st-button class="mg-l16"
            @click="goNext"
            type="primary" ghost>保存并继续添加员工</st-button>
        </st-form-item>
      </a-col>
    </a-row>

  </st-form>
</template>
<script>
export default {
  name: 'StaffDetailCoachInfo',
  methods: {
    goNext() {
      let data = {
        isGoNext: true
      }
      this.$emit('goNext', data)
    },
    save() {

    }

  }
}
</script>

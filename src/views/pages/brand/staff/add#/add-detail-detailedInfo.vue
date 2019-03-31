<template>
  <st-form>
    <!-- <div class="sg-box">block 拉到本块到1144px看对齐效果</div> -->
    <!-- <a-row :gutter="8">
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
        <st-form-item label="毕业学校">
          <a-input placeholder="填写点什么吧"></a-input>
        </st-form-item>
        <st-form-item label="学历">
          <a-input placeholder="填写点什么吧"></a-input>
        </st-form-item>
        <st-form-item label="生日">
          <a-input placeholder="填写点什么吧"></a-input>
        </st-form-item>
        <st-form-item label="婚姻状况">
          <a-input placeholder="填写点什么吧"></a-input>
        </st-form-item>
      </a-col>
      <a-col :lg="10"
        :xs="22"
        :offset="1">
        <st-form-item label="毕业时间">
          <a-input placeholder="填写点什么吧"></a-input>
        </st-form-item>
        <st-form-item label="专业">
          <a-input placeholder="填写点什么吧"></a-input>
        </st-form-item>
        <st-form-item label="籍贯" >
          <a-input placeholder="填写点什么吧"></a-input>
        </st-form-item>
        <st-form-item label="子女状态" >
          <a-input placeholder="填写点什么吧"></a-input>
        </st-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="8" class="mg-t48">
      <a-col :lg="10"
        :xs="22"
        :offset="1">
        <st-form-item label="家庭住址">
          <a-input placeholder="填写点什么吧"></a-input>
        </st-form-item>
        <st-form-item label="详细住址">
          <a-input placeholder="填写点什么吧"></a-input>
        </st-form-item>
        <st-form-item label="备注">
          <a-input type="textarea"  :autosize="{ minRows: 10, maxRows: 16 }" placeholder="填写点什么吧"></a-input>
        </st-form-item>
      </a-col>
      <a-col :lg="10"
        :xs="22"
        :offset="2">
      </a-col>
    </a-row>

    <a-row :gutter="8" class="mg-t32">
      <a-col :offset="1">
        <st-form-item labelOffset>
          <st-button type="primary"
            ghost>保存</st-button>
          <st-button class="mg-l16"
            @click="goNext"
            type="primary">继续 填写</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
export default {
  name: 'StaffDetailDetailedInfo',
  methods: {
    goNext() {
      let data = {
        isGoNext: true
      }
      this.$emit('goNext', data)
    },
    save() {}
  }
}
</script>

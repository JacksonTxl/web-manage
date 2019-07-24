<template>
  <div :class="bComponent()">
    <div :class="bComponent('column')">
      <div :class="bComponent('text')">
        <slot name="rule"></slot>
      </div>
      <div :class="bComponent('text')">
        <slot name="role"></slot>
      </div>
      <div :class="bComponent('text')">
        <st-switch v-model="isShowContent"></st-switch>
      </div>
      <div :class="bComponent('text')">
        <st-switch v-model="isShowPre"></st-switch>
        <span class="color-primary mg-l12" v-show="isShowPre">预览</span>
      </div>
    </div>
    <div v-show="isShowContent">
      <div :class="bComponent('column')" v-show="!isShowEdit">
        <div
          :class="bComponent('text')"
          class="width75"
        >尊敬的会员，您已成功开通会员，会员有效期{开通时间}至{到期时间}，恭喜您成为我们的会员【短信签名】</div>
        <span class="color-primary" @click="showEdit">编辑</span>
      </div>
      <div :class="bComponent('column')" v-show="isShowEdit">
        <div :class="bComponent('text')" class="width75">
          发送内容
          <a-input style="width:250px" placeholder="请输入"></a-input>
          <span>{上课日期}{课程名称}，使用会员卡{会员卡名称}，剩余{余额+元/次/天}，</span>
          <a-input style="width:250px" placeholder="请输入"></a-input>
        </div>
        <div :class="bComponent('text')">
          <span class="color-primary mg-r12" @click="cancel">取消</span>
          <span class="color-primary">保存</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const componentName = 'notice-item'
export default {
  name: 'NoticeItem',
  bem: {
    bComponent: componentName
  },
  data() {
    return {
      isShowContent: 0,
      isShowPre: 0,
      isShowEdit: 0
    }
  },
  methods: {
    showEdit() {
      this.isShowEdit = 1
      //   this.isShowContent = 0
    },
    cancel() {
      this.isShowEdit = 0
    }
  }
}
</script>

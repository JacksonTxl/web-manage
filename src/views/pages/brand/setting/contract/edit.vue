<template>
  <div :class="bPage()">
    <aside :class="bSider()">
      <st-panel title="合同设置">
        <div slot="actions">
          <st-button type="primary">保存</st-button>
        </div>
        <st-t4>全局设置</st-t4>
        <st-form class="mg-t24" labelWidth="56px" labelGutter="16px">
          <st-form-item label="合同标题">
            <a-textarea placeholder="请输入衡量标准"></a-textarea>
          </st-form-item>
          <st-form-item label="合同编号">
            <span>10位编号</span>
            <a class="mg-l16" href="#">设置规则</a>
          </st-form-item>
          <st-form-item label="页面缩放" :class="bSider('form-item',{radio:true})">
            <a-radio-group>
              <a-radio value="1">默认</a-radio>
              <a-radio value="2">缩放</a-radio>
            </a-radio-group>
            <a-input-number :min="0" :max="100"></a-input-number>
            %
          </st-form-item>
          <st-form-item :class="bSider('form-item',{radio:true})" label="首行边距">
            <a-radio-group>
              <a-radio value="1">默认</a-radio>
              <a-radio value="2">缩放</a-radio>
            </a-radio-group>
            <a-input-number :min="0" :max="100"></a-input-number>
            mm
          </st-form-item>
          <st-t4>字段设置</st-t4>
          <st-form-item class="mg-t24" :class="bSider('form-item',{switch:true})" label="品牌logo">
            <a-switch></a-switch>
          </st-form-item>
          <st-form-item label="品牌名称" :class="bSider('form-item',{switch:true})">
            <a-switch></a-switch>
          </st-form-item>
          <st-form-item label="合同编号" :class="bSider('form-item',{switch:true})">
            <a-switch></a-switch>
          </st-form-item>
          <st-form-item label="会员人脸" :class="bSider('form-item',{switch:true})">
            <a-switch></a-switch>
          </st-form-item>
          <st-form-item label="会员姓名" :class="bSider('form-item',{switch:true})">
            <a-switch></a-switch>
          </st-form-item>
          <st-form-item label="会员手机" :class="bSider('form-item',{switch:true})">
            <a-switch></a-switch>
          </st-form-item>
          <st-form-item label="会员卡号" :class="bSider('form-item',{switch:true})">
            <a-switch></a-switch>
          </st-form-item>
          <st-form-item label="性别" :class="bSider('form-item',{switch:true})">
            <a-switch></a-switch>
          </st-form-item>
          <st-form-item label="身份证号" :class="bSider('form-item',{switch:true})">
            <a-switch></a-switch>
          </st-form-item>
          <st-form-item label="家庭地址" :class="bSider('form-item',{switch:true})">
            <a-switch></a-switch>
          </st-form-item>
          <st-form-item label="销售人员" :class="bSider('form-item',{switch:true})">
            <a-switch></a-switch>
          </st-form-item>
          <st-form-item label="备注" :class="bSider('form-item',{switch:true})">
            <a-switch></a-switch>
          </st-form-item>
          <st-form-item label="合同章程" :class="bSider('form-item',{switch:true})">
            <a href="#">编辑内容</a>
            <a-switch></a-switch>
          </st-form-item>
        </st-form>
      </st-panel>
    </aside>
    <main :class="bMain()">
      <st-panel title="合同预览">
        <contract-preview></contract-preview>
      </st-panel>
    </main>
  </div>
</template>

<script>
import ContractPreview from './edit#/preview.vue'
const pageName = 'page-setting-contract-edit'
export default {
  name: pageName,
  components: {
    ContractPreview
  },
  bem: {
    bPage: pageName,
    bSider: `${pageName}-sider`,
    bMain: `${pageName}-main`
  }
}
</script>

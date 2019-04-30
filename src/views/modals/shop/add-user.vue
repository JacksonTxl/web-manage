<template>
  <st-modal title="添加用户" :footer="null" v-model="show">
    <st-form :form="form" @submit="save" class="page-add-container" labelWidth="56px">
      <a-row :gutter="36">
        <a-col :lg="12">
          <st-form-item label="门店">
            <a-input placeholder/>
          </st-form-item>
          <st-form-item label="姓名" required>
            <a-input placeholder/>
          </st-form-item>
          <st-form-item label="手机号" required>
            <a-input-group compact>
              <a-select style="width: 35%;" :defaultValue="1">
                <a-select-option :value="1">+86</a-select-option>
              </a-select>
              <a-input style="width: 65%" placeholder="请输入手机号"/>
            </a-input-group>
          </st-form-item>
          <st-form-item label="来源渠道">
            <a-select placeholder="手动录入">
              <a-select-option :value="1">部门1</a-select-option>
              <a-select-option :value="2">部门2</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="来源方式">
            <a-select placeholder="外出获取">
              <a-select-option :value="1">部门1</a-select-option>
              <a-select-option :value="2">部门2</a-select-option>
            </a-select>
          </st-form-item>
        </a-col>
        <a-col :lg="12">
          <st-form-item>
            <st-image-upload width="168px" height="168px" :sizeLimit="2" placeholder="会员人脸信息"></st-image-upload>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row v-if="isShow">
        <a-col :lg="24">
          <st-hr></st-hr>
        </a-col>
      </a-row>
      <a-row :gutter="36" v-if="isShow">
        <a-col :lg="12">
          <st-form-item label="性别">
            <a-select placeholder="选择心别">
              <a-select-option :value="1">男</a-select-option>
              <a-select-option :value="2">女</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="职业">
            <a-input placeholder/>
          </st-form-item>
          <st-form-item label="收入水平">
            <a-input placeholder="输入收入水平"/>
          </st-form-item>
          <st-form-item label="证件类型">
            <a-select placeholder="选择证件类型">
              <a-select-option :value="1">身份证</a-select-option>
              <a-select-option :value="2">护照</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="证件号">
            <a-input placeholder="输入证件号"/>
          </st-form-item>
        </a-col>
        <a-col :lg="12">
          <st-form-item label="身高">
            <a-input placeholder>
              <div slot="addonAfter" class="st-form-item-unit">CM</div>
            </a-input>
          </st-form-item>
          <st-form-item label="体重">
            <a-input placeholder>
              <div slot="addonAfter" class="st-form-item-unit">KG</div>
            </a-input>
          </st-form-item>
          <st-form-item label="健身目标">
            <a-input placeholder="输入健身目标"/>
          </st-form-item>
          <st-form-item label="健身等级">
            <a-input placeholder="输入健身等级"/>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row >
        <a-col :lg="24">
          <st-hr></st-hr>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="13"></a-col>
        <a-col :lg="11">
          <st-form-item class="mg-l24" labelOffset>
            <span class="mg-r24 more" @click="onShowMore">更多信息</span>
            <st-button  class="mg-r8" type="primary" >取消</st-button>
            <st-button type="primary" ghost html-type="submit">提交</st-button>
          </st-form-item>
        </a-col>
      </a-row>
    </st-form>
  </st-modal>
</template>
<script>
export default {
  name: 'addUser',
  props: {},
  data() {
    return {
      form: this.$form.createForm(this),
      show: false,
      isShow: false
    }
  },
  created() {},
  methods: {
    onShowMore() {
      this.isShow = !this.isShow
    },
    save(e) {
      e.preventDefault()
      console.log(e)
    }
  },
  watch: {}
}
</script>

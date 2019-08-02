<template>
  <div :class="bPage()">
    <aside :class="bSider()">
      <st-panel title="合同设置">
        <div slot="actions">
          <st-button
            type="primary"
            :loading="loading.updateContract"
            @click="onUpdateContract"
          >
            保存
          </st-button>
        </div>
        <st-t4>全局设置</st-t4>
        <st-form class="mg-t24" labelWidth="56px" labelGutter="16px">
          <st-form-item label="合同标题">
            <a-textarea
              v-model="info.contract_title"
              placeholder="请输入衡量标准"
              maxlength="30"
            ></a-textarea>
          </st-form-item>
          <st-form-item label="合同编号">
            <a-input
              v-model="info.contract_prefix"
              :class="bSider('prefix')"
              placeholder="输入合同编号前缀"
            ></a-input>
            +8位随机编号
          </st-form-item>
          <!-- <st-form-item label="页面缩放" :class="bSider('form-item',{radio:true})">
            <a-radio-group @change="onPageTypeChange" v-model="info.contract_page_type">
              <a-radio :value="0">默认</a-radio>
              <a-radio :value="1">缩放</a-radio>
            </a-radio-group>
            <a-input-number
              :disabled="info.contract_page_type===0"
              v-model="info.contract_page"
              :min="0"
            ></a-input-number>
            <span class="mg-l4">%</span>
          </st-form-item> -->
          <st-form-item
            :class="bSider('form-item', { radio: true })"
            label="首行边距"
          >
            <a-radio-group
              @change="onPageMargetChange"
              v-model="info.contract_marget_type"
            >
              <a-radio :value="0">默认</a-radio>
              <a-radio :value="1">行距</a-radio>
            </a-radio-group>
            <a-input-number
              :disabled="info.contract_marget_type === 0"
              v-model="info.contract_marget"
              :min="0"
            ></a-input-number>
            <span class="mg-l4">mm</span>
          </st-form-item>
          <st-t4>字段设置</st-t4>
          <st-form-item
            class="mg-t24"
            :class="bSider('form-item', { switch: true })"
            label="品牌logo"
          >
            <st-switch v-model="info.is_brand_logo"></st-switch>
          </st-form-item>
          <st-form-item
            label="品牌名称"
            :class="bSider('form-item', { switch: true })"
          >
            <st-switch v-model="info.is_brand_name"></st-switch>
          </st-form-item>
          <st-form-item
            label="合同编号"
            :class="bSider('form-item', { switch: true })"
          >
            <st-switch v-model="info.is_contract_number"></st-switch>
          </st-form-item>
          <st-form-item
            label="会员人脸"
            :class="bSider('form-item', { switch: true })"
          >
            <st-switch v-model="info.is_member_pic"></st-switch>
          </st-form-item>
          <st-form-item
            label="会员姓名"
            :class="bSider('form-item', { switch: true })"
          >
            <st-switch v-model="info.is_member_name"></st-switch>
          </st-form-item>
          <st-form-item
            label="会员手机"
            :class="bSider('form-item', { switch: true })"
          >
            <st-switch v-model="info.is_member_mobile"></st-switch>
          </st-form-item>
          <st-form-item
            label="会员卡号"
            :class="bSider('form-item', { switch: true })"
          >
            <st-switch v-model="info.is_member_card"></st-switch>
          </st-form-item>
          <st-form-item
            label="性别"
            :class="bSider('form-item', { switch: true })"
          >
            <st-switch v-model="info.is_member_sex"></st-switch>
          </st-form-item>
          <st-form-item
            label="身份证号"
            :class="bSider('form-item', { switch: true })"
          >
            <st-switch v-model="info.is_member_id_card"></st-switch>
          </st-form-item>
          <st-form-item
            label="家庭地址"
            :class="bSider('form-item', { switch: true })"
          >
            <st-switch v-model="info.is_member_address"></st-switch>
          </st-form-item>
          <st-form-item
            label="销售人员"
            :class="bSider('form-item', { switch: true })"
          >
            <st-switch v-model="info.is_salesman_name"></st-switch>
          </st-form-item>
          <st-form-item
            label="备注"
            :class="bSider('form-item', { switch: true })"
          >
            <st-switch v-model="info.is_comment"></st-switch>
          </st-form-item>
          <st-form-item
            label="合同章程"
            :class="bSider('form-item', { switch: true })"
          >
            <a
              v-modal-link="{
                name: 'contract-constitution',
                props: {
                  id: info.id,
                  lawContent
                },
                on: {
                  done: onLawContentDone
                }
              }"
            >
              编辑内容
            </a>
            <st-switch v-model="info.is_law_content"></st-switch>
          </st-form-item>
        </st-form>
      </st-panel>
    </aside>
    <main :class="bMain()">
      <st-panel
        title="合同预览"
        :class="bMain('panel')"
        :loading="
          loading.getInfo || loading.getConstitutionInfo || loading.getCodeInfo
        "
      >
        <contract-preview
          :info="info"
          :codeDemo="codeDemo"
          :lawContent="lawContent"
        ></contract-preview>
      </st-panel>
    </main>
  </div>
</template>

<script>
import ContractPreview from './edit#/preview.vue'
import { EditService } from './edit.service.ts'
import { MessageService } from '@/services/message.service'
import { UserService } from '@/services/user.service'
const pageName = 'page-setting-contract-edit'
import ContractConstitution from '@/views/biz-modals/contract/constitution'
export default {
  name: pageName,
  components: {
    ContractPreview
  },
  bem: {
    bPage: pageName,
    bSider: `${pageName}-sider`,
    bMain: `${pageName}-main`
  },
  modals: {
    ContractConstitution
  },
  serviceInject() {
    return {
      editService: EditService,
      message: MessageService,
      user: UserService
    }
  },
  rxState() {
    /**
     * @type {EditService}
     */
    const edit = this.editService
    return {
      info: edit.info$,
      codeRules: edit.codeRules$,
      lawContent: edit.lawContent$,
      codeDemo: edit.codeDemo$,
      loading: edit.loading$,
      settingEnums: this.user.settingEnums$
    }
  },
  methods: {
    onCodeDone() {
      this.editService.getCodeInfo().subscribe()
    },
    onLawContentDone() {
      this.editService.getConstitutionInfo().subscribe()
    },
    onPageTypeChange(e) {
      if (e.target.value === 0) {
        this.info.contract_page = 100
      }
    },
    onPageMargetChange(e) {
      if (e.target.value === 0) {
        this.info.contract_marget = 20
      }
    },
    onUpdateContract() {
      this.editService.updateContract(this.info).subscribe(() => {
        this.message.success({
          content: '保存合同模版成功！'
        })
      })
    }
  }
}
</script>

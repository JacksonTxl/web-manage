<template>
  <st-panel app>
    <import-tip></import-tip>
    <a-row :class="bHeader()">
      <st-t2>
        导入用户
      </st-t2>
      <label>门店会员（潜在会员、正式会员、流失会员）</label>
    </a-row>
    <div :class="[bTable(), ' bottom-line']">
      <a-radio-group v-model="user" :class="bTable('right')">
        <div :class="bTable('content')">
          <a-radio :value="IMPORT.MEMBER_BASIC">
            用户基础信息
          </a-radio>
        </div>
        <div :class="bTable('content')">
          <a-radio :value="IMPORT.MEMBER_RECORD">
            用户跟进员工
          </a-radio>
          <label :class="bTable('desc')">
            门店维度下，跟进的教练或销售
          </label>
        </div>
      </a-radio-group>
    </div>
    <a-row class="page-footer">
      <st-button type="primary" class="download" @click="fetchDownloadFileInfo">
        下载模板
      </st-button>
      <st-button @click="uploadFile">上传文件</st-button>
    </a-row>
  </st-panel>
</template>
<script>
import { IMPORT } from '@/constants/setting/import'
import { ImportService } from '../import.service'
import BrandSettingImport from '@/views/biz-modals/brand/setting/import.vue'
import ImportTip from './components#/import-tip'
export default {
  bem: {
    bHeader: 'page-header',
    bTable: 'page-table-row'
  },
  modals: {
    BrandSettingImport
  },
  serviceInject() {
    return {
      importService: ImportService
    }
  },
  rxState() {
    return {}
  },
  components: {
    ImportTip
  },
  data() {
    return {
      IMPORT,
      user: IMPORT.MEMBER_BASIC
    }
  },
  methods: {
    fetchDownloadFileInfo() {
      this.importService.fetchDownloadFileInfo(this.user).subscribe(res => {
        window.open(res.url)
      })
    },
    uploadFile() {
      this.$modalRouter.push({
        name: 'brand-setting-import',
        props: {
          type: this.user
        },
        on: {
          success: () => {
            this.$router.push({
              path: '/brand/setting/import/record'
            })
          }
        }
      })
    }
  }
}
</script>

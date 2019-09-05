<template>
  <st-panel app>
    <import-tip></import-tip>
    <div :class="bHeader()">
      <st-t2>
        导入员工
      </st-t2>
      <label :class="bHeader('desc')">
        您需要预先设置以下内容，才能进行员工的导入～
      </label>
    </div>
    <div :class="bRow()">
      <p :class="bRow('content')">
        1）
        <router-link
          :to="{
            path: `/brand/staff/department`
          }"
          target="_blank"
        >
          设置
        </router-link>
        员工所在部门（必须预先设置）
      </p>
      <p :class="bRow('content')">
        2）
        <router-link
          :to="{
            path: `/brand/setting/general/coach-level`
          }"
          target="_blank"
        >
          设置
        </router-link>
        设置教练等级（若不需要导入教练等级，可忽略）
      </p>
      <p :class="bRow('content')">
        3）
        <router-link
          :to="{
            path: `/brand/finance/salary/template/basic`
          }"
          target="_blank"
        >
          设置
        </router-link>
        员工薪资模板（若不需要导入薪资模板，可忽略）
      </p>
    </div>
    <div class="page-footer">
      <st-button type="primary" class="download" @click="fetchDownloadFileInfo">
        下载模板
      </st-button>
      <st-button @click="uploadFile">上传文件</st-button>
    </div>
  </st-panel>
</template>
<script>
import { ImportService } from '../import.service'
import BrandSettingImport from '@/views/biz-modals/brand/setting/import.vue'
import { IMPORT } from '@/constants/setting/import'
import ImportTip from './components#/import-tip'
export default {
  bem: {
    bHeader: 'page-header',
    bRow: 'row'
  },
  serviceInject() {
    return {
      importService: ImportService
    }
  },
  rxState() {
    return {}
  },
  modals: {
    BrandSettingImport
  },
  components: {
    ImportTip
  },
  data() {
    return {
      IMPORT
    }
  },
  methods: {
    fetchDownloadFileInfo() {
      this.importService
        .fetchDownloadFileInfo(this.IMPORT.STAFF)
        .subscribe(res => {
          window.open(res.url)
        })
    },
    uploadFile() {
      this.$modalRouter.push({
        name: 'brand-setting-import',
        props: {
          type: this.IMPORT.STAFF
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

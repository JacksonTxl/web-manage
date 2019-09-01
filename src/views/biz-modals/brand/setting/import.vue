<template>
  <st-modal
    title="导入"
    size="small"
    v-model="show"
    wrapClassName="modal-brand-setting-import"
    @ok="onSubmit"
  >
    <section :class="b()">
      <label :class="b('tip')">数据处理方式:</label>
      <div :class="b('content')">
        <p>新增并覆盖原始数据</p>
        <p>针对不重复的数据，进行新增</p>
        <p>针对重复数据，进行覆盖</p>
      </div>
      <div :class="b('file')">
        <a-upload
          v-if="!isLoading"
          :showUploadList="false"
          :customRequest="upload"
          :multiple="false"
          accept="xlsx"
        >
          <label :class="b('file-btn')">选择文件</label>
        </a-upload>
        <div :class="b('progress')" v-else>
          <div
            v-if="isLoading && progress != 100"
            :class="bProgress('bg')"
            :style="{ width: `${progress}%` }"
          ></div>
          <label :class="bProgress('file-name')" v-if="fileList.length > 0">
            {{ fileList[0].file_name }}
          </label>
          <label
            :class="bProgress('reselect')"
            v-if="fileList.length > 0"
            @click="reSelect"
          >
            重新选择
          </label>
        </div>
      </div>
    </section>
  </st-modal>
</template>

<script>
import { ImportService } from './import.service'
import { MessageService } from '@/services/message.service'
import { OssService } from '@/services/oss.service'
import { IMPORT } from '@/constants/setting/import'
export default {
  name: 'ModalBrandSettingImport',
  bem: {
    b: 'modal-brand-setting-import',
    bProgress: 'modal-brand-setting-import__progress'
  },
  serviceInject() {
    return {
      importService: ImportService,
      messageService: MessageService,
      ossService: OssService
    }
  },
  rxState() {
    return {}
  },
  props: {
    type: {
      type: Number,
      default: IMPORT.MEMBER_BASIC
    },
    shopId: {
      type: Number
    }
  },
  data() {
    return {
      IMPORT,
      show: false,
      isLoading: false,
      progress: 0,
      isPrivate: true,
      fileList: [],
      fileType: 'xlsx, csv'
    }
  },
  created() {},
  methods: {
    onSubmit() {
      const params = {
        file_save_type: this.IMPORT.FILE_SAVE_TYPE,
        file_source: this.fileList[0].file_key,
        input_type: this.type,
        shop_id: this.shopId || undefined
      }
      this.importService.uploadFile(params).subscribe(res => {
        this.show = false
        this.$emit('success')
      })
    },
    reSelect() {
      this.fileList = []
      this.isLoading = false
    },
    upload(data) {
      const fileCheckRet = this.fileCheck(data)
      if (!fileCheckRet.isValid) {
        this.messageService.error({ content: fileCheckRet.msg })
        return
      }
      this.isLoading = true
      // 业务
      this.ossService
        .put({
          business: 'excel',
          isPrivate: this.isPrivate,
          file: data.file,
          uploadProgress: e => {
            this.progress = parseInt((e.loaded / e.total) * 100)
          }
        })
        .subscribe({
          next: val => {
            this.fileList.push({
              file_key: val.fileKey,
              file_name: val.fileName,
              file_host: val.host,
              file_url: val.url
            })
          },
          error: val => {
            this.messageService.error({ content: `Error ${val.message}` })
            this.isLoading = false
          }
        })
    },
    fileCheck(data) {
      const { size, name } = data.file
      const { sizeLimit, fileType } = this
      if (!fileType.includes(name.split('.')[1])) {
        return {
          isValid: false,
          msg: `请上传${fileType}格式的文件`
        }
      }
      return {
        isValid: true
      }
    }
  }
}
</script>

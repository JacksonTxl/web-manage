<template>
  <div>
    <h3>弹出层类</h3>
    <p>
      vue-modal-router 文档请查看
      <a
        target="_blank"
        href="https://www.npmjs.com/package/vue-modal-router"
      >vue-modal-router</a>
    </p>
    <p>这里的模态窗名称同modals文件夹下的模态窗路径</p>
    <section class="sg-app-content">
      <st-panel>
        <modal-link tag="st-button" :to="{ name: 'test-sg',on:{ok:onOk} }">使用组件test-sg</modal-link>
        <button class="mg-l16" @click="onCustomClick">使用api</button>
      </st-panel>
    </section>

    <h3>常用业务模态窗</h3>
    <section class="sg-app-content">
      <st-panel>
        <h3>裁剪图片modal</h3>
        <div label="店招" v-viewer="{ url: 'data-src' }">
            <a-upload
              listType="picture-card"
              :class="{'page-show-image':imageUrl}"
              :showUploadList="false"
              :disabled="imageUrl!==''"
              :customRequest="uploadCrop"
            >
              <div class="page-image" v-if="imageUrl">
                <div class="page-image-button">
                  <span @click="removeImage">删除</span>
                </div>
                <img :dataSrc="imageUrl" width="240" height="135" :src="imageUrl" alt="店招">
              </div>
              <div v-else>
                <a-icon :type="loading ? 'loading' : 'plus'"/>
              </div>
            </a-upload>
          </div>
      </st-panel>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: '',
      loading: false
    }
  },
  methods: {
    removeImage() {
      this.imageUrl = ''
    },
    async uploadCrop(data) {
      let that = this
      let image = await this.fileReader(data.file)
      this.$modalRouter.push({
        name: 'image-cropper',
        props: {
          title: '裁剪图片modal',
          image,
          aspectRatioH: 9,
          aspectRatioW: 16
        },
        on: {
          cancel() {
            console.log('cancel')
          },
          async ok(data) {
            that.imageUrl = await that.fileReader(data.file)
          }
        }
      })
    },
    fileReader(img) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => {
          resolve(reader.result)
        })
        reader.readAsDataURL(img)
      })
    },
    onOk() {
      console.log('接受ok事件')
    },
    onCustomClick() {
      this.$modalRouter.push({
        name: 'test-sg',
        on: {
          ok: this.onOk
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
// upload
.ant-upload.ant-upload-select-picture-card {
  width: 240px;
  height: 135px;
}
.ant-upload.ant-upload-select-picture-card > .ant-upload {
  padding: 18px;
}
.page-show-image .ant-upload.ant-upload-select-picture-card > .ant-upload {
  padding: 0;
}
.page-show-image .ant-upload.ant-upload-select-picture-card {
  border-style: solid;
  overflow: hidden;
}
.page-image {
  position: relative;
  &-button {
    position: absolute;
    width: 100%;
    padding: 6px 12px;
    bottom: 0;
    left: 0;
    background:rgba(0,0,0,.45);
    text-align: right;
    span {
      font-size:12px;
      line-height: 20px;
      color: rgba(255,255,255,.65);
    }
  }
  img {
    object-fit: cover;
  }
}
.page-upload-text:nth-of-type(1) {
  font-size:14px;
  line-height: 22px;
  color: #ccc;
  margin: 20px 0 10px;
}
.page-upload-text:nth-of-type(2) {
  font-size:12px;
  line-height: 17px;
  color: #eee;
}
</style>

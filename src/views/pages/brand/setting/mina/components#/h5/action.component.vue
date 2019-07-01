<template>
  <div :class="action()">
    <a-row :gutter="12">
      <a-col :span="6" v-for="(li, index) in list" :key="index">
        <div :class="action('box')">
          <st-image-upload @change="imageUploadChange($event,index)" width="72px" height="72px" :list="li.fileList"
            :sizeLimit="2" placeholder="上传照片" :numLimit="1"></st-image-upload>
          <div :class="action('box-title')">
            <a-input placeholder="请输入功能名称" v-model="li.title" />
            <div>跳转：{{li.link}}</div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  bem: {
    action: 'action-component'
  },
  data() {
    return {
      list: [{
        image_url: '',
        title: '',
        link: ''
      },
      {
        image_url: '',
        title: '',
        link: ''
      },
      {
        image_url: '',
        title: '',
        link: ''
      },
      {
        image_url: '',
        title: '',
        link: ''
      }
      ]
    }
  },
  methods: {
    imageUploadChange(e, index) {
      let url = ''
      if (e.length) url = e[0].image_key
      this.list[index].image_url = url
    }
  }
}

</script>

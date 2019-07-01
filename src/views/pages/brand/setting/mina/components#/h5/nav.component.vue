<template>
  <div :class="nav()">
    <a-row :gutter="12">
      <a-col :span="6" v-for="(li, index) in list" :key="index">
        <div :class="nav('box')">
          <st-form-item label="功能名称">
            <a-input placeholder="请输入功能名称" v-model="li.name"></a-input>
        </st-form-item>
        <div :class="nav('upload-box')">
          <st-image-upload @change="imageUploadChange($event,index)" width="72px" height="72px" :list="li.fileList"
            :sizeLimit="2" placeholder="上传照片" :numLimit="1"></st-image-upload>
            <st-image-upload @change="selectedImageUploadChange($event,index)" width="72px" height="72px" :list="li.fileList"
            :sizeLimit="2" placeholder="上传照片" :numLimit="1"></st-image-upload>
            </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  bem: {
    nav: 'nav-component'
  },
  data() {
    return {
      list: [{
        icon: '',
        selected_icon: '',
        name: ''
      },
      {
        icon: '',
        selected_icon: '',
        name: ''
      },
      {
        icon: '',
        selected_icon: '',
        name: ''
      }
      ]
    }
  },
  methods: {
    imageUploadChange(e, index) {
      let url = ''
      if (e.length) url = e[0].image_key
      this.list[index].icon = url
    },
    selectedImageUploadChange(e, index) {
      let url = ''
      if (e.length) url = e[0].image_key
      this.list[index].selectedIcon = url
    }
  }
}

</script>

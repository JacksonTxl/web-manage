<template>
  <section class="sg-section">
    <h3>st-image-upload</h3>
    <p>
      [sizeLimit] 自定义图片大小m
      [numLimit] 最多啊上传图片数量
      [placeholder] 自定义文字
      支持图片裁剪，裁剪选项，自定义图片filter,自定义操作区，更多参数参看st-image-upload.vue
    </p>
    <p class="mg-t8">默认样式 单图文件大小2m</p>
    <st-image-upload :list="list1" :sizeLimit="2"></st-image-upload>
    {{list1}}
    <p class="mg-t8">自定义文字</p>
    <st-image-upload :list="list2" placeholder="请上传图片"></st-image-upload>
    {{list2}}
    <p class="mg-t8">使用裁剪 可传入cropper模态窗选项和cropperjs选项参数</p>
    <st-image-upload
      :list="list3"
      placeholder="带裁剪的上传"
      :cropperModal="{title:'标题',cropper:{aspectRatio:1/1}}"
    ></st-image-upload>
    {{list3}}
    <p class="mg-t8">自定义上传区样式</p>
    <st-image-upload :list="list4">
      <st-icon type="wechat"></st-icon>请上传拉
    </st-image-upload>
    {{list4}}
    <p class="mg-t8">在已上传图片容器添加元素</p>
    <st-image-upload :list="list5">
      <span slot="item-extra" slot-scope="{item,index}">这是extra内容 {{item}} {{index}}</span>
    </st-image-upload>
    {{list5}}
    <p class="mg-t8">自定义操作区内容</p>
    <st-image-upload :list="list6">
      <template slot="actions">
        <span class="action">设为店招</span>
        <span class="action">招聘</span>
      </template>
    </st-image-upload>
    {{list6}}
  </section>
</template>

<script>
export default {
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list5: [
        { image_id: '123', image_key: 'image/20190411/nmdNRC_cVqWSjCNg.png' }
      ],
      list6: [
        { image_id: '123', image_key: 'image/20190411/nmdNRC_cVqWSjCNg.png' }
      ]
    }
  }
}
</script>

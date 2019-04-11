<template>
  <div>
    <st-t3>1 默认样式 单图文件大小2m</st-t3>
    <st-image-upload :list="list1" :sizeLimit="2"></st-image-upload>
    <st-t3>2 自定义文字</st-t3>
    <st-image-upload :list="list2" placeholder="请上传图片"></st-image-upload>
    <st-t3>3 使用裁剪 可传入cropper模态窗选项和cropperjs选项参数</st-t3>
    <st-image-upload
      :list="list3"
      placeholder="带裁剪的上传"
      :cropperModal="{title:'标题',cropper:{aspectRatio:1/1}}"
    ></st-image-upload>
    <st-t3>4 自定义上传区样式</st-t3>
    <st-image-upload :list="list4">
      <st-icon type="wechat"></st-icon>请上传拉
    </st-image-upload>
    <st-t3>5 在已上传图片容器添加元素</st-t3>
    <st-image-upload :list="list5">
      <span slot="item-extra" slot-scope="{item,index}">这是extra内容 {{item}} {{index}}</span>
    </st-image-upload>
    <st-t3>6 自定义操作区内容</st-t3>
    <st-image-upload :list="list6">
      <template slot="actions">
        <span class="action">设为店招</span>
        <span class="action">招聘</span>
      </template>
    </st-image-upload>
  </div>
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
        { file_id: '123', file_key: 'image/20190411/nmdNRC_cVqWSjCNg.png' }
      ],
      list6: [
        { file_id: '123', file_key: 'image/20190411/nmdNRC_cVqWSjCNg.png' }
      ]
    }
  }
}
</script>

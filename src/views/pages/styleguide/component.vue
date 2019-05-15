<template>
  <div>
    <h2>Component 组件类</h2>
    <p>组件具体的使用方式还是需要查看@/views/components/*.vue 对应文件查看最新的api，这里只是列举常用选项</p>

    <title-demo id="title"></title-demo>
    <button-demo id="button"></button-demo>
    <input-number-demo id="input-number"></input-number-demo>
    <switch-demo id="switch"></switch-demo>
    <icon-demo id="icon"></icon-demo>
    <hr-demo id="hr"></hr-demo>
    <checkbox-button-demo id="checkbox-button"></checkbox-button-demo>
    <checkbox-facility-demo id="checkbox-facility"></checkbox-facility-demo>
    <modal-demo id="modal"></modal-demo>
    <more-dropdown-demo id="more-dropdown"></more-dropdown-demo>
    <help-popover-demo id="help-popover"></help-popover-demo>
    <help-tooltip-demo id="help-tooltip"></help-tooltip-demo>
    <tag-demo id="tag"></tag-demo>
    <region-cascader-demo id="region-cascader"></region-cascader-demo>
    <container-demo id="container"></container-demo>
    <panel-demo id="panel"></panel-demo>
    <image-upload-demo id="image-upload"></image-upload-demo>
    <info-demo id="info"></info-demo>
    <form-demo id="form"></form-demo>
    <table-demo id="table"></table-demo>
    <form-table-demo id="form-table"></form-table-demo>
    <shop-hour-picker-demo id="shop-hour-picker"></shop-hour-picker-demo>
    <pagination-demo id="pagination"/>
    <page-route-nav-demo id="page-route-nav"/>
    <textarea-demo id="textarea"/>
  </div>
</template>

<script>
import demoComponents from './component#/index'

export default {
  components: demoComponents
}
</script>

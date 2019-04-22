<template>
  <div>
    <h2>Component 组件类</h2>
    <title-demo id="title"></title-demo>
    <button-demo id="button"></button-demo>
    <switch-demo id="switch"></switch-demo>
    <icon-demo id="icon"></icon-demo>
    <hr-demo id="hr"></hr-demo>
    <checkbox-button-demo id="checkbox-button"></checkbox-button-demo>
    <checkbox-facility-demo id="checkbox-facility"></checkbox-facility-demo>
    <more-dropdown-demo id="more-dropdown"></more-dropdown-demo>
    <help-popover-demo id="help-popover"></help-popover-demo>
    <tag-demo id="tag"></tag-demo>
    <region-cascader-demo id='region-cascader'></region-cascader-demo>
    <container-demo id="container"></container-demo>
    <panel-demo id="panel"></panel-demo>
    <image-upload-demo id='image-upload'></image-upload-demo>
    <info-demo id="info"></info-demo>
    <form-demo id='form'></form-demo>
    <table-demo id="table"></table-demo>
    <form-table-demo id="form-table"></form-table-demo>
    <shop-hour-picker-demo id='shop-hour-picker'></shop-hour-picker-demo>
  </div>
</template>

<script>
import demoComponents from './component#/index'

export default {
  components: demoComponents
}
</script>

<template>
  <div :class="course()">
    <st-form :form="form">
        <div :class="course('bdbox')">
      <st-t3 class="mg-y32">推荐私教课</st-t3>
      <st-form-item label="模块名称">
        <a-input placeholder="请输入模块名称"></a-input>
      </st-form-item>
      <st-form-item label="展示课程">
        <a-select placeholder="请输入展示课程">
          <a-select-option value="1">全部私教课</a-select-option>
          <a-select-option value="2">展示可约天内排定私教课</a-select-option>
          <a-select-option value="3">展示热门私教课</a-select-option>
        </a-select>
      </st-form-item>
      </div>
      <div :class="course('bdbox')">
      <st-t3 class="mg-y32">推荐团体课</st-t3>
      <st-form-item label="模块名称">
        <a-input placeholder="请输入模块名称"></a-input>
      </st-form-item>
      <st-form-item label="展示课程">
        <a-select placeholder="请输入展示课程">
          <a-select-option value="2">展示可约天内的团体课</a-select-option>
          <a-select-option value="3">展示热门团体课</a-select-option>
        </a-select>
      </st-form-item>
      </div>
      <div :class="course('bdbox')">
      <st-t3 class="mg-y32">推荐课程包</st-t3>
      <st-form-item label="模块名称">
        <a-input placeholder="请输入模块名称"></a-input>
      </st-form-item>
      <st-form-item label="展示课程">
        <a-select placeholder="请输入展示课程">
          <a-select-option value="1">全部课程包</a-select-option>
          <a-select-option value="2">展示热销课程包</a-select-option>
          <a-select-option value="3">展示最新课程包</a-select-option>
        </a-select>
      </st-form-item>
      </div>
    </st-form>
  </div>
</template>
<script>
export default {
  bem: {
    course: 'course-component'
  },
  data() {
    return {
      form: {
        module_title: '',
        staff_id_list: [{
          name: '发放'
        }, {
          name: '大d'
        }, {
          name: '骄傲连'
        }]
      }
    }
  },
  methods: {}
}

</script>

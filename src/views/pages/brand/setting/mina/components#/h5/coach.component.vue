<template>
  <div :class="action()">
    <st-form-item label="模块名称">
      <a-input placeholder="请输入模块名称" v-model="form.module_title" />
    </st-form-item>
    <st-form-item label="展示教练">
      <a-row :gutter="12">
        <a-col :span="4">
            <div :class="action('addbox')">
                + 添加教练
            </div>
        </a-col>
        <a-col :span="4" v-for="(li, index) in form.staff_id_list" :key="index">
          <div :class="action('box')">
            <img :src="li.img">
              <div>{{li.name}}</div>
          </div>
        </a-col>
      </a-row>
    </st-form-item>
  </div>
</template>
<script>
export default {
  bem: {
    action: 'coach-component'
  },
  data() {
    return {
      form: {
        module_title: '',
        staff_id_list: [{ name: '发放' }, { name: '大d' }, { name: '骄傲连' }]
      }
    }
  },
  methods: {
  }
}

</script>

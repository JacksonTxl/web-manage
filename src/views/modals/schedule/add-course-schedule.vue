<template>
  <st-modal title="新增课程排期" @ok="save" v-model="show" size="484px">
    <st-form :form="form">
      <st-form-item label="时间" required>
        <a-date-picker showTime @change="onChange" />
      </st-form-item>
      <st-form-item label="课程" required>
        <a-select @change="onChange" />
      </st-form-item>
      <st-form-item label="教练" required>
        <a-select @change="onChange" />
      </st-form-item>
      <st-form-item label="场地" required>
        <a-select @change="onChange" />
      </st-form-item>
      <st-form-item label="人数" required>
        <a-input-search @change="onChange"> <a-button slot="enterButton">人</a-button> </a-input-search>
      </st-form-item>
      <st-form-item label="课时费" required>
        <a-input-search @change="onChange"> <a-button slot="enterButton">元/节</a-button> </a-input-search>
      </st-form-item>
      <st-form-item label="课时费" required>
        <a-input-search @change="onChange"> <a-button slot="enterButton">元/节</a-button> </a-input-search>
      </st-form-item>
      <a-row>
        <a-col
          :span="24"
          :style="{ textAlign: 'right' }"
        >
          <st-button
            type="primary"
            html-type="submit"
          >
            Search
          </st-button>
          <st-button
            :style="{ marginLeft: '8px' }"
            @click="handleReset"
          >
            Clear
          </st-button>

        </a-col>
      </a-row>
    </st-form>
  </st-modal>
</template>

<script>
export default {
  name: 'AddCourseSchedule',
  data() {
    return {
      show: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    onChange() {

    },
    save() {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>

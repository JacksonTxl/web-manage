<template>
  <st-modal
    title="重绑定实体卡"
    size="small"
    v-model="show"
    @ok="onSubmit"
    class="model-re-bind-container"
  >
    <section>
      <div class>
          <template v-for="item in data.identity">
          <st-tag :key="item" v-if="item === 4" class="mg-r4" type="coach-personal"/>
          <st-tag :key="item" v-if="item === 3" class="mg-r4" type="coach-team"/>
          <st-tag :key="item" v-if="item === 1" class="mg-r4" type="role-staff"/>
          <st-tag :key="item" v-if="item === 2" class="mg-r4" type="role-saler"/>
        </template>
        <span>{{ data.staff_name }}</span>
      </div>
    </section>
    <section class="model-re-bind-container_info mg-t16 aaaa">
      <div class="model-re-bind-container_same">
        <span class="model-re-bind-container_title">当前绑定实体卡号：</span>
        <span>{{ data.card_number }}</span>
      </div>
      <div class="model-re-bind-container_same">
        <span class="model-re-bind-container_titl">当前物理ID：</span>
        <span>{{ data.physical_number }}</span>
      </div>
    </section>
    <section>
      <st-form labelWidth="60px" :form="form" @submit="onSubmit" class="mg-t16">
        <st-form-item label="实体卡号">
          <a-input placeholder="请输入实体卡号"/>
        </st-form-item>
        <st-form-item label="物理ID">
          <a-input placeholder="请将实体卡置于读卡器上"/>
        </st-form-item>
      </st-form>
    </section>
  </st-modal>
</template>
<script>
import { BindService } from './bind.service'
import { MessageService } from '@/services/message.service'

export default {
  serviceInject() {
    return {
      service: BindService,
      message: MessageService
    }
  },
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      show: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          this.service.bind(this.data.id).subscribe(res => {
            this.message.success({ content: '重新绑卡成功' })
            this.show = false
          })
        }
      })
    }
  }
}
</script>

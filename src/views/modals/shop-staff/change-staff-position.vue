<template>
  <st-modal title="更改员工职位" confirmLoading @ok="onSubmit" size="small" v-model="show">
    <section>
      <div class="mg-b24">
        <st-tag class="mg-r4" type="coach-personal"/>
        <st-tag class="mg-r4" type="coach-team"/>
        <st-tag class="mg-r8" type="role-staff"/>
      </div>
    </section>
    <st-form labelWidth="66px" :form="form">
      <st-form-item label="工作性质">
        <a-select
          placeholder="请选择"
          v-decorator="['nature_work', { initialValue: this.data.nature_work }]"
        >
          <template v-for="(item,key) in enums.nature_work.value">
            <a-select-option :key="item" :value="+key">{{ item }}</a-select-option>
          </template>
        </a-select>
      </st-form-item>
      <st-form-item label="员工职能">
        <a-select
          mode="multiple"
          placeholder="请选择"
          @change="onChange"
          v-decorator="['identity',{ initialValue: this.data.identity  }]"
        >
          <template v-for="(item,key) in enums.identity.value">
            <a-select-option :key="item" :value="+key">{{ item }}</a-select-option>
          </template>
        </a-select>
      </st-form-item>
      <st-form-item label="教练等级">
        <a-input placeholder="支持中英文、数字,不超过10个字"/>
      </st-form-item>
      <st-form-item label="薪资模板">
        <a-input placeholder="支持中英文、数字,不超过10`个字" class="mg-b8"/>
        <a-input placeholder="支持中英文、数字,不超过10个字"/>
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
import { UserService } from '@/services/user.service'
export default {
  serviceInject() {
    return {
      userservice: UserService
    }
  },
  data() {
    return {
      show: false,
      form: this.$form.createForm(this),
      enums: {
        nature_work: {
          value: []
        },
        identity: {
          value: []
        }
      },
      data: {
        nature_work: 1,
        identity: [1, 2]
      }
    }
  },
  props: {},
  methods: {
    onChange(e) {
      console.log('删除', e)
    },
    onSubmit() {
      console.log('ok')
    }
  },
  created() {
    this.userservice.getEnums().subscribe(res => {
      console.log('============', res.staff)
      this.enums = res.staff
    })
  }
}
</script>

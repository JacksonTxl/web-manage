<template>
  <a-modal title="更改员工职位" @ok="onSubmit" size="small" v-model="show">
    <section>
      <div class="mg-b24">
        <st-tag class="mg-r4" type="coach-personal" />
        <st-tag class="mg-r4" type="coach-team" />
        <st-tag class="mg-r8" type="role-staff" />
      </div>
    </section>
    <st-form labelWidth="66px" :form="form">
      <st-form-item label="工作性质">
        <!-- {{ enums.nature_work.value }} -->
        <a-select
          placeholder="请选择"
          v-decorator="['nature_work', { initialValue: 1 }]"
        >
          <template v-if="enums.nature_work">
            <template v-for="(item, key) in enums.nature_work.value">
              <a-select-option :key="item" :value="+key">
                {{ item }}
              </a-select-option>
            </template>
          </template>
        </a-select>
      </st-form-item>
      <st-form-item label="员工职能">
        <!-- {{ enums.identity.value }} -->
        <a-select
          mode="multiple"
          placeholder="请选择"
          @change="onChange"
          v-decorator="['identity', { initialValue: [1, 2] }]"
        >
          <template v-if="enums.nature_work">
            <template v-for="(item, key) in enums.identity.value">
              <a-select-option :key="item" :value="+key">
                {{ item }}
              </a-select-option>
            </template>
          </template>
        </a-select>
      </st-form-item>
      <st-form-item label="教练等级">
        <a-input placeholder="支持中英文、数字,不超过10个字" />
      </st-form-item>
      <st-form-item label="薪资模板">
        <a-input placeholder="支持中英文、数字,不超过10个字" class="mg-b8" />
        <a-input placeholder="支持中英文、数字,不超过10个字" />
      </st-form-item>
    </st-form>
  </a-modal>
</template>

<script>
import { UserService } from '@/services/user.service'
export default {
  name: 'ChangeStaffPostion',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    data: Object,
    enums: {
      type: Object,
      default: () => {
        return {
          nature_work: {
            value: []
          },
          identity: {
            value: []
          }
        }
      }
    }
  },
  serviceInject() {
    return {
      userservice: UserService
    }
  },
  data() {
    return {
      form: this.$form.createForm(this)
    }
  },
  created() {
    console.log('传入的', this.data)
    // this.form.setFieldsValue({
    //   // identity: this.data.identity,
    //   // nature_work: this.data.nature_work

    //    nature_work: 1,
    //     identity: [1,2]
    // })
  },
  methods: {
    onChange(e) {},
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>

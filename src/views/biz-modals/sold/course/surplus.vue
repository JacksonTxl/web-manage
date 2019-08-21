<template>
  <st-modal
    title="修改剩余课时"
    size="small"
    v-model="show"
    wrapClassName="modal-sold-package-surplus"
  >
    <st-form :form="form">
      <div :class="surplus('content')">
        <st-info :class="surplus('info')">
          <st-info-item label="课程名称">
            {{ courseData.courseName }}
          </st-info-item>
          <st-info-item label="有效期">{{ courseData.time }}</st-info-item>
        </st-info>
        <st-form-table
          :class="surplus('table')"
          :loading="loading.getPackageEditInfo"
        >
          <colgroup>
            <col style="width:3%;" />
            <col style="width:31.5%;" />
            <col style="width:19.5%;" />
            <col style="width:42%;" />
            <col style="width:4.5%;" />
          </colgroup>
          <tr class="table-header">
            <th></th>
            <th>课程名称</th>
            <th>剩余课时</th>
            <th>修改课时</th>
            <th></th>
          </tr>
          <tr
            class="table-item"
            v-for="(item, index) in courseList"
            :key="index"
          >
            <td></td>
            <td>{{ item.course_name }}</td>
            <td>{{ item.course_num_remain }}</td>
            <td>
              <st-form-item labelWidth="0" labelGutter="0">
                <st-input-number
                  v-decorator="decorators[`num-${index}`]"
                  :min="0"
                  :max="999"
                  placeholder="输入修改后的课时"
                />
              </st-form-item>
            </td>
            <td></td>
          </tr>
        </st-form-table>

        <st-info :class="surplus('remarks')">
          <st-info-item class="mg-b0" label="备注">
            <a-textarea
              v-model="remarks"
              :autosize="{ minRows: 4, maxRows: 6 }"
            />
          </st-info-item>
        </st-info>
      </div>
    </st-form>
    <template slot="footer">
      <st-button @click="onSubmit" :loading="loading.edit" type="primary">
        确认提交
      </st-button>
    </template>
  </st-modal>
</template>

<script>
import { cloneDeep } from 'lodash-es'
import { SurplusService } from './surplus.service'
import { ruleOptions } from './surplus.config'
export default {
  name: 'ModalSoldPackageSurplus',
  bem: {
    surplus: 'modal-sold-package-surplus'
  },
  serviceInject() {
    return {
      surplusService: SurplusService
    }
  },
  rxState() {
    return {
      loading: this.surplusService.loading$
    }
  },
  props: {
    courseType: {
      type: String,
      required: true
    },
    courseData: {
      type: Object
    }
  },
  watch: {
    courseData(newVal) {
      this.getEditInfo()
    }
  },
  created() {
    this.getEditInfo()
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false,
      courseList: [],
      remarks: ''
    }
  },
  methods: {
    getEditInfo() {
      this.surplusService
        .getPackageEditInfo(this.courseData.id)
        .subscribe(res => {
          this.courseList = cloneDeep(res.list)
        })
    },
    onSubmit() {
      this.form.validate().then(values => {
        Object.keys(values).forEach(i => {
          this.courseList[i.split('-')[1]].courseNum = +values[i]
        })
        let courseInfo = []
        this.courseList.forEach(i => {
          courseInfo.push({
            id: i.id,
            product_type: i.product_type,
            course_num_remain: i.courseNum
          })
        })
        this.surplusService
          .edit(
            { course_info: courseInfo, description: this.remarks },
            this.courseData.id
          )
          .subscribe(res => {
            this.$emit('success')
            this.show = false
          })
      })
    }
  }
}
</script>

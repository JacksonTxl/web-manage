<template>
  <st-form :form="form" class="page-shop-container">
    <a-row :gutter="10">
      <a-col :lg="10" :xs="10" :offset="1">
        <st-form-item label="课程名称">
          <a-input
            placeholder="课程名称"
            disabled
            v-decorator="decorators.course_name"
          />
        </st-form-item>
        <st-form-item label="负责人">
          <a-select placeholder="请输入负责人"></a-select>
        </st-form-item>
        <st-form-item label="上课教练">
          <st-form-table>
            <thead>
              <tr>
                <th>教练</th>
                <th>教练等级</th>
                <th>工作性质</th>
                <th v-if="!disabled">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="st-form-table__add">
                  <st-button
                    type="dashed"
                    icon="add"
                    block
                    v-modal-link="{
                      name: 'shop-select',
                      props: {
                        checked: checkedShopIds,
                        groupParams,
                        type
                      },
                      on: {
                        change: onSelectShopComplete
                      }
                    }"
                  >
                    添加教练
                  </st-button>
                </td>
              </tr>
              <!-- <template v-if="list.length">
                <tr v-for="(item, index) in list" :key="index">
                  <td>{{ item.province }}</td>
                  <td>{{ item.city }}</td>
                  <td>{{ item.district }}</td>
                  <td>{{ item.shop_name }}</td>
                  <td v-if="!disabled">
                    <a @click="delShopTableRecord(item.shop_id)">
                      删除
                    </a>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td :colspan="colspanNum">
                    <st-no-data />
                  </td>
                </tr>
              </template> -->
            </tbody>
          </st-form-table>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="10">
      <a-col :lg="10" :xs="10" :offset="1">
        <st-form-item labelFix>
          <st-button class="mg-r16" @click="save" :loading="loading.setShop">
            上一步
          </st-button>
          <st-button type="primary" @click="save" :loading="loading.setShop">
            保存，开始设置售卖信息
          </st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
import { AddService } from '../add.service'
import { MessageService } from '@/services/message.service'
import SelectCoach from '@/views/fragments/coach/select-coach'
import { UserService } from '@/services/user.service'
import { ruleOptions } from '../form.config'
import { PatternService } from '@/services/pattern.service'

export default {
  name: 'SetShopCoach',
  serviceInject() {
    return {
      addService: AddService,
      messageService: MessageService,
      userService: UserService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.addService.loading$,
      personalCourseEnums: this.userService.personalCourseEnums$
    }
  },
  components: {},
  props: {
    courseName: {
      type: String,
      default: ''
    },
    courseId: {
      type: Number,
      default: 0
    }
  },
  watch: {
    courseName(val) {
      this.form.setFieldsValue({
        course_name: val
      })
    },
    courseId(val) {
      this.form.setFieldsValue({
        course_id: val
      })
    }
  },
  data(vm) {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      fileList: []
    }
  },
  watch: {
    courseName(val) {
      this.form.setFieldsValue({
        course_name: val
      })
    }
  },
  methods: {
    save(e) {
      e.preventDefault()
      this.form.validateFields().then(() => {
        const data = this.form.getFieldsValue()
        data.course_id = this.courseId
        this.addService.setCoach(data).subscribe(() => {
          this.messageService.success({
            content: '提交成功'
          })
          this.$emit('goNext')
        })
      })
    },
    onSelectCoachChange(coachIds) {
      this.form.setFieldsValue({
        coach_ids: coachIds
      })
    },
    setFieldsValue() {
      const info = this.info
      this.form.setFieldsValue({
        course_name: info.course_name,
        course_category: info.course_category,
        train_aim: info.train_aim,
        duration: info.duration,
        is_online_sale: info.is_online_sale,
        price: info.price,
        effective_unit: info.effective_unit,
        image: info.image,
        description: info.description
      })
      this.fileList = [this.info.image]
    },
    getData() {
      const data = this.form.getFieldsValue()
      data.course_id = +this.$searchQuery.id
      return data
    }
  }
}
</script>

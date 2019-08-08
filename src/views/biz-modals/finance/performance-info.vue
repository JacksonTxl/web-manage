<template>
  <st-modal title="模板详情" v-model="show" @ok="handleSubmit">
    <a-row :gutter="8">
      <a-col :lg="24">
        <st-info>
          <st-info-item label="模板名称">
            {{ infodata.template_name }}
          </st-info-item>
          <st-info-item label="业绩类型">
            {{ infodata.performance_type.name }}
          </st-info-item>
          <st-info-item label="提成模式" v-if="infodata.performance_mode.name">
            {{ infodata.performance_mode.name }}
          </st-info-item>
          <template
            v-if="
              infodata.performance_type.id ==
                SALAY_TEMPLATE.PERFORMANCE_TYPE_1 ||
                infodata.performance_type.id ==
                  SALAY_TEMPLATE.PERFORMANCE_TYPE_2
            "
          >
            <template
              v-if="
                infodata.performance_mode.id ==
                  SALAY_TEMPLATE.PERFORMANCE_MODE_1
              "
            >
              <st-info-item label="默认提成">
                {{ infodata.performance_num }}%
              </st-info-item>
            </template>
            <template
              v-if="
                infodata.performance_mode.id ==
                  SALAY_TEMPLATE.PERFORMANCE_MODE_2
              "
            >
              <st-info-item label="默认提成">
                {{ infodata.performance_num }}元
              </st-info-item>
            </template>
          </template>
          <template
            v-if="
              infodata.performance_type.id == SALAY_TEMPLATE.PERFORMANCE_TYPE_3
            "
          >
            <st-info-item label="默认提成">
              {{ infodata.performance_num }}元/节
            </st-info-item>
          </template>
          <st-info-item label="梯度提成">
            <div
              style="padding:12px; box-size: border-box; border-radius:4px;border:1px solid rgba(205,212,223,1);"
            >
              <st-form-table
                hoverable
                v-if="infodata.gradients"
                :isEmpty="infodata.gradients.length === 0"
              >
                <thead>
                  <tr>
                    <template
                      v-if="
                        infodata.performance_type.id ==
                          SALAY_TEMPLATE.PERFORMANCE_TYPE_1
                      "
                    >
                      <template
                        v-if="
                          infodata.performance_mode.id ==
                            SALAY_TEMPLATE.PERFORMANCE_MODE_1
                        "
                      >
                        <th>月销售额（万及以上）</th>
                        <th>提成（%）</th>
                      </template>
                      <template
                        v-if="
                          infodata.performance_mode.id ==
                            SALAY_TEMPLATE.PERFORMANCE_MODE_2
                        "
                      >
                        <th>月销售额（万及以上）</th>
                        <th>提成（元）</th>
                      </template>
                    </template>
                    <template
                      v-if="
                        infodata.performance_type.id ==
                          SALAY_TEMPLATE.PERFORMANCE_TYPE_2
                      "
                    >
                      <template
                        v-if="
                          infodata.performance_mode.id ==
                            SALAY_TEMPLATE.PERFORMANCE_MODE_1
                        "
                      >
                        <th>月课时价值（万及以上）</th>
                        <th>提成（%）</th>
                      </template>
                      <template
                        v-if="
                          infodata.performance_mode.id ==
                            SALAY_TEMPLATE.PERFORMANCE_MODE_2
                        "
                      >
                        <th>月课时价值（万及以上）</th>
                        <th>提成（元）</th>
                      </template>
                    </template>
                    <template
                      v-if="
                        infodata.performance_type.id ==
                          SALAY_TEMPLATE.PERFORMANCE_TYPE_3
                      "
                    >
                      <th>月课时数（节及以上）</th>
                      <th>课时费（元/节）</th>
                    </template>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="item in infodata.gradients">
                    <tr :key="item.id">
                      <td>{{ item.range_min }}</td>
                      <td>{{ item.royalty_num }}</td>
                    </tr>
                  </template>
                </tbody>
              </st-form-table>
            </div>
          </st-info-item>
        </st-info>
      </a-col>
    </a-row>
  </st-modal>
</template>

<script>
import { EditTemplateService } from './edit-performance-template.service'
import { UserService } from '@/services/user.service'
import { SALAY_TEMPLATE } from '@/constants/brand/finance/salary-enum'
export default {
  serviceInject() {
    return {
      service: EditTemplateService
    }
  },
  rxState() {
    return {}
  },
  created() {
    this.service.getInfo(this.id).subscribe(res => {
      this.infodata = res.info
    })
  },
  data() {
    return {
      SALAY_TEMPLATE,
      show: false,
      infodata: {
        template_name: '',
        performance_type: {
          name: ''
        },
        performance_mode: {
          name: ''
        }
      }
    }
  },
  props: {
    id: Number
  },
  methods: {
    handleSubmit() {
      this.show = false
    }
  }
}
</script>

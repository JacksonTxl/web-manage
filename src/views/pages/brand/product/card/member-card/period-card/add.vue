<template>
  <st-panel app class="page-brand-add-period-card" initial>
    <div class="page-brand-add-period-card-body">
      <div class="page-preview">实时预览</div>
      <div class="page-content">
        <st-form :form="form" labelWidth>
          <a-row :gutter="8" style="border-bottom: 1px solid #e9e9e9;margin-bottom: 32px;">
            <a-col :lg="16">
              <st-form-item class="mg-b0 page-content-card-name" label="期限卡名称" required>
                <a-input placeholder="请输入储值卡名称"></a-input>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="22">
              <st-form-item class="page-content-card-admission-range" label="支持入场门店">
                <a-radio-group v-model="cardData.admission_range" style="min-width: 314px;">
                  <a-radio
                    v-for="item in admission_range_list"
                    :key="item.value"
                    :value="item.value"
                  >{{item.label}}</a-radio>
                </a-radio-group>
                <div class="page-admission-range-shop">
                  <p class="page-admission-range-shop__describ">设置支持此会员卡出入场馆范围</p>
                  <a-table
                    size="middle"
                    :columns="columns"
                    :dataSource="admission_range_shop_list"
                    :pagination="false"
                  >
                    <a slot="operation" slot-scope="operation" href="javascript:;">
                      {{JSON.stringify(operation)}}
                    </a>
                  </a-table>
                </div>
              </st-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-admission-range" label="价格设置">
                <a-radio-group>
                  <a-radio
                    v-for="item in admission_range_list"
                    :key="item.value"
                    :value="item.value"
                  >{{item.label}}</a-radio>
                </a-radio-group>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-admission-range" label="支持售卖门店">
                <a-radio-group>
                  <a-radio
                    v-for="item in admission_range_list"
                    :key="item.value"
                    :value="item.value"
                  >{{item.label}}</a-radio>
                </a-radio-group>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-admission-range" label="支持售卖时间">
                <a-radio-group>
                  <a-radio
                    v-for="item in admission_range_list"
                    :key="item.value"
                    :value="item.value"
                  >{{item.label}}</a-radio>
                </a-radio-group>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-admission-range" label="转让设置">
                <a-radio-group>
                  <a-radio
                    v-for="item in admission_range_list"
                    :key="item.value"
                    :value="item.value"
                  >{{item.label}}</a-radio>
                </a-radio-group>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-admission-range" label="售卖渠道">
                <a-radio-group>
                  <a-radio
                    v-for="item in admission_range_list"
                    :key="item.value"
                    :value="item.value"
                  >{{item.label}}</a-radio>
                </a-radio-group>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-admission-range" label="卡背景">
                <a-radio-group>
                  <a-radio
                    v-for="item in admission_range_list"
                    :key="item.value"
                    :value="item.value"
                  >{{item.label}}</a-radio>
                </a-radio-group>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-admission-range" label="储值卡介绍">
                <a-radio-group>
                  <a-radio
                    v-for="item in admission_range_list"
                    :key="item.value"
                    :value="item.value"
                  >{{item.label}}</a-radio>
                </a-radio-group>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-admission-range" label="备注">
                <a-radio-group>
                  <a-radio
                    v-for="item in admission_range_list"
                    :key="item.value"
                    :value="item.value"
                  >{{item.label}}</a-radio>
                </a-radio-group>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-admission-range" label=" ">
                <st-button type="primary" html-type="submit">提交</st-button>
              </st-form-item>
            </a-col>
          </a-row>
        </st-form>
      </div>
    </div>
  </st-panel>
</template>
<script>
export default {
  data() {
    return {
      cardData: {
        admission_range: 1
      },
      // 支持入场门店
      admission_range_list: [
        { value: 1, label: '单个门店' },
        { value: 2, label: '多个门店' },
        { value: 3, label: '全部门店' }
      ],

      columns: [
        {
          title: '省',
          dataIndex: 'province'
        },
        {
          title: '市',
          dataIndex: 'city'
        },
        {
          title: '区',
          dataIndex: 'district'
        },
        {
          title: '门店名称',
          dataIndex: 'shopname'
        },
        {
          title: '操作',
          dataIndex: 'operation'
        }
      ],
      // 支持入场门店已选列表
      admission_range_shop_list: [
        {
          key: 1,
          province: '上海',
          city: '上海市',
          district: '徐汇区',
          shopname: '徐汇1店',
          operation: [1]
        },
        {
          key: 2,
          province: '上海',
          city: '上海市',
          district: '徐汇区',
          shopname: '徐汇2店',
          operation: [1]
        },
        {
          key: 3,
          province: '上海',
          city: '上海市',
          district: '徐汇区',
          shopname: '徐汇3店',
          operation: [1]
        }
      ]
    }
  }
}
</script>

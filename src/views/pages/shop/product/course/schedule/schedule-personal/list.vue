<template>
    <st-panel>
    <div slot="title">
      <a-row :gutter="8">
        <a-col :lg="9">
          <st-button>私教预约表</st-button>
        </a-col>
        <a-col :lg="7">
          <!-- <date/> -->
        </a-col>
        <a-col :lg="8" style="text-align: right;">
          <st-button class="mg-r8" type="primary">批量排期</st-button>
          <st-button>添加排期</st-button>
        </a-col>
      </a-row>
    </div>
    <a-row :gutter="8" class="mg-t8">
      <st-form-table :page="page" @change="onPageChange" hoverable>
        <thead>
          <tr>
            <template v-for="(item,index) in columsTitlelist">
              <th :key="index">{{ item }}</th>
            </template>
          </tr>
        </thead>
        <tbody>
          <template></template>
        </tbody>
      </st-form-table>
    </a-row>
    {{ listData }}
  </st-panel>
</template>

<script>
// import date from './date#/date'
import { ListService } from './list.service'

export default {
  serviceInject() {
    return {
      service: ListService
    }
  },
  rxState() {
    return {
      listData: this.service.listData$
    }
  },
  components: {
    // date
  },
  data() {
    return {
      columsTitlelist: [
        '教练姓名',
        '02/02 周一',
        '02/03 周二',
        '02/04 周三',
        '02/05 周四',
        '02/06 周五',
        '02/07 周六',
        '02/08 周日',
        '操作'
      ],
      page: {}
    }
  },
  mounted() {},
  methods: {
    onPageChange() {}
  }
}
</script>

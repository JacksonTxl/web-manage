<template>
  <div class="member-info-sales-interests">
    <div class="member-info-sales-interests-item">
      <st-t2 class="member-info-sales-interests-item__padding">优惠劵</st-t2>
      <st-t4 class="member-info-sales-interests-item__padding">可用优惠劵:{{1}}</st-t4>
      <st-t4 class="member-info-sales-interests-item__padding">已使用优惠劵:{{5}}</st-t4>
      <st-t4 class="member-info-sales-interests-item__padding">过期优惠券:{{4}}</st-t4>
    </div>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-table rowKey="age" :dataSource="data" :columns="coupon" :pagination="false"></a-table>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="24">
        <st-hr></st-hr>
      </a-col>
    </a-row>
    <div class="member-info-sales-interests-item">
      <st-t2 class="member-info-sales-interests-item__padding">积分</st-t2>
      <st-t4 class="member-info-sales-interests-item__padding">可用积分:{{1}}</st-t4>
      <st-t4 class="member-info-sales-interests-item__padding">消耗积分:{{5}}</st-t4>
      <st-t4 class="member-info-sales-interests-item__padding">过期积分:{{4}}</st-t4>
    </div>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-table rowKey="age" :dataSource="data" :columns="integral" :pagination="false">
          <span
            slot="age"
            slot-scope="text"
            :style="text < 0 ? 'color:#00E881':'color:#FF5E41' "
          >{{text >= 0 ? '+' + text: text}}</span>
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          age: 1,
          age1: 1,
          age2: 1,
          age3: 1
        }
      ],
      coupon: [
        {
          title: '优惠劵',
          dataIndex: 'age'
        },
        {
          title: '领券来源',
          dataIndex: 'age1'
        },
        {
          title: '全部状态',
          dataIndex: 'age2'
        },
        {
          title: '领取时间',
          dataIndex: 'age3'
        }
      ],
      integral: [
        {
          title: '积分数量',
          dataIndex: 'age',
          scopedSlots: { customRender: 'age' }
        },
        {
          title: '原因',
          dataIndex: 'age1'
        },
        {
          title: '操作人',
          dataIndex: 'age2'
        },
        {
          title: '操作时间',
          dataIndex: 'age3'
        }
      ]
    }
  }
}
</script>

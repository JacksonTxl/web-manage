<template>
  <div class="member-info-user-experience">
    <st-t4>体测数据</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-radio-group
          v-model="tcData"
          @change="tcDataFunc(tcData)"
          style="position: absolute;right: 20px;top: -30px;"
        >
          <a-radio-button value="weight">体重</a-radio-button>
          <a-radio-button value="body_fat_rate">体脂率</a-radio-button>
          <a-radio-button value="basal_metabolism">基础代谢率</a-radio-button>
        </a-radio-group>
        <div id="mountNode"></div>
        <st-area-chart id="mountNode" :data="g2"/>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="24">
        <st-hr></st-hr>
      </a-col>
    </a-row>
    <st-t4>体测记录</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <st-form-table hoverable>
          <thead>
            <tr>
              <th
                v-for="(item,index) in tableTitle"
                :key="index"
                :style="{'width':item.width}"
              >{{item.title}}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td :colspan="tableTitle.length">
                  <modal-link tag="a" :to=" { name: 'shop-add-lateral-recording'}">
                     <a-button class="editable-add-btn" type="dashed">
                  <a-icon type="plus"/>添加体侧记录
                </a-button>
                  </modal-link>

              </td>
            </tr>
            <tr v-for="(item,index) in cardsListInfo.physical_list" :key="index">
              <td>{{item.test_time}}</td>
              <td>{{item.height}}</td>
              <td>{{item.weight}}</td>
              <td>{{item.body_fat_rate}}</td>
              <td>{{item.basal_metabolism}}</td>
              <td>{{item.fat_content}}</td>
              <td>{{item.skeletal_muscle_content}}</td>
              <td>{{item.bust}}</td>
              <td>{{item.waistline}}</td>
              <td>{{item.hipline}}</td>
            </tr>
          </tbody>
        </st-form-table>
      </a-col>
    </a-row>
    <page v-model="pageData" @dataChange="dataChange" style="text-align: right;margin-top:20px"></page>
  </div>
</template>
<script>
import G2 from '@antv/g2'
import page from './sold#/page'
import { UserExperienceService } from './user-experience.service'
const defaultOptions = {
  /**
   * 指定图表的高度，单位为 'px
   */
  height: 300,
  /**
   * 设置图表的内边距
   */
  padding: 'auto',
  fieldNames: {
    x: 'test_time',
    y: 'value'
  },
  lineColor: '#258EF9',
  lineWidth: 2,
  /**
   * 使用渐变色，l 后面传入角度，0 代表起始颜色，1 代表结束颜色
   */
  areaColor: 'l(90) 0:rgba(63, 102, 246, .2) 1:rgba(0, 202, 255, 0)'
}
export default {
  serviceInject() {
    return {
      aService: UserExperienceService
    }
  },
  rxState() {
    return {
      cardsListInfo: this.aService.cardsListInfo$,
      followInfo: this.aService.followInfo$
    }
  },
  components: {
    page
  },
  data() {
    return {
      tcData: 'weight',
      pageData: {
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        current: 1,
        pageSize: 20,
        total: 0
      },
      tableTitle: [
        { title: '体测时间', width: '13%' },
        { title: '身高', width: '10%' },
        { title: '体重', width: '10%' },
        { title: '体脂率', width: '10%' },
        { title: '基础代谢值', width: '10%' },
        { title: '脂肪含量', width: '10%' },
        { title: '骨骼肌含量', width: '10%' },
        { title: '胸围', width: '10%' },
        { title: '腰围', width: '10%' },
        { title: '臀围', width: '10%' }
      ],
      integral: [
        {
          title: '体测时间',
          dataIndex: 'age',
          sorter: (a, b) => {
            let A = new Date(a.age).getTime()
            let B = new Date(b.age).getTime()
            if (A < B) {
              return -1
            }
            if (A > B) {
              return 1
            }
            return 0
          }
        },
        {
          title: '身高',
          dataIndex: 'age1'
        },
        {
          title: '体重',
          dataIndex: 'age2'
        },
        {
          title: '体脂率',
          dataIndex: 'age3'
        },
        {
          title: '基础代谢值',
          dataIndex: 'age4'
        },
        {
          title: '脂肪含量',
          dataIndex: 'age5'
        },
        {
          title: '骨骼肌含量',
          dataIndex: 'age6'
        },
        {
          title: '胸围',
          dataIndex: 'age7'
        },
        {
          title: '腰围',
          dataIndex: 'age8'
        }
      ],
      g2: [
        {
          test_time: '04/19',
          value: 65000
        },
        {
          test_time: '04/19',
          value: 65000
        },
        {
          test_time: '04/23',
          value: 65000
        },
        {
          test_time: '04/25',
          value: 65000
        },
        {
          test_time: '04/25',
          value: 65000
        },
        {
          test_time: '05/08',
          value: 65000
        }
      ],
      options: {}
    }
  },
  created() {
    this.g2 = this.followInfo.weight
    this.pageData.current = this.cardsListInfo.page.current_page
    this.pageData.pageSize = this.cardsListInfo.page.size
    this.pageData.total = this.cardsListInfo.page.total_counts
  },
  mounted() {},
  methods: {
    tcDataFunc(value) {
      this.g2 = this.followInfo[value]
    },
    dataChange(value) {
      console.log(value)
      let self = this
      this.aService
        .getMemberSideRecord(self.$route.query.id, {
          size: value.pageSize,
          page: value.current
        })
        .subscribe()
    },
    echarts(data) {
      const opts = Object.assign(defaultOptions, this.options)
      const { x, y } = opts.fieldNames
      G2.track(false) // 关闭打点监控
      const chart = new G2.Chart({
        container: 'mountNode',
        forceFit: true,
        ...opts
      })
      chart.source(data)
      chart.scale({
        [x]: {
          range: [0, 1]
        }
      })
      chart.axis(x, {
        label: {
          textStyle: {
            fill: '#9BACB9'
          },
          tickLine: null
        },
        tickLine: {
          alignWithLabel: false,
          length: 0
        }
      })
      chart.axis(y, {
        label: {
          formatter: function formatter(val) {
            return (val / 10000).toFixed(1) + 'kg'
          },
          textStyle: {
            fill: '#9BACB9'
          }
        },
        grid: {
          type: 'line',
          lineStyle: {
            stroke: '#E6E9EF', // 网格线的颜色
            lineWidth: 1, // 网格线的粗细
            lineDash: [0, 0] // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
          }
        }
      })
      chart.tooltip({
        crosshairs: {
          type: 'line'
        },
        showTitle: false,
        useHtml: true,
        htmlContent: function htmlContent(title, items) {
          console.log(items)
          return `<div class="custom-tooltip">${(
            items[0].value / 10000
          ).toFixed(1)}kg</div>`
        }
      })
      chart
        .area()
        .position([x, y])
        .color(opts.areaColor)
        .shape('smooth')
      chart
        .line()
        .position([x, y])
        .color(opts.lineColor)
        .size(opts.lineWidth)
        .shape('smooth')
      chart.render()
      chart.clear()
      chart.source(data)
      chart
        .area()
        .position([x, y])
        .color(opts.areaColor)
        .shape('smooth')
      chart
        .line()
        .position([x, y])
        .color(opts.lineColor)
        .size(opts.lineWidth)
        .shape('smooth')
      chart.render()
    }
  }
}
</script>

<template>
  <div class="member-info-user-experience">
    <st-t4>体测数据</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <div id="mountNode"></div>
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
        <!-- <a-table
          class="user-experience-add-table"
          rowKey="age"
          :dataSource="data"
          :columns="integral"
          :pagination="false"
        ></a-table>-->
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
                <a-button class="editable-add-btn" type="dashed">
                  <a-icon type="plus"/>添加体侧记录
                </a-button>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
              <td>8</td>
              <td>9</td>
            </tr>
          </tbody>
        </st-form-table>
      </a-col>
    </a-row>
    <page v-model="pageData"></page>
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
    x: 'year',
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
      pageData: {
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        current: 1,
        pageSize: 10,
        total: 50
      },
      data: [
        {
          age: '2017/10/31 23:12:00',
          age1: 1,
          age2: 1,
          age3: 1,
          age4: 1,
          age5: 1,
          age6: 1,
          age7: 1,
          age8: 8
        },
        {
          age: '2017/10/31 23:12:30',
          age1: 2,
          age2: 2,
          age3: 2,
          age4: 2,
          age5: 2,
          age6: 2,
          age7: 2,
          age8: 8
        }
      ],
      tableTitle: [
        { title: '体测时间', width: '20%' },
        { title: '身高', width: '10%' },
        { title: '体重', width: '10%' },
        { title: '体脂率', width: '10%' },
        { title: '基础代谢值', width: '10%' },
        { title: '脂肪含量', width: '10%' },
        { title: '骨骼肌含量', width: '10%' },
        { title: '胸围', width: '10%' },
        { title: '腰围', width: '10%' }
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
          year: '1991',
          value: 10468
        },
        {
          year: '1992',
          value: 16100
        },
        {
          year: '1993',
          value: 12900
        },
        {
          year: '1994',
          value: 17409
        },
        {
          year: '1995',
          value: 10000
        },
        {
          year: '1996',
          value: 21056
        },
        {
          year: '1997',
          value: 31982
        },
        {
          year: '1998',
          value: 12040
        },
        {
          year: '1999',
          value: 33233
        }
      ],
      options: {}
    }
  },
  mounted() {
    this.echarts(this.g2)

    // this.aService.getListInfo('1').subscribe()
  },
  methods: {
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
    }
  }
}
</script>

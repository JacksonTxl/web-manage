<template>
  <div>
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
        <a-table
          class="user-experience-add-table"
          rowKey="age"
          :dataSource="data"
          :columns="integral"
          :pagination="false"
        ></a-table>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import G2 from '@antv/g2'
export default {
  data() {
    return {
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
      ]
    }
  },
  mounted() {
    this.echarts(this.g2)
    this.nextTickAddEle()
  },
  methods: {
    nextTickAddEle() {
      this.$nextTick(() => {
        // let ele = document
        //   .getElementsByClassName('user-experience-add-table')[0]
        //   .getElementsByClassName('ant-table-tbody')[0]
        // console.log(ele)
        // let oldEle = ele.innerHTML
        // let newEle = `<tr><td>qweqweqweqwe</td></tr>` + oldEle
        // ele.innerHTML = newEle
      })
    },
    echarts(data) {
      let self = this
      var chart = new G2.Chart({
        container: 'mountNode',
        forceFit: true,
        height: window.innerHeight
      })
      chart.source(data)
      chart.scale({
        value: {
          min: 10000
        },
        year: {
          range: [0, 1]
        }
      })

      chart.tooltip({
        crosshairs: {
          type: 'line'
        }
      })
      chart.area().position('year*value')
      chart
        .line()
        .position('year*value')
        .size(2)
      chart.render()
    }
  }
}
</script>

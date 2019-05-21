
<template>
  <div>
    <div v-for="(item,key,index) in value" :key="index">
      <div v-if="key !== 'arrData'">
        <st-t4 style="margin-bottom:16px">{{item.title}}</st-t4>
        <div
          style="display: flex;justify-content: space-between; padding-bottom:16px;   flex-direction: row;    flex-wrap: wrap;"
        >
          <st-button
            :style="{width:item.width+'px',marginBottom: '16px'}"
            :class="value.arrData.indexOf(item1)>=0?'active':''"
            v-for="(item1,index) in item.value"
            :key="index"
            @click="selectionFun(item1)"
          >{{item1}}</st-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  model: {
    type: 'value',
    event: 'dataChangge'
  },
  props: {
    value: {
      type: Object
    },
    flag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    selectionFun(item) {
      let keyData = Object.keys(this.value)
      let self = this
      keyData.map((key, index) => {
        if (key !== 'arrData' && key !== 'getData' && key !== 'info') {
          if (self.value[key].selectionData.indexOf(item) < 0) {
            if (this.flag) {
              self.value[key].value.map(valueData => {
                if (valueData.indexOf(item) >= 0) {
                  self.value[key].selectionData.unshift(item)
                  self.value['arrData'].unshift(item)
                }
              })
            }
          } else {
            self.value[key].selectionData.splice(
              self.value[key].selectionData.indexOf(item),
              1
            )
            self.value['arrData'].splice(self.value['arrData'].indexOf(item), 1)
          }
        }
      })
    },
    componentFun(value) {
      switch (value) {
        case '性别':
          return {
            arr: [0],
            titleData: {
              title: '性别',
              info: '满足一下性别属性的用户',
              lable0: '选择性别',
              lableitem0: [{ key: 1, value: '男' }, { key: 2, value: '女' }],
              getSet: {
                sex: 1
              }
            }
          }
        case '年龄':
          return {
            arr: [1],
            titleData: {
              title: '年龄',
              info: '在以下年龄范围内的用户',
              lable1: '年龄范围',
              lableitem1: '岁',
              getSet: {
                min: 1,
                max: 20
              }
            }
          }
        case '所属门店':
          return {
            arr: [3],
            titleData: {
              title: '所属门店',
              info: '选择所属门店在以下范围内的用户',
              lable3: '选择门店',
              lableitem3: [{ key: 1, value: '拉风' }]
            }
          }
        case '生日':
          return {
            arr: [2],
            titleData: {
              title: '生日',
              info: '选择自然日内，过生日的用户',
              lable2: '选择时间',
              lableitem2: [7, 30, 90]
            }
          }

        case '入场次数':
          return {
            arr: [1, 2],
            titleData: {
              title: '入场次数',
              info: '会员卡剩余次数在以下范围的用户',
              lable1: '剩余次数',
              lableitem1: '次',
              lable2: '选择时间',
              lableitem2: [7, 30, 90],
              getSet: {
                min: 1,
                max: 20
              }
            }
          }
        case '最后一次入场时间':
          return {
            arr: [2],
            titleData: {
              title: '最后一次入场时间',
              info: '选择自然日内，最后一次入场的用户',
              lable2: '选择时间',
              lableitem2: [7, 30, 90],
              getSet: {
                start: '2019-5-18',
                end: '2019-5-18'
              }
            }
          }
        case '可用积分':
          return {
            arr: [1],
            titleData: {
              title: '可用积分',
              info: '可用积分在以下范围内的用户',
              lable1: '积分范围',
              lableitem1: '个',
              getSet: {
                min: 1,
                max: 20
              }
            }
          }
        case '可用优惠券':
          return {
            arr: [1],
            titleData: {
              title: '可用优惠券',
              info: '可用积分在以下范围内的用户',
              lable1: '优惠券范围',
              lableitem1: '张',
              getSet: {
                min: 1,
                max: 10
              }
            }
          }
        case '累计获得积分':
          return {
            arr: [1],
            titleData: {
              title: '累计获得积分',
              info: '累计获得积分在以下范围内的用户',
              lable1: '积分范围',
              lableitem1: '个',
              getSet: {
                min: 1,
                max: 20
              }
            }
          }
        case '注册时间':
          return {
            arr: [2],
            titleData: {
              title: '注册时间',
              info: '选择自然日内，注册的用户',
              lable2: '选择时间',
              lableitem2: [7, 30, 90]
            }
          }
        case '来源方式':
          return {
            arr: [3],
            titleData: {
              title: '来源方式',
              info: '选择来源方式为以下范围的用户',
              lable3: '选择门店',
              lableitem3: [{ key: 1, value: '拉风' }]
            }
          }
        case '入会时间':
          return {
            arr: [2],
            titleData: {
              title: '入会时间',
              info: '选择自然日内，成为正式会员的用户',
              lable2: '选择时间',
              lableitem2: [7, 30, 90]
            }
          }
        case '会员卡即将到期':
          return {
            arr: [2],
            titleData: {
              title: '会员卡即将到期',
              info: '选择自然日内，会员卡即将到期的用户',
              lable2: '选择时间',
              lableitem2: [7, 30, 90]
            }
          }

        case '会员卡剩余次数':
          return {
            arr: [1],
            titleData: {
              title: '会员卡剩余次数',
              info: '会员卡剩余次数在以下范围的用户',
              lable1: '剩余次数',
              lableitem1: '次',
              getSet: {
                min: 1,
                max: 20
              }
            }
          }
        case '私教课剩余次数':
          return {
            arr: [1],
            titleData: {
              title: '私教课剩余次数',
              info: '私教课剩余次数在以下范围的用户',
              lable1: '剩余次数',
              lableitem1: '次',
              getSet: {
                min: 1,
                max: 20
              }
            }
          }
        case '储值卡剩余金额':
          return {
            arr: [1],
            titleData: {
              title: '储值卡剩余金额',
              info: '储值卡剩余金额在以下范围的用户',
              lable1: '剩余金额',
              lableitem1: '元',
              getSet: {
                min: 1,
                max: 20
              }
            }
          }
        case '入场次数1':
          return {
            arr: [0, 1, 2, 3],
            titleData: {
              title: '入场次数',
              info: '会员卡剩余次数在以下范围的用户',
              lable0: '选择性别',
              lableitem0: [{ key: 1, value: '男' }, { key: 2, value: '女' }],
              lable1: '剩余次数',
              lableitem1: '次',
              lable2: '选择时间',
              lableitem2: [7, 30, 90],
              lable3: '选择门店',
              lableitem3: [{ key: 1, value: '拉风' }],
              getSet: {
                min: 1,
                max: 20
              }
            }
          }
      }
    }
  },
  mounted() {}
}
</script>

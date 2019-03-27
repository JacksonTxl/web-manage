<template>
  <section class="kael">
    <header class="header">header</header>
    <section class="body">
      <div class="sider">sider</div>
      <div class="data_body_content">
        <div class="data_body_total">
          <div class="data_body_total-text">
            <span>近半年总计:</span>
            <span>¥ 324,214.22</span>
          </div>
          <a-select defaultValue="lucy" style="width: 120px">
            <a-select-option value="lucy">近半年</a-select-option>
            <a-select-option value="lucy1">近一年</a-select-option>
          </a-select>
        </div>
        <a-tabs defaultActiveKey="1">
          <a-tab-pane tab="订单列表" key="1">
            <a-table :columns="columns" :pagination="pagination" :dataSource="data" size="middle">
              <template slot="b" slot-scope="a">
                {{a.value}}
              </template>
            </a-table>
          </a-tab-pane>
          <a-tab-pane tab="订单列表" key="2" forceRender>
            <a-table :columns="columns" :pagination="pagination" :dataSource="data" size="middle">
              <template slot="b" slot-scope="a">
                {{a.value}}
              </template>
            </a-table>
            2
          </a-tab-pane>
          <a-tab-pane tab="订单列表" key="3">
            <a-table :columns="columns" :pagination="pagination" :dataSource="data" size="middle">
              <template slot="b" slot-scope="a">
                {{a.value}}
              </template>
            </a-table>
          </a-tab-pane>
        </a-tabs>
      </div>
    </section>
  </section>
</template>

<script>
const pagination = {
  position: 'bottom',
  showQuickJumper: true,
  showSizeChanger: true,
  size: 'small',
  total: 50
}
const columns = [
  {
    title: '订单编号',
    dataIndex: 'index',
    scopedSlots: { customRender: 'b' }
  },
  {
    title: '购买商品',
    className: 'goods',
    dataIndex: 'goods'
  },
  {
    title: '价格',
    className: 'price',
    dataIndex: 'price'
  },
  {
    title: '支付方式',
    className: 'paytype',
    dataIndex: 'paytype'
  },
  {
    title: '创建时间',
    className: 'createtime',
    dataIndex: 'createtime'
  },
  {
    title: '支付时间',
    className: 'paytime',
    dataIndex: 'paytime'
  },
  {
    title: '状态',
    className: 'status',
    dataIndex: 'status'
  },
  {
    title: '操作',
    className: 'operation',
    dataIndex: 'operation'
  }
]

const data = [
  {
    key: 1,
    index: { value: 1, b: 2 },
    goods: 'car',
    price: 2300,
    paytype: 2,
    createtime: '2019.04.20 17:32:32',
    paytime: '2019.04.20 17:34:00',
    status: 1,
    operation: [1, 2, 3]
  },
  {
    key: 2,
    index: { value: 1, b: 2 },
    goods: 'car',
    price: 2300,
    paytype: 2,
    createtime: '2019.04.20 17:32:32',
    paytime: '2019.04.20 17:34:00',
    status: 1,
    operation: [1, 2, 3]
  },
  {
    key: 3,
    index: { value: 1, b: 2 },
    goods: 'car',
    price: 2300,
    paytype: 2,
    createtime: '2019.04.20 17:32:32',
    paytime: '2019.04.20 17:34:00',
    status: 1,
    operation: [1, 2, 3]
  },
  {
    key: 4,
    index: { value: 1, b: 2 },
    goods: 'car',
    price: 2300,
    paytype: 2,
    createtime: '2019.04.20 17:32:32',
    paytime: '2019.04.20 17:34:00',
    status: 1,
    operation: [1, 2, 3]
  }
]

export default {
  data() {
    return {
      data,
      columns,
      pagination
    }
  }
}
</script>
<style lang="less" scoped>
.kael {
  display: flex;
  flex-direction: column;
  height: 800px;
  border: 1px solid rgb(236, 43, 17);
  .header {
    flex: none;
    background:rgba(199, 233, 179,1);
    height:64px;
  }
  .body{
    flex: auto;
    display: flex;
    align-items: stretch;
    .sider {
      flex: none;
      flex-basis: 200px;
      background: rgba(0,0,0,.2);
    }
    .data_body__content {
      position: relative;
      flex: auto;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 10px 50px 0px rgba(0, 0, 0, 0.05);
      border-radius: 4px;
      padding: 0 20px;
      .data_body_total {
        display: flex;
        align-items: center;
        position: absolute;
        height: 55px;
        top: 0;
        right: 20px;
        z-index: 100;
        &-text {
          font-size: 12px;
          line-height: 17px;
          font-weight: 500;
          color: blue;
          span:nth-of-type(2) {
            margin-left: 6px;
            margin-right: 20px;
            color: blue;
          }
        }
      }
    }
  }
}
</style>

<style scoped>
.kael /deep/ .ant-progress-success-bg {
  background: rgba(60, 143, 232, 1);
}
.kael /deep/ .ant-tabs-nav .ant-tabs-tab {
  padding: 17px 0;
}
.kael /deep/ .ant-tabs-bar {
  margin-bottom: 0;
}
.kael /deep/ .ant-table-pagination.ant-pagination{
  float: none;
  margin: 40px 0;
  text-align: center;
}
</style>

<template>
  <st-modal
    title="黑名单管理"
    v-model="show"
    size="small"
    @ok="postBlackListSetting"
  >
    <a-select
      v-model="blackKeys"
      mode="multiple"
      placeholder="手机号搜索"
      style="width: 100%"
      @search="onSearchKeyWords"
      @change="joinPerson"
      :maxTagCount="0"
      class="mg-b24"
    >
      <template slot="maxTagPlaceholder">
        <div>已选择{{ blackList.length || 0 }}个</div>
      </template>
      <a-select-option
        v-for="item in searchList"
        :key="item.user_id"
        :value="+item.user_id"
      >
        ({{ item.user_cate }}) &nbsp;&nbsp;{{ item.user_name }}&nbsp;{{
          item.mobile
        }}
      </a-select-option>
    </a-select>

    <st-table
      :columns="columns"
      :dataSource="blackList"
      :page="page"
      rowKey="user_id"
      @change="onChange"
    >
      <div slot="action" slot-scope="text, record">
        <st-table-actions>
          <a @click="deletePerson(record)">
            删除
          </a>
        </st-table-actions>
      </div>
    </st-table>
  </st-modal>
</template>
<script>
import { columns } from './black-list.config'
import { BlackService } from './black-list.service'

export default {
  serviceInject() {
    return {
      blackService: BlackService
    }
  },
  rxState() {
    return {
      loading: this.blackService.loading$
    }
  },
  bem: {
    bPage: 'modal-shop-blacklist'
  },
  props: {
    id: Number
  },
  data() {
    return {
      show: false,
      list: [],
      blackList: [],
      page: {}, // 前端分页
      blackKeys: [],
      searchList: []
    }
  },
  created() {
    this.getBlackList()
  },
  computed: {
    columns
  },
  methods: {
    getBlackList() {
      return this.blackService.getBlackList().subscribe(res => {
        this.blackList = res.list
        this.blackKeys = this.blackList.map(({ user_id }) => {
          return user_id
        })
      })
    },
    onSearchKeyWords(val) {
      this.blackService.onSearchKeyWords(val).subscribe(res => {
        this.searchList = res.list
      })
    },
    joinPerson(para) {
      this.blackList = []
      this.blackKeys.map(id => {
        this.searchList.map(searchItem => {
          if (searchItem.user_id === id) {
            this.blackList.push(searchItem)
          }
        })
      })
    },
    deletePerson(para) {
      this.blackKeys = this.blackKeys.filter(id => {
        return id !== para.user_id
      })
      this.blackList = this.blackList.filter(({ user_id }) => {
        return user_id !== para.user_id
      })
    },
    onChange(pagination, filters, sorter) {
      this.page = pagination
      this.page.current_page = pagination.current
      this.page.size = pagination.pageSize
    },
    postBlackListSetting() {
      this.blackService
        .postBlackListSetting({ black_list: this.blackList })
        .subscribe(res => {
          this.show = false
          this.$emit('success')
        })
    }
  }
}
</script>

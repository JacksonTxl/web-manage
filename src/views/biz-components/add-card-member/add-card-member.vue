<template>
  <st-form-table :class="b()">
    <colgroup>
      <col style="width:18%;" />
      <col style="width:18%;" />
      <col style="width:18%;" />
      <col style="width:18%;" />
      <col style="width:18%;" />
      <col style="width:10%;" />
    </colgroup>
    <thead>
      <tr>
        <th>成员姓名</th>
        <th>手机号</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="3" :class="b('search-wrapper')">
          <a-popover trigger="click" placement="bottom" v-model="visible">
            <template slot="content">
              <div :class="b('search')">
                <a-select
                  showSearch
                  allowClear
                  placeholder="输入手机号或会员名搜索"
                  :defaultActiveFirstOption="false"
                  :showArrow="false"
                  :filterOption="false"
                  v-model="memberId"
                  @search="onMemberSearch"
                  @change="onMemberChange"
                  notFoundContent="无搜索结果"
                  :class="b('search-select')"
                >
                  <a-select-option
                    v-for="(item, index) in memberList"
                    :value="item.id"
                    :key="index"
                  >
                    <span
                      v-html="
                        `${item.member_name} ${item.mobile}`.replace(
                          new RegExp(memberSearchText, 'g'),
                          `\<span class='global-highlight-color'\>${memberSearchText}\<\/span\>`
                        )
                      "
                    >
                      {{ item.member_name }} {{ item.mobile }}
                    </span>
                  </a-select-option>
                </a-select>
                <p
                  v-if="
                    !memberList.length && memberSearchText !== '' && type !== 2
                  "
                  :class="b('add-text')"
                >
                  查无此会员，
                  <a @click="onAddMember">添加新会员？</a>
                </p>
              </div>
            </template>
            <st-button
              :disabled="list.length >= max"
              type="dashed"
              icon="add"
              block
            >
              添加卡成员
            </st-button>
          </a-popover>
        </td>
      </tr>
      <tr v-for="(item, index) in list" :key="index">
        <td>
          <template v-if="item.isEdit">
            <a-input placeholder="输入姓名" v-model="item.name"></a-input>
          </template>
          <template v-else>
            {{ item.name }}
          </template>
        </td>
        <td>
          <template v-if="item.isEdit">
            <a-input placeholder="输入手机号" v-model="item.mobile"></a-input>
          </template>
          <template v-else>
            {{ item.mobile }}
          </template>
        </td>
        <td>
          <a
            v-if="item.isEdit"
            class="mg-r8"
            @click="onConfirmItem(item, index)"
          >
            确认
          </a>
          <a v-if="item.isEdit" @click="onCancelItem(item, index)">取消</a>
          <a v-if="!item.isEdit" @click="onDeleteItem(item, index)">删除</a>
        </td>
      </tr>
      <tr v-if="list.length <= 0">
        <td colspan="3">
          <st-no-data />
        </td>
      </tr>
    </tbody>
  </st-form-table>
</template>
<script>
import { cloneDeep } from 'lodash-es'
import { AddCardMemberService } from './add-card-member.service'
export default {
  name: 'AddCardMember',
  bem: {
    b: 'page-add-card-member'
  },
  serviceInject() {
    return {
      addCardMemberService: AddCardMemberService
    }
  },
  rxState() {
    return {
      memberList: this.addCardMemberService.memberList$
    }
  },
  model: {
    prop: 'list',
    event: 'change'
  },
  props: {
    type: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 10
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visible: false,
      memberSearchText: '',
      searchMemberIsShow: true,
      memberId: ''
    }
  },
  computed: {},
  methods: {
    onConfirmItem(item, index) {
      item.isEdit = false
      this.$emit('change', this.list)
    },
    onCancelItem(item, index) {
      this.list.shift()
      this.$emit('change', this.list)
    },
    onDeleteItem(item, index) {
      this.list.splice(index, 1)
      this.$emit('change', this.list)
    },
    onAddMember() {
      this.visible = false
      this.list.unshift({
        name: '',
        mobile: '',
        isEdit: true
      })
    },
    onMemberSearch(data) {
      this.memberSearchText = data
      if (data) {
        this.addCardMemberService.getMember(data, this.type).subscribe()
      }
    },
    onMemberChange(data) {
      if (data) {
        const isExist = this.list.filter(item => item.id === data)
        if (isExist.length > 0) return
        const selectedItem = this.memberList.filter(item => item.id === data)
        this.list.unshift({
          id: selectedItem[0].id,
          name: selectedItem[0].member_name,
          mobile: selectedItem[0].mobile
        })
        this.$emit('change', this.list)
      }
    }
  }
}
</script>

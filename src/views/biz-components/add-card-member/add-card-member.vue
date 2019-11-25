<template>
  <st-form-table>
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
        <td colspan="3">
          <a-popover trigger="click" placement="bottom">
            <template slot="content">
              <div>
                <a-select
                  showSearch
                  allowClear
                  placeholder="输入手机号或会员名搜索"
                  :defaultActiveFirstOption="false"
                  :showArrow="false"
                  :filterOption="false"
                  v-decorator="decorators.memberId"
                  @search="onMemberSearch"
                  @change="onMemberChange"
                  notFoundContent="无搜索结果"
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
              </div>
            </template>
            <st-button :disabled="false" type="dashed" icon="add" block>
              添加卡成员
            </st-button>
          </a-popover>
        </td>
      </tr>
      <tr v-for="(item, index) in list" :key="index">
        <td>{{ item.name }}</td>
        <td>{{ item.mobile }}</td>
        <td><a>删除</a></td>
      </tr>
    </tbody>
  </st-form-table>
</template>
<script>
import { cloneDeep } from 'lodash-es'
export default {
  name: 'AddCardMember',
  bem: {
    b: 'page-add-card-member'
  },
  serviceInject() {
    return {
      saleMemberCardService: SaleMemberCardService
    }
  },
  rxState() {
    return {
      memberList: this.saleMemberCardService.memberList$
    }
  },
  props: {},
  data() {
    return {
      list: [
        {
          id: 1,
          name: 'test1',
          mobile: '18916752084'
        }
      ],
      memberSearchText: '',
      searchMemberIsShow: true
    }
  },
  computed: {},
  methods: {}
}
</script>

<template>
  <st-panel app>
    <div class="page-test-llf">
      <st-form>
        <a-row :gutter='8'>
          <a-col :offset='1'
            :lg='10'
            :xs='20'>
            <st-form-item label='测试1'
              offset='1'
              lg='10'>
              <a-input style='width:100%'
                placeholder='here'></a-input>
            </st-form-item>
          </a-col>
          <a-col :offset='1'
            :lg='10'
            :xs='20'>
            <st-form-item label='你好2'
              offset='1'
              lg='10'>
              <a-input placeholder='here'></a-input>
            </st-form-item>
          </a-col>
          <a-col :offset='1'
            :lg='10'
            :xs='20'>
            <st-form-item label='你好3'
              offset='1'
              lg='10'>
              <a-input placeholder='here'></a-input>
            </st-form-item>
          </a-col>
          <a-col :offset='1'
            :lg='10'
            :xs='20'>
            <st-form-item label='你好4'
              offset='1'
              lg='10'>
              <a-input placeholder='here'></a-input>
            </st-form-item>
          </a-col>
          <a-col :offset='1'
            :lg='10'
            :xs='20'>
            <st-form-item label='你好5'
              offset='1'
              lg='10'>
              <a-input placeholder='here'></a-input>
            </st-form-item>
          </a-col>
          <a-col :offset='1'
            :lg='10'
            :xs='20'>
            <st-form-item label='你好6'
              offset='1'
              lg='10'>
              <a-input placeholder='here'></a-input>
            </st-form-item>
          </a-col>
          <a-col :offset='1'
            :lg='10'
            :xs='20'>
            <st-form-item label='你好7'
              offset='1'
              lg='10'>
              <a-input placeholder='here'></a-input>
            </st-form-item>
          </a-col>
          <a-col :offset='1'
            :lg='10'
            :xs='20'>
            <st-form-item label='你好8'
              offset='1'
              lg='10'>
              <a-input placeholder='here'></a-input>
            </st-form-item>
          </a-col>
          <a-col :offset='1'
            :lg='10'
            :xs='20'>
            <st-form-item class='mg-b0'
              label='你好9'
              offset='1'
              lg='10'>
              <a-input placeholder='here'></a-input>
            </st-form-item>
          </a-col>
        </a-row>

      </st-form>
    </div>
  </st-panel>
</template>

<script>
import { ThemeService } from '@/services/theme.service'
import { LlfService } from '@/views/pages/test/llf.service'
import { RouteService } from '@/services/route.service'
import { MessageService } from '@/services/message.service'
import { Action } from 'rx-state'
import { switchMap, catchError, filter } from 'rxjs/operators'
import { EMPTY } from 'rxjs'

const columns = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left'
  },
  { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
  { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
  { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
  { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
  { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
  { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
  { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    scopedSlots: { customRender: 'action' }
  }
]

const data = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`
  })
}

export default {
  serviceInject() {
    return {
      themeService: ThemeService,
      messageService: MessageService,
      llfService: LlfService,
      route: RouteService
    }
  },
  data() {
    return {
      columns: columns,
      dataSource: data
    }
  },
  subscriptions() {
    this.submit$ = new Action(data$ =>
      data$.pipe(
        switchMap(data =>
          this.llfService.test(data).pipe(catchError(() => EMPTY))
        )
      )
    )
    return {
      query: this.route.query$,
      llfLoading: this.llfService.loading$,
      name: this.llfService.name$
    }
  },
  methods: {
    onUrlPush() {
      this.$router.push({ query: this.query })
    }
  }
}
</script>

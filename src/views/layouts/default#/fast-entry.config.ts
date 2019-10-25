import icon1 from '@/assets/img/fast-entry/1.png'
import icon1Disabled from '@/assets/img/fast-entry/1-disable.png'
import icon2 from '@/assets/img/fast-entry/2.png'
import icon3 from '@/assets/img/fast-entry/3.png'
import icon3Disabled from '@/assets/img/fast-entry/3-disable.png'
import icon4 from '@/assets/img/fast-entry/4.png'
import icon5 from '@/assets/img/fast-entry/5.png'
import icon5Disabled from '@/assets/img/fast-entry/5-disable.png'
import icon6 from '@/assets/img/fast-entry/6.png'
import icon7 from '@/assets/img/fast-entry/7.png'
import icon8 from '@/assets/img/fast-entry/8.png'
import icon9 from '@/assets/img/fast-entry/9.png'

export const entries = [
  {
    icon: icon1,
    iconDisabled: icon1Disabled,
    text: '帮助中心',
    openProgram: 'help',
    disabled: true
  },
  {
    icon: icon2,
    text: 'Udesk',
    disabled: false,
    openProgram: 'Udesk'
  },
  {
    icon: icon3,
    iconDisabled: icon3Disabled,
    text: '三体云管家',
    openProgram: 'housekeeper',
    disabled: true
  },
  {
    icon: icon4,
    text: '智能硬件',
    url: 'https://www.styd.cn/default/product_iot',
    disabled: false
  },
  {
    icon: icon5,
    iconDisabled: icon5Disabled,
    text: '小程序',
    openProgram: 'miniProgram',
    disabled: false
  },
  {
    icon: icon6,
    text: '导出中心',
    disabled: false,
    openProgram: 'export'
  },
  {
    icon: icon7,
    text: '智库',
    url: 'https://blog.styd.cn/',
    disabled: false
  },
  {
    icon: icon8,
    text: '数据中心',
    url: 'https://www.styd.cn/default/data_report',
    disabled: false
  },
  {
    icon: icon9,
    text: '行业白皮书',
    url: 'https://www.styd.cn/default/white_paper',
    disabled: false
  }
]

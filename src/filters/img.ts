import { AppConfig } from '@/constants/config'

const container = window.getContainer()
const appConfig = container.get(AppConfig)

interface Options {
  w?: string | number
  h?: string | number
}
export const imgFilter = (key: string, options: Options = {}) => {
  let imgUrl = `${appConfig.HOST_IMAGE}/${key}`
  let imageView = ''

  if (options.w) {
    imageView += `/w/${options.w}`
  }
  if (options.h) {
    imageView += `/h/${options.h}`
  }
  if (imageView) {
    imgUrl = imgUrl + '?imageView2/1' + imageView
  }
  return imgUrl
}

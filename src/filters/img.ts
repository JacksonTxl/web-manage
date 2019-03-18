import { appConfig } from '@/constants/config'

interface Options {
  w?: string | number
  h?: string | number
}
export const createImgFilter = (HOST_IMAGE: string) => (
  key: string,
  options: Options = {}
) => {
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

export const imgFilter = createImgFilter(appConfig.HOST_IMAGE)

function BrowserType() {
  const userAgent = navigator.userAgent
  const isOpera = userAgent.indexOf('Opera') > -1
  const isIE = userAgent.match('MSIE') ? true : false
  const isEdge = userAgent.indexOf('Edge') > -1
  const isFF = userAgent.indexOf('Firefox') > -1
  const isSafari =
    userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') == -1
  const isChrome =
    userAgent.indexOf('Chrome') > -1 &&
    userAgent.indexOf('Safari') > -1 &&
    !isEdge

  if (isIE) {
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    const fIEVersion = parseFloat(RegExp['$1'])
    if (userAgent.indexOf('MSIE 6.0') != -1) {
      return 'IE6'
    } else if (fIEVersion == 7) {
      return 'IE7'
    } else if (fIEVersion == 8) {
      return 'IE8'
    } else if (fIEVersion == 9) {
      return 'IE9'
    } else if (fIEVersion == 10) {
      return 'IE10'
    } else if (userAgent.toLowerCase().match(/rv:([\d.]+)\) like gecko/)) {
      return 'IE11'
    } else {
      return '0'
    }
  }

  if (isFF) {
    return 'FF'
  }
  if (isOpera) {
    return 'Opera'
  }
  if (isSafari) {
    return 'Safari'
  }
  if (isChrome) {
    return 'Chrome'
  }
  if (isEdge) {
    return 'Edge'
  }
}
export default BrowserType

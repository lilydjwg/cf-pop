function on_request(details) {
  const tabid = details.tabId
  if(tabid == -1) {
    return
  }

  let pop
  for(let header of details.responseHeaders) {
    // h2: cf-ray, h1.1: CF-RAY
    if(header.name.toLowerCase() == 'cf-ray') {
      const ray = header.value
      const parts = ray.split('-')
      pop = parts[parts.length-1]
      break
    }
  }

  if(pop) {
    // console.log(tabid, pop)
    browser.browserAction.setBadgeText({
      text: pop, tabId: tabid,
    })
    browser.browserAction.setIcon({
      path: 'icons/Cloudflare.svg', tabId: tabid,
    })
    const title = browser.i18n.getMessage(
      'title', browser.i18n.getMessage(pop),
    )
    browser.browserAction.setTitle({
      title: title, tabId: tabid,
    })
  }
}

// we need to use onCompleted because badget text is reset on navigation
browser.webRequest.onCompleted.addListener(
  on_request, 
  {urls: ['<all_urls>'], types: ['main_frame']},
  ['responseHeaders'],
)

browser.browserAction.setBadgeBackgroundColor({
  color: 'rgba(243, 128, 32, 0.5)',
})
browser.browserAction.setBadgeTextColor({
  color: '#fff',
})

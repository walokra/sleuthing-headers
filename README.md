sleuthing-headers
=======================

Creates Spring Sleuth headers for given request path.

# Usage

```javascript
const { createSleuthHeaders } = require('sleuthing-headers')

// Creates Spring Sleuth headers for given request path
const sleuthHeaders = createSleuthHeaders(req.path)
req.url = targetUri
httpProxyServer.web(req, res, {
    target: targetUri,
    headers: sleuthHeaders
})
```

const Int64 = require('node-int64')
const crypto = require('crypto')

const getUniqueId = () => {
  const random = new Int64(crypto.randomBytes(8))
  return random.toOctetString()
}

module.exports = {
  setSleuthHeaders: req => {
    if (!req) {
      throw Error('req is null')
    }
    req.setHeader('X-Span-Name', req.path)
    req.setHeader('X-B3-TraceId', getUniqueId())
    req.setHeader('X-B3-SpanId', getUniqueId())
  },

  createSleuthHeaders: (name) => {
    if (!name) {
      throw Error('X-Span-Name not given')
    }

    const sleuthId = getUniqueId()
    const spanId = getUniqueId()

    return {
      'X-Span-Name': name,
      'X-B3-TraceId': sleuthId,
      'X-B3-SpanId': spanId
    }
  }
}

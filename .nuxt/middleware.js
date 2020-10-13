const middleware = {}

middleware['getPage'] = require('../src/middleware/getPage.js')
middleware['getPage'] = middleware['getPage'].default || middleware['getPage']

export default middleware


const isPro = Object.is(process.env.NODE_ENV, 'development')

module.exports = {
  baseUrl: isPro ? 'http://localhost:1433/' : 'api/'
}

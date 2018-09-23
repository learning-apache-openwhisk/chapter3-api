const openwhisk = require('openwhisk')

function main (args) {
  let ow = openwhisk()
  return ow.activations.get({ name: args.id })
}

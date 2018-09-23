const openwhisk = require('openwhisk')

function main(args) {  
  let ow = openwhisk()    
  return ow.triggers.invoke({            
      name: "apidemo-trigger",                     
      params: args
  })
}

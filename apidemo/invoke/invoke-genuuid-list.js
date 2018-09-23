var openwhisk = require("openwhisk")
function main(args) {
    let ow = openwhisk()
    let count = args.n ? args.n : 3;
    let inv = { name: "apidemo/promise-genuuid", 
                blocking: true, 
                result: true
    }
    let promises = []
    for(let i=0; i< count; i++)
        promises.push(ow.actions.invoke(inv));
    return Promise.all(promises)
      .then(res => ({
            body: "<h1>UUIDs</h1><ul><li>"+
                   res.map(x=>x.uuid).join("</li><li>")+
                   "</li></ul>"
        }))
}

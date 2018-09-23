const openwhisk = require('openwhisk')

function main(args) {
    let ow = openwhisk()
    return ow.activations.get({
        name: args.activationId
    }).then(res => {
        console.log(res)
        let ids = res.logs.map(log => {
            let json = JSON.parse(log)
            return json.activationId
        })
        let pr = ids.map(id => ow.activations.result({ name: id }))
        return Promise.all(pr).then(results => 
            ({results: results.map(x => x.result) }))
    })
}

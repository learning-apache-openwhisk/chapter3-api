var openwhisk = require("openwhisk")

function main(args) {
    let ow = openwhisk()
    return ow.actions.invoke({
        name: "apidemo/promise-genuuid",
        result: true,
        blocking: true
    }).then(res => ({
         body: "<h1>UUID</h1>\n<pre>"+
		res.uuid+"</pre>"
    })).catch(err => {statusCode: 500})
}

var http = require("https")

function uuid(callback) {
   http.get("https://httpbin.org/uuid",
   function(res) {
     res.on('data', (data) => callback(undefined, JSON.parse(data).uuid))
   }).on("error", function(err) {
     callback(err)
   })
}

uuid(function(err, data) {
   if(err) console.log("ERROR:" +err)
   else console.log(data)
})


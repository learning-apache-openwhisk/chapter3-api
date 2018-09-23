var http = require("https")

function uuid() {
  return new Promise(function(resolve, reject){
    http.get("https://httpbin.org/uuid",
     function(res) {
      res.on('data', (data) => 
         resolve(JSON.parse(data).uuid)) 
      }).on("error", function(err) {
         reject(err) 
      })
  })
}


function main() {
    return uuid()
      .then( data =>  ({"uuid": data}))
      .catch(err =>  ({"error": err}))
}

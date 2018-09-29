var dt = {
 fmtDate(d) {
   let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
   if (month.length < 2) month = '0' + month;
   if (day.length < 2) day = '0' + day;
   return year + "/" + month + "/" + day
 },

 fmtTime(d) {
  let hour =  ''+ d.getHours(),
      minute = '' + d.getMinutes()
      second = '' + d.getSeconds()

  if(hour.length < 2) hour = "0"+hour
  if(minute.length < 2) minute = "0"+minute
  if(second.length <2 ) second = "0"+second
  
  return hour + ":" + minute + ":" + second
 }
}

function main(args) { 
    let now = args.millis ? new Date(args.millis) : new Date()
    let res = " "
    if(args.date)
      res = dt.fmtDate(now) + res
    if(args.time)
      res = res + dt.fmtTime(now)
    console.log(res)
    return {     
      body: res
    }
  }
  
  exports.main = main
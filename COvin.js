const got = require('got');
var importedMailer = require('./NotifyByMail');
var importedDbUtil = require('./dbUtil');
var moment = require('moment');

async function callAPI() {
  var currentDate = moment().format(("DD-MM-YYYY"));
  var url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=76&date=${currentDate}`;
  let response = await got.get(url);
  console.log(response.statusCode);
  var centreList = JSON.parse(response.body);
  var centerWithAvailablility = [];
  for(let i = 0; i <= centreList.centers.length;i++){
    var sessions = centreList.centers[i]?.sessions;
    for(let j = 0; j <= sessions?.length; j++) {
      if(sessions?.[j]?.min_age_limit >= 45 && sessions?.[j]?.available_capacity > 0) {
      console.log('vaccine available');
      console.log(centreList?.centers?.[i].pincode);
      var location = {"address": centreList?.centers?.[i].address, "pincode":centreList?.centers?.[i].pincode};
      centerWithAvailablility.push(location);
      break;
      }
    }
  }
  if(centerWithAvailablility.length > 0) {
    var user = [];
    var res = await importedDbUtil.retrieveUserIdObjects();
    user = res.map((user) => user.emailId);
    importedMailer.mailObj.to = String(user);
    importedMailer.mailObj.subject = 'vaccine available';
    importedMailer.mailObj.html = JSON.stringify(centerWithAvailablility, null, 2);
    console.log(importedMailer.mailObj.html);
    await importedMailer.sendEmail(importedMailer.mailObj);
  }
  console.log('call completed');
}
setInterval(callAPI, 30000 );
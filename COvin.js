var request = require('request');
var moment = require('moment');
function callAPI() {
var currentDate = moment().format(("DD-MM-YYYY"));
var url = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=294&date='+currentDate;
console.log(url);
var options = {
  'method': 'GET',
  'url': url,
  'headers': {
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  var centreList = JSON.parse(response.body);
  for(let i = 0; i <= centreList.centers.length;i++){
	  var sessions = centreList.centers[i]?.sessions;
	  for(let j = 0; j <= sessions?.length; j++) {
		  if(sessions?.[j]?.min_age_limit < 45 && sessions?.[j]?.available_capacity > 0) {
			 console.log('vaccine available');
			 console.log(centreList?.centers?.[i].pincode);
		  }
	  }
  }
  console.log('call completed');
});
}
setInterval(callAPI, 30000 );
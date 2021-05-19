import get from 'got';
import { sendEmail, mailObj} from './NotifyByMail';
import { retrieveUserIdObjects } from './dbUtil';
import moment from 'moment';

async function callAPI() {
  var currentDate = moment().format(("DD-MM-YYYY"));
  var url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=74&date=${currentDate}`;
  let response = await get(url);
  var centreList = JSON.parse(response.body);
  var centerWithAvailablility = [];
  for(let i = 0; i < centreList.centers.length;i++){
    var sessions = centreList.centers[i].sessions;
    for(let j = 0; j < sessions.length; j++) {
      if(sessions[j].min_age_limit >= 18 && sessions[j].available_capacity > 0) {
      console.log('vaccine available');
      console.log(centreList.centers[i].pincode);
      var location = {"address": centreList.centers[i].address, "pincode":centreList.centers[i].pincode};
      centerWithAvailablility.push(location);
      break;
      }
    }
  }
  if(centerWithAvailablility.length > 0) {
    var user:any = [];
    var res:any = await retrieveUserIdObjects();
    user = res.map((user_:any) => user_.emailId);
    mailObj.to = String(user);
    mailObj.subject = 'vaccine available';
    mailObj.html = JSON.stringify(centerWithAvailablility, null, 2);
    await sendEmail(mailObj);
  }
  console.log('call completed');
}
setInterval(callAPI, 30000 );
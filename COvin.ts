import get from 'got';
import { sendEmail, mailObj} from './NotifyByMail';
import { retrieveUserIdObjects } from './dbUtil';
import moment from 'moment';

const _ = require('lodash');

async function callAPI() {
  var currentDate = moment().format(("DD-MM-YYYY"));
  var url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=74&date=${currentDate}`;
  let response = await get(url);
  var centreList = JSON.parse(response.body);
  var centerWithAvailablility: any[] = [];
  _.each(centreList.centers, function(center:any) {
    var sessions = center.sessions;
    _.each(sessions, function(session: any){
      if(session.min_age_limit >= 18 && session.available_capacity > 0) {
        console.log('vaccine available');
        console.log(center.pincode);
        var location = {"address": center.address, "pincode":center.pincode};
        centerWithAvailablility.push(location);
        return false;
      }
    });
  });
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
import get from 'got';
import { sendEmail, mailObj } from './NotifyByMail';
import { retrieveUserIdObjects } from './dbUtil';
import moment from 'moment';

const _ = require('lodash');

async function callAPI() {
  let currentDate = moment().format(("DD-MM-YYYY"));
  let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=76&date=${currentDate}`;
  let response = await get(url);
  const centreList = JSON.parse(response.body);
  console.log(`total no. centers ${centreList.centers.length}`)
  let centerWithAvailablility: any[] = [];
  _.each(centreList.centers, function (center: any) {
    const sessions = center.sessions;
    _.each(sessions, function (session: any) {
      if (session.min_age_limit >= 18 && session.available_capacity > 0) {
        console.log('vaccine available');
        console.log(center.pincode);
        var location = { "address": center.address, "pincode": center.pincode };
        centerWithAvailablility.push(location);
        return false;
      }
    });
  });
  if (centerWithAvailablility.length > 0) {
    let user: any = [];
    const res: any = await retrieveUserIdObjects();
    user = res.map((user_: any) => user_.emailId);
    mailObj.to = String(user);
    mailObj.subject = 'vaccine available';
    mailObj.html = JSON.stringify(centerWithAvailablility, null, 2);
    await sendEmail(mailObj);
  }
  else 
    console.log('vaccines are not available: please try again');
  console.log('call completed');
}
setInterval(callAPI, 30000);
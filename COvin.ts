import get from 'got';
import { sendEmail, mailObj } from './NotifyByMail';
import { retrieveUserIdObjects } from './dbUtil';
import moment from 'moment';
const _ = require('lodash');

let userData : Record<number, Array<string>>;

async function populateUserData() {
  userData = {};
  const res: any = await retrieveUserIdObjects();
  res.forEach((ele: any) => {
    if(userData[ele.district]){
      userData[ele.district].push(ele.emailId);
    }
    else {
      userData[ele.district] = [];
      userData[ele.district].push(ele.emailId);
    }
  });
}

export async function callAPI() {
  let currentDate = moment().format(("DD-MM-YYYY"));
  await populateUserData();
  for(let distObj in userData) {
    console.log(`checking in district ${distObj}`);
    let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${distObj}&date=${currentDate}`;
    let response = await get(url);
    const centreList = JSON.parse(response.body);
    console.log(`total no. centers ${centreList.centers.length}`);
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
      mailObj.to = String(userData[Number(distObj)]);
      console.log(mailObj.to);
      mailObj.subject = 'vaccine available';
      mailObj.html = JSON.stringify(centerWithAvailablility, null, 2);
      // await sendEmail(mailObj);
    }
    else 
      console.log('vaccines are not available: please try again');
  }
  console.log('call completed');
}
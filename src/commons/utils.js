import update from 'immutability-helper';
import axios from 'axios';
import qs from 'qs';

export const HandleInputChange = function HandleInputChange(event) {
  const { target } = event;
  const value = target.type === 'checkbox' ?
    target.checked :
    target.value;
  const { name } = target;

  this.setState(prvState =>
    update(prvState, {
      values: {
        [name]: {
          $set: value,
        },
      },
    }));
};

export const HandleCloseModal = function HandleCloseModal() {
  this.setState(prvState =>
    update(prvState, {
      modal: {
        open: {
          $set: false,
        },
      },
    }));
};

export const HandleSendSMS = function HandleSendSMS(bVmobile, sType) {
  if (bVmobile) {
    this.setState(prvState =>
      update(prvState, {
        form: {
          ready: {
            $set: false,
          },
        },
      }));
    const url = 'http://game.weiplus5.com/index.php?m=sms&f=sms&v=sendsms';
    const options = {
      method: 'POST',
      withCredentials: true,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json',
      },
      data: qs.stringify({
        type: sType,
        mobile: this.state.values.mobile,
      }),
      url,
    };
    axios(options).then((response) => {
      // console.log(response.data);
      // console.log(response.status);
      // console.log(response.statusText);
      // console.log(response.headers);
      // console.log(response.config);
      const oResult = response.data;
      if (parseInt(oResult.status, 10) >= 0) {
        this.setState(prvState =>
          update(prvState, {
            errors: {
              smscode: {
                invalid: {
                  $set: false,
                },
              },
            },
          }));
      } else {
        this.setState(prvState =>
          update(prvState, {
            modal: {
              open: {
                $set: true,
              },
              msg: {
                $set: oResult.reason,
              },
            },
            form: {
              ready: {
                $set: true,
              },
            },
          }));
      }
    });
  }
};

export default {};

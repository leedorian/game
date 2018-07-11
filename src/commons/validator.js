import update from 'immutability-helper';

export const MobileValidator = function MobileValidator(oVmobile) {
  const bVmobile = oVmobile.valid;
  const bVmobileFormat = oVmobile.patternMismatch;
  const bVmobileMissing = oVmobile.valueMissing;
  if (bVmobileMissing) {
    this.setState(prvState =>
      update(prvState, {
        errors: {
          mobile: {
            $set: {
              invalid: true,
              msg: '请输入手机号码！',
            },
          },
        },
      }));
  } else if (bVmobileFormat) {
    this.setState(prvState =>
      update(prvState, {
        errors: {
          mobile: {
            $set: {
              invalid: true,
              msg: '电话号码有误！',
            },
          },
        },
      }));
  } else {
    this.setState(prvState =>
      update(prvState, {
        errors: {
          mobile: {
            $set: {
              invalid: false,
              msg: '',
            },
          },
        },
      }));
  }
  return bVmobile;
};

export const SMSValidator = function SMSValidator(oVsmscode) {
  const bVsmscode = oVsmscode.valid;
  const bVsmscodeMissing = oVsmscode.valueMissing;
  if (bVsmscodeMissing) {
    this.setState(prvState =>
      update(prvState, {
        errors: {
          smscode: {
            $set: {
              invalid: true,
              msg: '请输入验证码！',
            },
          },
        },
      }));
  } else {
    this.setState(prvState =>
      update(prvState, {
        errors: {
          smscode: {
            $set: {
              invalid: false,
              msg: '',
            },
          },
        },
      }));
  }
  return bVsmscode;
};

export const PasswordValidator = function PasswordValidator(oVpassword) {
  const bVpassword = oVpassword.valid;
  const bVPasswordFormat = oVpassword.patternMismatch;
  const bVpasswordMissing = oVpassword.valueMissing;
  if (bVpasswordMissing) {
    this.setState(prvState =>
      update(prvState, {
        errors: {
          password: {
            $set: {
              invalid: true,
              msg: '请输入密码！',
            },
          },
        },
      }));
  } else if (bVPasswordFormat) {
    this.setState(prvState =>
      update(prvState, {
        errors: {
          password: {
            $set: {
              invalid: true,
              msg: '密码为6到20位！',
            },
          },
        },
      }));
  } else {
    this.setState(prvState =>
      update(prvState, {
        errors: {
          password: {
            $set: {
              invalid: false,
              msg: '',
            },
          },
        },
      }));
  }
  return bVpassword;
};

export const PasswordConfirmValidator =
function PasswordConfirmValidator(bVpassword, oVpwdconfirm) {
  const bVpwdconfirmMissing = oVpwdconfirm.valueMissing;
  const bVpwdconfirmNotSame = (() => {
    if (bVpassword) {
      return this.state.values.password !== this.state.values.pwdconfirm;
    }
    return false;
  })();
  const bVpwdconfirm = oVpwdconfirm.valid && !bVpwdconfirmNotSame;

  if (bVpwdconfirmMissing) {
    this.setState(prvState =>
      update(prvState, {
        errors: {
          pwdconfirm: {
            $set: {
              invalid: true,
              msg: '请再次输入密码！',
            },
          },
        },
      }));
  } else if (bVpwdconfirmNotSame) {
    this.setState(prvState =>
      update(prvState, {
        errors: {
          pwdconfirm: {
            $set: {
              invalid: true,
              msg: '两次密码不同！',
            },
          },
        },
      }));
  } else {
    this.setState(prvState =>
      update(prvState, {
        errors: {
          pwdconfirm: {
            $set: {
              invalid: false,
              msg: '',
            },
          },
        },
      }));
  }
  return bVpwdconfirm;
};

export default {};

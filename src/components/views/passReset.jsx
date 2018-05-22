import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import qs from 'qs';
import update from 'immutability-helper';
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import Loading from 'react-loading-overlay';

import {
  MobileValidator,
  SMSValidator,
  PasswordValidator,
  PasswordConfirmValidator,
} from '../../commons/validator';
import {
  HandleInputChange,
  HandleCloseModal,
  HandleSendSMS,
} from '../../commons/utils';
import SMS from '../sms';

export default class PassReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        mobile: '',
        smscode: '',
        password: '',
        pwdconfirm: '',
      },
      errors: {
        mobile: {
          invalid: false,
          msg: '',
        },
        smscode: {
          invalid: false,
          msg: '',
        },
        password: {
          invalid: false,
          msg: '',
        },
        pwdconfirm: {
          invalid: false,
          msg: '',
        },
      },
      modal: {
        msg: '',
        open: false,
      },
      form: {
        busy: false,
      },
    };
    this.handleInputChange = HandleInputChange.bind(this);
    this.handleCloseModal = HandleCloseModal.bind(this);
    this.handleSendSMS = this.handleSendSMS.bind(this);
    this.handleButtonRegister = this.handleButtonRegister.bind(this);
    this.handleButtonLogin = this.handleButtonLogin.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleButtonLogin() {
    this.props.history.push('/Login');
  }
  handleButtonRegister() {
    this.props.history.push('/Register');
  }
  handleReset(event) {
    if (this.validateForm()) {
      this.setState(prvState =>
        update(prvState, {
          form: {
            busy: {
              $set: true,
            },
          },
        }));
      const url = 'http://game.weiplus5.com/index.php?m=member&f=index&v=public_mregister';
      const options = {
        method: 'POST',
        withCredentials: true,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        data: qs.stringify(this.state.values),
        url,
      };
      axios(options).then((response) => {
        // console.log(response.data);
        // console.log(response.status);
        // console.log(response.statusText);
        // console.log(response.headers);
        // console.log(response.config);
        const oResult = response.data;
        if (parseInt(oResult.status, 10) > 0) {
          window.location.href = '/game.html';
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
                busy: {
                  $set: false,
                },
              },
            }));
        }
      });
    }
    event.preventDefault();
  }
  handleSendSMS() {
    HandleSendSMS.call(this, MobileValidator.call(this, this.refmobile.validity), 2);
  }
  validateForm() {
    const bVmobile = MobileValidator.call(this, this.refmobile.validity);
    const bVsmscode = SMSValidator.call(this, this.refsmscode.validity);
    const bVpassword = PasswordValidator.call(this, this.refPassword.validity);
    const bVpwdconfirm = PasswordConfirmValidator.call(
      this,
      this.refPassword.validity,
      this.refPwdConfirm.validity,
    );

    return bVmobile && bVsmscode && bVpassword && bVpwdconfirm;
  }

  render() {
    return (
      <Loading
        active={this.state.form.busy}
        spinner
      >
        <Container className="main-container p-3">
          <div className="d-flex justify-content-center">
            <h1>找回密码</h1>
          </div>
          <Row>
            <Col>
              <form noValidate="noValidate" onSubmit={this.handleReset}>
                <FormGroup>
                  <Label for="mobile">手机号</Label>
                  <Input
                    name="mobile"
                    innerRef={(c) => {
                      this.refmobile = c;
                    }}
                    required="required"
                    invalid={this.state.errors.mobile.invalid}
                    id="mobile"
                    value={this.state.values.mobile}
                    pattern="^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$"
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>
                    {this.state.errors.mobile.msg}
                  </FormFeedback>
                </FormGroup>
                <SMS
                  invalid={this.state.errors.smscode.invalid}
                  smscode={this.state.values.smscode}
                  onChange={this.handleInputChange}
                  onSend={this.handleSendSMS}
                  innerRef={(c) => {
                    this.refsmscode = c;
                  }}
                  msg={this.state.errors.smscode.msg}
                />
                <FormGroup>
                  <Label for="password">密码</Label>
                  <Input
                    type="password"
                    innerRef={(c) => {
                      this.refPassword = c;
                    }}
                    invalid={this.state.errors.password.invalid}
                    required="required"
                    name="password"
                    value={this.state.values.password}
                    onChange={this.handleInputChange}
                    pattern=".{6,20}"
                  />
                  <FormFeedback>
                    {this.state.errors.password.msg}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="password">再次输入密码</Label>
                  <Input
                    type="password"
                    innerRef={(c) => {
                      this.refPwdConfirm = c;
                    }}
                    invalid={this.state.errors.pwdconfirm.invalid}
                    required="required"
                    name="pwdconfirm"
                    value={this.state.values.pwdconfirm}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>
                    {this.state.errors.pwdconfirm.msg}
                  </FormFeedback>
                </FormGroup>
                <Button color="primary" disabled={this.state.form.busy} type="submit" block>完成</Button>
              </form>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="d-flex justify-content-center">
                <Button color="link" onClick={this.handleButtonRegister}>没有账户，快速注册</Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="d-flex justify-content-center">
                <Button color="link" onClick={this.handleButtonLogin}>返回登录</Button>
              </div>
            </Col>
          </Row>
          <Modal isOpen={this.state.modal.open}>
            <ModalHeader>
              找回密码
            </ModalHeader>
            <ModalBody>
              {this.state.modal.msg}
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.handleCloseModal}>确定</Button>
            </ModalFooter>
          </Modal>
        </Container>
      </Loading>
    );
  }
}
PassReset.propTypes = {
  history: PropTypes.object.isRequired,
};

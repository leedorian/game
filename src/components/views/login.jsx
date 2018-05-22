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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormFeedback,
} from 'reactstrap';
import Loading from 'react-loading-overlay';
import {
  MobileValidator,
  PasswordValidator,
} from '../../commons/validator';

import {
  HandleInputChange,
  HandleCloseModal,
} from '../../commons/utils';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        username: '',
        password: '',
        remember: false,
      },
      errors: {
        mobile: {
          invalid: false,
          msg: '',
        },
        password: {
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
    this.handleButtonRegister = this.handleButtonRegister.bind(this);
    this.handleButtonPassReset = this.handleButtonPassReset.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleButtonRegister() {
    this.props.history.push('/Register');
  }
  handleButtonPassReset() {
    this.props.history.push('/PassReset');
  }
  handleLogin(event) {
    if (this.validateForm()) {
      this.setState(prvState =>
        update(prvState, {
          form: {
            busy: {
              $set: true,
            },
          },
        }));
      const url = 'http://game.weiplus5.com/index.php?m=member&f=index&v=public_mlogin';
      const options = {
        method: 'POST',
        withCredentials: true,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Content-Type': 'application/json',
        },
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
        if (parseInt(oResult.status, 10) >= 0) {
          window.location.href = './game.html';
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

  validateForm() {
    const bVmobile = MobileValidator.call(this, this.refmobile.validity);
    const bVpassword = PasswordValidator.call(this, this.refPassword.validity);
    return bVmobile && bVpassword;
  }

  render() {
    return (
      <Loading
        active={this.state.form.busy}
        spinner
      >
        <Container className="main-container p-3">
          <div className="d-flex justify-content-center">
            <h1>登录</h1>
          </div>
          <Row>
            <Col>
              <form noValidate="noValidate" onSubmit={this.handleLogin}>
                <FormGroup>
                  <Label for="mobile">手机号</Label>
                  <Input
                    name="username"
                    innerRef={(c) => {
                      this.refmobile = c;
                    }}
                    required="required"
                    invalid={this.state.errors.mobile.invalid}
                    id="mobile"
                    value={this.state.values.username}
                    pattern="^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$"
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>
                    {this.state.errors.mobile.msg}
                  </FormFeedback>
                </FormGroup>
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
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" />{' '}
                    自动登录
                  </Label>
                </FormGroup>
                <Button className="mt-3" color="primary" disabled={this.state.form.busy} type="submit" block>登录</Button>
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
                <Button color="link" onClick={this.handleButtonPassReset}>找回密码</Button>
              </div>
            </Col>
          </Row>
          <Modal isOpen={this.state.modal.open}>
            <ModalHeader>
              登录
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
Login.propTypes = {
  history: PropTypes.object.isRequired,
};

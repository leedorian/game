import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

import {
  Button,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  InputGroup,
  FormFeedback,
} from 'reactstrap';

export default class SMS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 30,
      busy: false,
    };
    this.handleSendSMS = this.handleSendSMS.bind(this);
  }
  handleSendSMS() {
    const countDown = setInterval(() => {
      const nCount = this.state.count;
      if (nCount === 0) {
        clearInterval(countDown);
        this.setState(prvState =>
          update(prvState, {
            busy: {
              $set: false,
            },
            count: {
              $set: 30,
            },
          }));
      } else {
        this.setState(prvState =>
          update(prvState, {
            count: {
              $set: nCount - 1,
            },
            busy: {
              $set: true,
            },
          }));
      }
    }, 1000);
    this.props.onSend();
  }
  render() {
    const {
      innerRef,
      invalid,
      smscode,
      onChange,
      msg,
    } = this.props;
    return (
      <FormGroup>
        <Label for="smscode">验证码</Label>
        <InputGroup>
          <Input
            innerRef={innerRef}
            invalid={invalid}
            required="required"
            name="smscode"
            value={smscode}
            onChange={onChange}
          />
          <InputGroupAddon addonType="append">
            <Button type="button" disabled={this.state.busy} onClick={this.handleSendSMS}>发送验证码
              {
                this.state.busy ? `(${this.state.count})` : ''
              }
            </Button>
          </InputGroupAddon>
          <FormFeedback>
            {msg}
          </FormFeedback>
        </InputGroup>
      </FormGroup>
    );
  }
}

SMS.propTypes = {
  invalid: PropTypes.bool,
  smscode: PropTypes.string,
  onSend: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]).isRequired,
  msg: PropTypes.string,
};
SMS.defaultProps = {
  invalid: false,
  smscode: '',
  msg: '',
};

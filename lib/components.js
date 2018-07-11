'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeerList = exports.InputArea = exports.BeerListContainer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BeerListContainer = exports.BeerListContainer = function (_Component) {
  _inherits(BeerListContainer, _Component);

  function BeerListContainer(props) {
    _classCallCheck(this, BeerListContainer);

    var _this = _possibleConstructorReturn(this, (BeerListContainer.__proto__ || Object.getPrototypeOf(BeerListContainer)).call(this, props));

    _this.state = {
      beers: []
    };
    return _this;
  }

  _createClass(BeerListContainer, [{
    key: 'addItem',
    value: function () {
      function addItem(name) {
        this.setState({
          beers: (0, _immutable.List)([name])
        });
      }

      return addItem;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        return _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(InputArea, null),
          _react2['default'].createElement(BeerList, null)
        );
      }

      return render;
    }()
  }]);

  return BeerListContainer;
}(_react.Component);

var InputArea = exports.InputArea = function () {
  function InputArea() {
    return _react2['default'].createElement('input', null);
  }

  return InputArea;
}();

var BeerList = exports.BeerList = function () {
  function BeerList() {
    return _react2['default'].createElement('ul', null);
  }

  return BeerList;
}();
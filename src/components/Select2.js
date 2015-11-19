import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import 'select2';

export default class Select2 extends Component {
  static propTypes = {
    data: PropTypes.array,
    events: PropTypes.array,
    options: PropTypes.object,
    multiple: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onSelect: PropTypes.func,
    onChange: PropTypes.func,
    onUnselect: PropTypes.func,
  }

  static defaultProps = {
    data: [],
    events: [
      ['change', 'onChange'],
      ['select2:open', 'onOpen'],
      ['select2:close', 'onClose'],
      ['select2:select', 'onSelect'],
      ['select2:unselect', 'onUnselect'],
    ],
    options: {},
    multiple: false,
  }

  constructor(props) {
    super(props);
    this.el = null;
  }

  componentDidMount() {
    this.el = $(ReactDOM.findDOMNode(this));
    this.el.select2(this.props.options);

    this.props.events.forEach(event => {
      this.el.on(event[0], this.props[event[1]]);
    });
  }

  componentWillUnmount() {
    this.el.select2('destroy');
  }

  render() {
    return (
      <select multiple={this.props.multiple}>
        {this.props.data.map((item, k) => {
          return (<option key={'option-' + k}>{item}</option>);
        })}
      </select>
    );
  }
}
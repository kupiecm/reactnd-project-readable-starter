import React, { Component } from 'react';
import { Button, Tooltip } from 'reactstrap';


export default class ToolTipItem extends Component {

  state = {
    tooltipOpen: false
  };

  toggle () {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render () {
    const { id, icon, handler, value } = this.props;
    return (
      <span>
        <Button
          id={id}
          className="btn-comment-edit"
          onClick={handler}>
          <i className={`fa ${icon}`}></i>
        </Button>
        <Tooltip
          placement={'auto'}
          isOpen={this.state.tooltipOpen}
          target={id}
          toggle={this.toggle.bind(this)}>
          {value}
        </Tooltip>
      </span>
    )
  }
};
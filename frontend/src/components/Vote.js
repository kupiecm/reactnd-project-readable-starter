import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { vote } from '../actions';

class Vote extends Component {

  vote (option) {
    const { item, type, dispatch } = this.props;
    dispatch(vote(item, option, type));
  };

  render () {
    const { item } = this.props;
    return (
      <div className="col text-muted">
        <Button
          outline className="btn-comment"
          onClick={() => {
            this.vote('upVote');
          }}>
          <i className="fa fa-plus"></i>
        </Button>
        <i className="fa fa-star" aria-hidden="true"></i>
        <span className="text-muted voteScore">{item.voteScore}</span>
        <Button outline className="btn-comment"
                onClick={() => {
                  this.vote('downVote');
                }}>
          <i className="fa fa-minus"></i>
        </Button>
      </div>
    );
  }
}

function mapStateToProps (state, ownProps) {
  return {
    item: ownProps.item,
    type: ownProps.type
  }
}

export default connect(mapStateToProps)(Vote);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import * as ACTION from '../actions';
import * as API from '../utils/api';

class PostCtrlBtns extends Component {

  edit = () => {
    const { dispatch } = this.props;
  };

  remove = () => {
    const { selectedPost, dispatch } = this.props;

    API
      .removePost(selectedPost.id)
      .then(post => {
        dispatch(ACTION.removePost(post));
        dispatch(ACTION.selectPost(null));
      });
  };

  render () {
    const { selectedPost } = this.props;
    return (
      <div id="edit-ctrls" className="row text-right post-controls">
        <div className="col">
          <Link to={`/edit/${selectedPost.id}`}>
            <Button
              outline
              color="info">
              <i className="fa fa-edit"></i>
            </Button>
          </Link>
          <Button
            outline
            color="info"
            className="btn-order"
            onClick={this.remove}>
            <i className="fa fa-remove"></i>
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ postsCtrl, categoriesCtrl }) {
  return { selectedPost: postsCtrl.selectedPost };
}

export default connect(mapStateToProps)(PostCtrlBtns);
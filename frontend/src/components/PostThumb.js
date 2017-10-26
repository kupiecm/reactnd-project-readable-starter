import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Button, CardTitle, CardText } from 'reactstrap';

import Vote from './Vote';

import { trim } from '../utils/helpers';

class PostThumb extends Component {

  render () {

    const { post } = this.props;

    return (
      <div className="row">
        <div className="separator-30"></div>
        <Card body className="text-center">

          <CardTitle>{trim(post.title)}</CardTitle>
          <div className="row">
            <div className="col"></div>
            <div className="col text-center">
              <small className="text-muted">
                <Vote item={post} type="posts"/>
              </small>
            </div>
            <div className="col text-center">
              <small className="text-muted">
                <i className="fa fa-comment" aria-hidden="true"></i>
                <span className="voteScore">{post.timestamp}</span>
              </small>
            </div>
            <div className="col"></div>
          </div>
          <div className="separator-30"></div>
          <CardText>{trim(post.body)}</CardText>
          <div>
            <Link
              to={`/post/${post.id}`}>
              <Button color="info" className="col-4">More</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }
}

export default connect()(PostThumb);
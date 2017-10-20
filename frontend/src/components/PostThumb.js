import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Button, CardTitle, CardText } from 'reactstrap';

import { selectPost } from '../actions';
import { trim } from '../utils/helpers';

class PostThumb extends Component {

  render () {

    const { post } = this.props;

    return (
      <div className="row">
        <div className="separator-30"></div>
        <Card body className="text-center">
          <CardTitle>{trim(post.title)}</CardTitle>
          <CardText>{trim(post.body)}</CardText>
          <div>
            <Link
              to={`/post/${post.id}`}
              onClick={() => {
                this.props.dispatch(selectPost(post));
              }}>
              <Button color="info" className="col-4">More</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }
}

export default connect()(PostThumb);
import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

import Vote from '../Vote';
import { timestampToHuman } from '../../utils/helpers';

const Post = ({ post, comments }) => (
  <Card body outline color="info" className="text-center">
    <CardBody>
      <CardTitle>{post.title}</CardTitle>
      <CardSubtitle>
        <div className="row">
          <div className="col">
            <Vote item={post} type="posts"/>
          </div>
          <div className="col text-center">
            <small className="text-muted">
              <i className="fa fa-comment" aria-hidden="true"></i>
              <span className="voteScore">{comments ? comments.length : 0}</span>
            </small>
          </div>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col text-center">
            <small className="text-muted">@{post.author}</small>
          </div>
          <div className="col text-center">
            <small className="text-muted">{timestampToHuman(post.timestamp)}</small>
          </div>
          <div className="col"></div>
        </div>
      </CardSubtitle>
      <hr></hr>
      <div className="separator-50"></div>
      <CardText>{post.body}</CardText>
    </CardBody>
  </Card>
);

export default Post;
import React from 'react';
import { Button, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import Vote from './Vote';

import { timestampToHuman } from '../utils/helpers';

const Post = ({ post }) => (
  <Card body outline color="info" className="text-center">
    <CardBody>
      <CardTitle>{post.title}</CardTitle>
      <CardSubtitle>
        <div className="row">
          <Vote item={post} type="posts"/>
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
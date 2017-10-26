import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import uuid from 'uuid';

import * as API from '../utils/api';
import * as ACTION from '../actions';

class AddEditPostView extends Component {

  state = {
    title: '',
    author: '',
    body: '',
    timestamp: '',
    category: '',
    fetchingData: false
  };

  componentWillMount () {

    const { selectedPost } = this.props;
    if (selectedPost) {
      this.setState({
        title: selectedPost.title,
        author: selectedPost.author,
        body: selectedPost.body,
        category: selectedPost.category
      });
    }
  }

  handleChange (e) {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.selectedPost ? this.edit() : this.add();
  };

  add = () => {
    const { title, author, body, category } = this.state;
    let newPost = { title, author, body, category };
    newPost['id'] = uuid.v4();
    newPost['timestamp'] = (new Date()).getTime();

    this.setState({ fetchingData: true });
    API
      .addPost(newPost)
      .then(post => {
        this.props.dispatch(ACTION.addPost(post));
        this.reset();
        this.setState({ fetchingData: false });
      });
  };

  edit = () => {
    const { title, body } = this.state;
    let { selectedPost } = this.props;
    selectedPost.title = title;
    selectedPost.body = body;
    selectedPost.timestamp = (new Date()).getTime();

    this.setState({ fetchingData: true });
    API
      .editPost(selectedPost)
      .then(post => {
        this.props.dispatch(ACTION.editPost(post));
        this.reset();
        this.setState({ fetchingData: false });
      });
  };

  reset = () => {
    this.setState({
      title: '',
      author: '',
      body: '',
      timestamp: '',
      category: ''
    })
  };

  render () {

    const { fetchingData } = this.state;
    const { selectedPost, categories } = this.props;
    return (

      <section className="container">
        {fetchingData
          ? <Loading delay={200} type='spin' color='#222' className='loading'/>
          : <div>
            <div className="separator-50"></div>
            <h2 className="text-center text-muted">Add a new post</h2>
            <div className="separator-50"></div>
            <div className="col add-comment-form">
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup row>
                  <div className="col">
                    <Label for="post">Post</Label>
                    <Input
                      type="textarea"
                      name="body"
                      id="body"
                      placeholder="Post body..."
                      value={this.state.body}
                      onChange={this.handleChange.bind(this)}/>
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className="row">
                    <div className="col">
                      <Label for="author">Author</Label>
                      <Input
                        type="text"
                        name="author"
                        id="author"
                        placeholder="Enter your nickname..."
                        disabled={selectedPost}
                        value={this.state.author}
                        onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="col">
                      <Label for="title">Title</Label>
                      <Input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Enter the title..."
                        value={this.state.title}
                        onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="col">
                      <Label for="category">Category</Label>
                      <Input
                        type="select"
                        name="category"
                        id="category"
                        placeholder="Pick a category..."
                        disabled={selectedPost}
                        value={this.state.category}
                        onChange={this.handleChange.bind(this)}>
                        {categories && categories.map(c => (
                          <option key={c.name}>{c.name}</option>
                        ))}
                      </Input>
                    </div>
                  </div>
                  <div className="separator-50"></div>
                  <div className="row">
                    <div className="col">
                      <Button color="info" className="col">Submit</Button>
                    </div>
                  </div>
                </FormGroup>
              </Form>
            </div>
          </div>
        }
      </section>
    );
  }
}

function mapStateToProps ({ postsCtrl, categoriesCtrl }) {
  return {
    posts: postsCtrl.posts,
    selectedPost: postsCtrl.selectedPost,
    categories: categoriesCtrl.categories
  }
}

export default connect(mapStateToProps)(AddEditPostView);
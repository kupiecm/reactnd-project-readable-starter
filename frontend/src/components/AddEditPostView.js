import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading'
import { Form, FormGroup, Input, Button } from 'reactstrap';

import * as API from '../utils/api';
import { timestampToHuman } from '../utils/helpers';
import { loadPosts, loadCategories } from '../actions';


class AddEditPostView extends Component {

  state = {
    post: null,
    fetchingData: false
  };

  handleChange (e) {
    e.preventDefault();
    // this.setState({ [e.target.id]: e.target.value })
  }

  handleSubmit (e) {
    // const { addComment } = this.props;
    e.preventDefault();

  };

  add = () => {
  };

  edit = () => {
  };

  render () {

    const { post, fetchingData } = this.state;
    const { posts, categories } = this.props;
    return (

      <section className="container">
        {fetchingData === true
          ? <Loading delay={200} type='spin' color='#222' className='loading'/>
          : <div>
            <div className="separator-50"></div>
            <div className="col add-comment-form">
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup row>
                  <div className="col">
                    <Input
                      type="textarea"
                      name="body"
                      id="body"
                      placeholder="Start the discussion..."
                      value={this.state.body}
                      onChange={this.handleChange.bind(this)}/>
                  </div>
                </FormGroup>
                <FormGroup row>
                  <div className="col">
                    <Input
                      type="text"
                      name="author"
                      id="author"
                      placeholder="Enter your nickname..."
                      value={this.state.author}
                      onChange={this.handleChange.bind(this)}/>
                  </div>
                  <div className="col">
                    <Input
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Enter the title..."
                      value={this.state.title}
                      onChange={this.handleChange.bind(this)}/>
                  </div>
                  <div className="col">
                    <Input
                      type="select"
                      name="category"
                      id="category"
                      placeholder="Pick a category..."
                      value={this.state.category}
                      onChange={this.handleChange.bind(this)}>
                      {categories && categories.map(c => (
                        <option>{c.name}</option>
                      ))}
                    </Input>
                  </div>
                  <div className="col text-right">
                    <Button color="info">Submit</Button>
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
    categories: categoriesCtrl.categories
  }
}

export default connect(mapStateToProps)(AddEditPostView);
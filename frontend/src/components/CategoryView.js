import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from 'react-loading'
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { ControlButtons } from './ControlButtons';

import { compareFcn } from '../utils/helpers';

import PostThumb from './PostThumb';

class CategoryView extends Component {

  state = {
    activeTab: 'all',
    compareField: 'voteScore',
    reverseOrder: false,
    fetchingData: false
  };

  toggle (tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  filterBy = (compareField) => {
    this.setState({ compareField });
  };

  changeOrder = () => {
    this.setState(() => ({ reverseOrder: !this.state.reverseOrder }));
  };

  componentDidUpdate(prevProps) {
    if(prevProps !== this.props)
      console.log(this.props);
  };

  render () {

    const { activeTab, fetchingData, compareField, reverseOrder } = this.state;
    const { posts, categories } = this.props;

    return (

      <div className="container">
        <ControlButtons
          reverseOrder={reverseOrder}
          onSelect={this.filterBy}
          changeOrder={this.changeOrder}
        />

        <div className="separator-30"></div>

        <Nav tabs>
          {categories && categories.map(category => (
            <NavItem key={category.name}>
              <NavLink
                className={classnames({ active: activeTab === category.name })}
                onClick={() => {
                  this.toggle(category.name);
                }}
              >
                {category.name}
              </NavLink>
            </NavItem>
          ))}
        </Nav>

        {fetchingData === true
          ? <Loading delay={200} type='spin' color='#222' className='loading'/>
          : <TabContent activeTab={activeTab}>
            {categories && categories.map(category => (
              <TabPane key={category.name} tabId={category.name}>
                <div className="col">
                  {posts && posts
                    .filter(post => category.name === 'all' || post.category === category.name)
                    .sort(compareFcn(compareField, reverseOrder))
                    .map(post => (
                      <PostThumb key={post.id} post={post}/>
                    ))}
                </div>
              </TabPane>
            ))}
          </TabContent>
        }
      </div>
    );
  }
}

function mapStateToProps ({ postsCtrl, categoriesCtrl }) {
  return {
    posts: postsCtrl.posts,
    categories: categoriesCtrl.categories
  }
}

// function mapDispatchToProps (dispatch) {
//   return {
//     loadPosts: (data) => dispatch(loadPosts(data)),
//     loadCategories: (data) => dispatch(loadCategories(data))
//   }
// }

export default connect(mapStateToProps)(CategoryView);


import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPostsIfNeeded, selectSubreddit, invalidateSubreddit } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

let AsyncApp = React.createClass({
  componentDidMount () {
    this.props.fetchPosts(this.props.selectedSubreddit)
  },

  // componentWillReceiveProps (nextProps) {
  //   if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
  //     const { fetchPosts, selectedSubreddit } = nextProps
  //     fetchPosts(selectedSubreddit)
  //   }
  // },

  handleChange (nextSubreddit) {
    this.props.selectSubreddit(nextSubreddit)
    this.props.fetchPosts(nextSubreddit)
  },

  handleRefreshClick (e) {
    e.preventDefault()
    this.props.invalidateSubreddit(this.props.selectedSubreddit)
    this.props.fetchPosts(this.props.selectedSubreddit)
  },

  render () {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props
    return (
      <div>
        <Picker value={selectedSubreddit}
          onChange={this.handleChange}
          options={[ 'reactjs', 'frontend' ]} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href='#'
              onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isFetching && posts.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && posts.length === 0 &&
          <h2>Empty.</h2>
        }
        {posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        }
      </div>
    )
  },

  propTypes: {
    selectedSubreddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    fetchPosts: PropTypes.func.isRequired,
    selectSubreddit: PropTypes.func.isRequired,
    invalidateSubreddit: PropTypes.func.isRequired
  }
})

const mapStateToProps = (state, ownProps) => {
  const { selectedSubreddit, postsBySubreddit } = state
  const {
    items: posts,
    isFetching,
    lastUpdated
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  }
  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchPosts: (subreddit) => {
      dispatch(fetchPostsIfNeeded(subreddit))
    },
    selectSubreddit: (subreddit) => {
      dispatch(selectSubreddit(subreddit))
    },
    invalidateSubreddit: (subreddit) => {
      dispatch(invalidateSubreddit(subreddit))
    }
  }
}

AsyncApp = connect(mapStateToProps, mapDispatchToProps)(AsyncApp)

export default AsyncApp

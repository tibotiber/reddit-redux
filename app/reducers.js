import { combineReducers } from 'redux'
import { SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT, REQUEST_POSTS, RECEIVE_POSTS } from './actions'

function selectSubreddit (state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

function posts (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        didInvalidate: false,
        isFetching: true
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        didInvalidate: false,
        isFetching: false,
        lastUpdated: action.receivedAt,
        items: action.posts
      })
    default:
      return state
  }
}

function postsBySubreddit (state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      })
    default:
      return state
  }
}

export default combineReducers({
  selectSubreddit,
  postsBySubreddit
})

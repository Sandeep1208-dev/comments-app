import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsList: [],
    name: '',
    comment: '',
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state

    if (name.trim() === '' || comment.trim() === '') return

    const newComment = {
      id: uuidv4(),
      name,
      comment,
      isLiked: false,
      date: new Date(),
      backgroundColor:
        initialContainerBackgroundClassNames[
          Math.floor(
            Math.random() * initialContainerBackgroundClassNames.length,
          )
        ],
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  onChangeName = e => {
    this.setState({name: e.target.value})
  }

  onChangeComment = e => {
    this.setState({comment: e.target.value})
  }

  onToggleLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(each =>
        each.id === id ? {...each, isLiked: !each.isLiked} : each,
      ),
    }))
  }

  onDeleteComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.filter(each => each.id !== id),
    }))
  }

  render() {
    const {commentsList, name, comment} = this.state

    return (
      <div className="comments-container">
        <div className="details-container">
          <div className="form-container">
            <h1 className="heading">Comments</h1>
            <p className="sub-heading">Say something about 4.0 Technologies</p>

            <form
              className="comments-form-container"
              onSubmit={this.onAddComment}
            >
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={this.onChangeName}
                className="name"
              />

              <textarea
                placeholder="Your Comment"
                value={comment}
                onChange={this.onChangeComment}
                className="comment"
              />

              <button type="submit">Add Comment</button>
            </form>
          </div>

          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="comments-img"
          />
        </div>

        <hr className="separator" />

        <div className="comments-count-container">
          <p className="count">{commentsList.length}</p>
          <p className="comments-text">Comments</p>
        </div>

        <ul className="comments-list">
          {commentsList.map(each => (
            <CommentItem
              key={each.id}
              commentDetails={each}
              onToggleLike={this.onToggleLike}
              onDeleteComment={this.onDeleteComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments

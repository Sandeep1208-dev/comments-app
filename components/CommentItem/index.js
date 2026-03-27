import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, onToggleLike, onDeleteComment} = props

  const {id, name, comment, isLiked, date, backgroundColor} = commentDetails

  const likeImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const onClickLike = () => onToggleLike(id)
  const onClickDelete = () => onDeleteComment(id)

  const time = formatDistanceToNow(new Date(date))

  return (
    <li className="comment-item">
      <div className="comment-header">
        <div className={`avatar ${backgroundColor}`}>
          {name[0].toUpperCase()}
        </div>

        <div className="comment-details">
          <p className="name">{name}</p>
          <p className="time">{time} ago</p>
        </div>
      </div>

      <p className="comment-text">{comment}</p>

      <div className="actions">
        <button className="like-button" onClick={onClickLike} type="submit">
          <img src={likeImage} alt="like" />
          <span className={isLiked ? 'liked' : ''}>Like</span>
        </button>

        <button
          data-testid="delete"
          type="button"
          className="delete-button"
          onClick={onClickDelete}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem

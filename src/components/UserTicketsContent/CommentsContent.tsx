import { useEffect, useState } from 'react'
import { CommentDTO } from 'src/data/interfaces/CommentDTO'
import Comment from '../Comment/Comment'
import { userService } from 'src/services/UserService'
import './CommentsContent.css'

export const CommentsContent = () => {
  const [comments, setComments] = useState<CommentDTO[]>([])

  const fetchComments = async () => {
    userService.getComments().then((comments) => {
      setComments(comments)
    })
  }

  useEffect(() => {
    fetchComments()
  }, [])

  const handleDelete = async (commentId: number) => {
    userService
      .removeComment(commentId)
      .then(() => {
        console.log('lanzar snackbar de comentario eliminado con exito')
        fetchComments()
      })
      .catch(() => {
        console.log('manejar error venido del back con componente')
      })
  }

  return (
    <main className="comment-container">
      {comments.map((comment, index) => (
        <Comment
          comment={comment}
          handleDelete={() => {
            handleDelete(index)
          }}
          key={comment.text}
        />
      ))}
    </main>
  )
}

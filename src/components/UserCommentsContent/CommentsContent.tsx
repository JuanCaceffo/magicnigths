import './CommentsContent.css'
import { CommentDTO } from 'models/interfaces/CommentDTO'
import { Comment } from 'components/Comment/Comment'
import { userService } from 'services/UserService'
import { snackbarProfileOptions } from 'pages/Profile/Profile'
import { errorHandler } from 'models/helpers/ErrorHandler'
import { AxiosError } from 'axios'
import { closeSnackbar, enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

export const CommentsContent = () => {
  const [comments, setComments] = useState<CommentDTO[]>([])

  const fetchComments = async () => {
    userService.getComments().then((comments) => {
      setComments(comments)
    })
  }

  useEffect(() => {
    fetchComments()
    return () => {
      closeSnackbar()
    }
  }, [])

  const handleDelete = async (commentId: number) => {
    userService
      .removeComment(commentId)
      .then(() => {
        enqueueSnackbar('Comentario eliminado con exito', { variant: 'success', ...snackbarProfileOptions })
        fetchComments()
      })
      .catch((error: AxiosError) => {
        enqueueSnackbar(errorHandler(error), snackbarProfileOptions)
      })
  }

  return (
    <main className="comment-container">
      {comments.map((comment) => (
        <Comment
          comment={comment}
          handleDelete={() => {
            handleDelete(comment.id)
          }}
          key={comment.text}
        />
      ))}
    </main>
  )
}

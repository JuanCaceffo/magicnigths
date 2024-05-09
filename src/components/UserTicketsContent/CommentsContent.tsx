import { useEffect, useState } from 'react'
import { CommentDTO } from 'src/data/interfaces/CommentDTO'
import { Comment } from '../Comment/Comment'
import { userService } from 'src/services/UserService'
import './CommentsContent.css'
import { closeSnackbar, enqueueSnackbar } from 'notistack'
import { snackbarProfileOptions } from 'src/pages/Profile/Profile'
import { errorHandler } from 'src/data/helpers/ErrorHandler'
import { AxiosError } from 'axios'

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

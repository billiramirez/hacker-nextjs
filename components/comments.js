import Comment from "./comment";

const Comments = ({ comments }) => (
  <>
    {comments.map((comment) => (
      <Comment key={comment.id} comment={comment} />
    ))}
  </>
);

export default Comments;

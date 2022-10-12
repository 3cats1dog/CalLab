import { Comment } from 'entities';
import { catchErrors } from 'errors';
import { createEntity,validateAndSaveEntity } from 'utils/typeorm';

export const create = catchErrors(async (req, res) => {
  const comment = await createEntity(Comment, req.body);
  res.respond({ comment });
});

export const update = catchErrors(async (req, res) => {
  //const comment = await updateEntity(Comment, req.params.commentId, req.body);
  const comment = await Comment.findOne({where:{"id": Number(req.params.commentId)}});
  if (comment!= null)
  {
    Object.assign(comment, req.body);
    return validateAndSaveEntity(comment);
  }
  res.respond({ comment });
});

export const remove = catchErrors(async (req, res) => {
  //const comment = await deleteEntity(Comment, req.params.commentId);
  const comment = await Comment.findOne({where:{ "id":Number(req.params.commentId)}});
  if (comment != null){
    comment.remove();
  }
  res.respond({ comment });
});

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, UpdatePostForm } from '../components';
import databaseService from '../appwrite/database';
import { useNavigate, useParams } from 'react-router-dom';
import { setLoading, setError, updatePost } from '../store/postsSlice';

function EditPost() {
  const { documentId } = useParams();
  const post = useSelector(state =>
    state.posts.allPosts.find(p => p.$id === documentId)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!post && documentId) {
      dispatch(setLoading(true));
      databaseService.getPost(documentId).then((res) => {
        if (res) {
          dispatch(updatePost(res)); // Ideally you'd have a 'setSinglePost' or updatePost action
        } else {
          dispatch(setError('Post not found'));
          navigate('/');
        }
        dispatch(setLoading(false));
      });
    }
  }, [post, documentId, dispatch, navigate]);

  return post ? (
    <div className='py-8'>
      <Container>
        <UpdatePostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;

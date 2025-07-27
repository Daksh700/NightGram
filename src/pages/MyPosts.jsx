import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserPosts, setLoading, setError } from '../store/postsSlice';
import databaseService from '../appwrite/database';
import { Container, Post } from '../components/index';
import { Query } from 'appwrite';

function MyPosts() {
  const dispatch = useDispatch();
  const { userPosts, loading, error } = useSelector(state => state.posts);
  const userData = useSelector(state => state.auth.userData);

  useEffect(() => {
    const fetchUserPosts = async () => {
      dispatch(setLoading(true));
      try {
        // const postsResponse = await service.getUserPosts(userData.$id); 
        const username = userData.name;
        const posts = await databaseService.getPosts([Query.equal("name", username)]); 
        const documents = posts?.documents || [];
        dispatch(setUserPosts({ userPosts: documents }));
      } catch (err) {
        dispatch(setError('Failed to load your posts'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (userData?.$id) {
      fetchUserPosts();
    }
  }, [dispatch, userData]);

  if (loading) return (
    <div className="w-full text-center">
      <Container>
        <h1 className="text-2xl font-bold">Loading your posts...</h1>
      </Container>
    </div>
  );

  if (error) return (
    <div className="w-full text-center">
      <Container>
        <h1 className="text-2xl font-bold text-red-500">{error}</h1>
      </Container>
    </div>
  );

  if (!userPosts.length) return (
    <div className="w-full text-center">
      <Container>
        <h1 className="text-2xl font-bold">
          You don't have any posts yet.
        </h1>
      </Container>
    </div>
  );

  return (
    <div className="w-full">
    <Container>
      <div className="flex flex-col items-center gap-6">
        {userPosts.map(post => (
          <div key={post.$id} className="w-full max-w-[713px]">
            <Post {...post} documentId={post.$id}/>
          </div>
        ))}
      </div>
    </Container>
  </div>
  );
}

export default MyPosts;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setLoading, setError } from "../store/postsSlice";
import databaseService from "../appwrite/database";
import { Container, Post, AddPost } from "../components/index";

function Home() {
  const { allPosts, loading, error } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(setLoading(true));
      try {
        const posts = await databaseService.getPosts([]);

        const documents = posts?.documents || [];

        dispatch(setPosts({ allPosts: documents }));
      } catch (error) {
        dispatch(setError("Failed to load posts"));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchPosts();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="w-full text-center">
        <Container>
          <h1 className="text-2xl font-bold">Loading posts...</h1>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center">
        <Container>
          <h1 className="text-2xl font-bold text-red-500">{error}</h1>
        </Container>
      </div>
    );
  }

  if (allPosts.length === 0) {
    return (
      <div className="w-full text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Container>
        <AddPost />
        <div className="flex flex-wrap justify-center gap-6">
            {allPosts.map((post) => (
                <div key={post.$id}>
                    <Post {...post} documentId={post.$id}/>
                </div>
            ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;

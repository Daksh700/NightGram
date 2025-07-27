import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allPosts: [],
    userPosts: [],
    loading: false,
    error: null
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.allPosts = action.payload.allPosts;
        },
        addPost: (state, action) => {
            state.allPosts.unshift(action.payload);
        },
        updatePost: (state, action) => {
            state.allPosts = state.allPosts.map((post) => post.$id === action.payload.$id ? action.payload : post);
        },
        deletePost: (state, action) => {
            state.allPosts = state.allPosts.filter((post) => post.$id !== action.payload);
        },
        setUserPosts: (state, action) => {
            state.userPosts = action.payload.userPosts;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {setPosts, addPost, updatePost, deletePost, setUserPosts, setLoading, setError} = postsSlice.actions;

export default postsSlice.reducer;
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import databaseService from '../appwrite/database';
import storageService from '../appwrite/storage';
import {deletePost as delPost} from '../store/postsSlice'

function Post({ caption, featuredImage, userId, name, documentId }) {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = userData ? userId === userData.$id : false;

    const deletePost = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            databaseService.deletePost(documentId).then((status) => {
                if (status) {
                    storageService.deleteFile(featuredImage);
                    dispatch(delPost(documentId))
                    // Refresh the page or update state
                    window.location.reload();
                }
            });
        }
    };

    return (
        <article className="w-full max-w-[713px] h-auto mid:h-[563px] bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden flex flex-col mx-auto">
            {/* Post Header */}
            <div className="p-5 flex justify-between items-center border-b border-[#30363d]">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-base">
                        {name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="text-base font-semibold text-[#e6edf3]">
                        {name || 'Unknown User'}
                    </span>
                </div>
                
                {isAuthor && (
                    <div className="flex gap-2">
                        <Link to={`/edit-post/${documentId}`}>
                            <button className="bg-transparent border border-[#3b82f6] text-[#3b82f6] px-4 py-2 rounded-lg cursor-pointer text-xs font-medium hover:bg-[#3b82f6] hover:text-white transition-all">
                                Edit
                            </button>
                        </Link>
                        <button 
                            onClick={deletePost}
                            className="bg-transparent border border-[#ef4444] text-[#ef4444] px-4 py-2 rounded-lg cursor-pointer text-xs font-medium hover:bg-[#ef4444] hover:text-white transition-all"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            {/* Post Media */}
            {featuredImage && (
                <div className="w-full h-[250px] md:h-[400px] bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 flex items-center justify-center">
                    <img 
                        src={storageService.getFileView(featuredImage)} 
                        alt={caption || "Post image"}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Post Content */}
            <div className="p-5">
                <p className="text-[15px] leading-relaxed text-[#e6edf3] mb-3">
                    {caption}
                </p>
            </div>
        </article>
    )
}

export default Post
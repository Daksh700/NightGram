import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import storageService from "../../appwrite/storage";
import databaseService from "../../appwrite/database";
import { addPost } from "../../store/postsSlice";
import { Input, Button } from "../index";

export default function PostForm() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      caption: "",
      featuredImage: "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (!data.image || data.image.length === 0) {
      console.error("No image file selected");
      return;
    }
    if (!userData || !userData.$id) {
      console.error("User not logged in");
      return;
    }

    const file = await storageService.uploadFile(data.image[0]);

    if (!file || !file.$id) {
      console.error("File upload failed");
      return;
    }

    const fileId = file.$id;
    data.featuredImage = fileId;

    const dbPost = await databaseService.createPost({
      ...data,
      userId: userData.$id,
      name: userData.name,
    });

    if (dbPost) {
      dispatch(addPost(dbPost));
      navigate(`/`);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-8">
      {/* Left - Main Content */}
      <div className="w-full lg:w-2/3 px-2">
        {/* Title */}
        <div className="mb-4">
          <Input
            label="Caption"
            className="w-full bg-[#161b22] border border-[#30363d] rounded-lg px-3 py-3 text-[#e6edf3] resize-none outline-none focus:border-[#3b82f6]"
            rows={6}
            placeholder="Write your caption..."
            {...register("caption", { required: true })}
          />
          <div className="text-right text-xs text-[#7d8590] mt-1">
            0 / 2200 characters
          </div>
        </div>
        {/* Tags */}
        <div className="mb-4">
          <label className="block text-[#e6edf3] font-semibold mb-2">
            Tags
          </label>
          <input
            className="w-full bg-[#161b22] border border-[#30363d] rounded-lg px-3 py-2 text-[#e6edf3] outline-none focus:border-[#3b82f6]"
            placeholder="Add tags (press Enter)"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-[#7c3aed] text-white px-3 py-1 rounded-full text-sm">
              sunset ×
            </span>
            <span className="bg-[#10b981] text-white px-3 py-1 rounded-full text-sm">
              nature ×
            </span>
            <span className="bg-[#3b82f6] text-white px-3 py-1 rounded-full text-sm">
              photography ×
            </span>
            <span className="bg-[#10b981] text-white px-3 py-1 rounded-full text-sm">
              mountains ×
            </span>
          </div>
        </div>
      </div>

      {/* Right - Image Upload and Visibility */}
      <div className="w-full lg:w-1/3 px-2 flex flex-col gap-6">
        {/* Image Upload */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-4 flex flex-col gap-4">
          {/* Image preview */}
          <div className="w-full h-48 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 rounded-xl flex justify-center items-center overflow-hidden">
            {/* Dummy Preview */}
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80"
              alt="preview"
              className="object-cover w-full h-full"
            />
          </div>
          <Input
            label="Featured Image"
            type="file"
            className="file:bg-purple-600 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-0 bg-[#161b22] text-[#e6edf3]"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: true })}
          />
        </div>
        {/* Visibility */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-4 flex flex-col gap-4">
          <label className="block text-[#e6edf3] font-semibold mb-3">
            Visibility
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="visibility" className="sr-only" />
              <div className="w-6 h-6 border-2 border-[#3b82f6] rounded-lg bg-[#3b82f6] flex items-center justify-center">
                🌍
              </div>
              <span className="text-sm text-[#e6edf3]">Public</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="visibility" className="sr-only" />
              <div className="w-6 h-6 border-2 border-[#30363d] rounded-lg flex items-center justify-center">
                👥
              </div>
              <span className="text-sm text-[#e6edf3]">Friends</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="visibility" className="sr-only" />
              <div className="w-6 h-6 border-2 border-[#30363d] rounded-lg flex items-center justify-center">
                🔒
              </div>
              <span className="text-sm text-[#e6edf3]">Private</span>
            </label>
          </div>
        </div>
        {/* Submit Button */}
        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white w-full py-3 rounded-lg font-semibold text-lg hover:from-purple-600 hover:to-blue-600 transition-all"
        >
          Share Post
        </Button>
      </div>
    </form>
  );
}

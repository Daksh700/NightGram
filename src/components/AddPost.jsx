import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AddPost() {
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);

    const handleClick = () => {
        if(authStatus) {
            navigate("/add-post");
        }
        else if(!authStatus) {
            navigate("/login");
        }
    }

  return (

    <div className="relative overflow-hidden rounded-2xl border border-[#30363d] bg-[#161b22] p-8 text-center mb-8">
        <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400" />
        <button
        onClick={handleClick}
        className="mx-auto flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:from-purple-600 hover:to-blue-600"
        >
        ✨
        <span>Create&nbsp;Something&nbsp;Amazing</span>
      </button>
    </div>
  )
}

export default AddPost
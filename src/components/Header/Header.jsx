import React from "react";
import { Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
  ];

  return (
    <header className="bg-[#161b22] border-b border-[#30363d] h-16">
      <div className="w-full max-w-[1200px] mx-auto px-6 h-full">
        <nav className="flex justify-between items-center h-full gap-x-6">
          <div>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul className="flex items-center gap-2 sm:gap-4 overflow-x-auto scrollbar-none max-w-[98vw]">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`${
                      item.name === "Signup"
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold hover:from-purple-600 hover:to-blue-600 transition-all"
                        : "bg-transparent border border-[#30363d] text-[#e6edf3] px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg cursor-pointer text-xs sm:text-sm font-medium hover:bg-[#21262d] transition-colors"
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

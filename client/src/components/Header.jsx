import Logo from "./Logo";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetUser } from "../redux/userSlice";
import Button from "./Button";
import { setShowCreatePost } from "../redux/appSlice";

const navlist = [{ title: "Logout" }];

const Header = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="px-6 flex gap-3  py-5">
      <Menu />
      <div className=" w-full flex gap-3 flex-col md:flex-row justify-center md:justify-between items-center">
        <Logo />

        <div className="flex items-center gap-5">
          <CreatePostButton />

          {user?.username && (
            <span className="hidden md:inline text-orange-600 font-bold">
              {user?.username}
            </span>
          )}

          <Nav />
        </div>
      </div>
    </div>
  );
};

const CreatePostButton = () => {
  const dispatch = useDispatch();
  return (
    <Button onClick={() => dispatch(setShowCreatePost(true))}>
      <FaPlus /> Create Post
    </Button>
  );
};

const Menu = () => {
  const [show, setShow] = useState(false);
  return (
    <div onClick={() => setShow(!show)} className="md:hidden relative">
      <CiMenuBurger
        size={40}
        className="  text-gray-600 hover:text-teal-600 ease-out duration-300 cursor-pointer"
      />
      {show ? <MenuOptions /> : null}
    </div>
  );
};

const MenuOptions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="w-28 flex flex-col rounded-r-xl overflow-hidden shadow-md border-gray-500 bg-white absolute top-16 -left-3 bg-red z-10">
      {navlist.map((nav, index) => (
        <button
          key={index}
          onClick={() => {
            if (nav.title === "Logout") {
              dispatch(resetUser());
              navigate("/login");
            }
          }}
          className="whitespace-nowrap hover:font-bold hover:text-white hover:bg-teal-600 p-2"
        >
          {nav.title}
        </button>
      ))}
    </div>
  );
};

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="hidden md:flex space-x-8">
      {navlist.map((nav, index) => (
        <button
          key={index}
          onClick={() => {
            if (nav.title === "Logout") {
              dispatch(resetUser());
              navigate("/login");
            }
          }}
          className={`text-gray-500 text-xl  hover:text-teal-600 ease-out duration-300 `}
        >
          {nav.title}
        </button>
      ))}
    </div>
  );
};

export default Header;

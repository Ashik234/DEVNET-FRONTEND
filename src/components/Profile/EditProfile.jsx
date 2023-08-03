import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { editProfile } from "../../services/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { changeUserDetails } from "../../Redux/user/UserSlice";
import { useDispatch } from "react-redux";
function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    username: "",
    image:"",
    github: "",
    linkedin: "",
    about: "",
  });

  const profiledata = useSelector((state) => state.user);

  useEffect(() => {
    setData({
      username: profiledata.username,
      github: profiledata.github,
      linkedin: profiledata.linkedin,
      about: profiledata.about,
      image:profiledata.image
    });
  }, [profiledata]);
const handleSubmit = (e) => {
  e.preventDefault();
    if (!data || !data.username || data.username.trim() === "") {
    return toast.warn("Username should not be empty");
  } else if (!data || !data.github || data.github.trim() === "") {
    return toast.warn("Github should not be empty");
  } else if (!data || !data.linkedin || data.linkedin.trim() === "") {
    return toast.warn("Linkedin should not be empty");
  }else if (!data || !data.about || data.about.trim() === "") {
    return toast.warn("About should not be empty");
  } else {
     const formData = new FormData();
      formData.append("username", data.username);
      formData.append("image", data.image);
      formData.append("github", data.github);
      formData.append("linkedin", data.linkedin);
      formData.append("about", data.about);
  editProfile(profiledata.userId, formData) 
    .then((res) => {
      const  user = res.data
      dispatch(
        changeUserDetails({
          userId: user.user._id,
          username: user.user.username,
          email: user.user.email,
          joinedDate: user.user.joinedDate,
          status:user.user.status,
          about:user.user.about,
          github:user.user.github,
          linkedin:user.user.linkedin,
          image:user.user.image
        })
      );
      toast.success(res.data.message);
      navigate("/profile");
    })
    .catch((error) => {
       console.error("Error updating profile:", error.response);
      console.error("Error updating profile:", error);
    });
  }
};


  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      <form className="max-w-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="username"
            value={data.username}
            onChange={(e) => {
              setData({ ...data, [e.target.name]: e.target.value });
            }}
            className="w-full border rounded-lg py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-1">
            Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) => {
              setData({ ...data, [e.target.name]: e.target.files[0]});
            }}
            className="w-full border rounded-lg py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="github" className="block font-medium mb-1">
            GitHub:
          </label>
          <input
            type="text"
            id="github"
            name="github"
            value={data.github}
            onChange={(e) => {
              setData({ ...data, [e.target.name]: e.target.value });
            }}
            className="w-full border rounded-lg py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="linkedin" className="block font-medium mb-1">
            LinkedIn:
          </label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            value={data.linkedin}
            onChange={(e) => {
              setData({ ...data, [e.target.name]: e.target.value });
            }}
            className="w-full border rounded-lg py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="about" className="block font-medium mb-1">
            About:
          </label>
          <textarea
            id="about"
            name="about"
            value={data.about}
            onChange={(e) => {
              setData({ ...data, [e.target.name]: e.target.value });
            }}
            className="w-full border rounded-lg py-2 px-3"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default EditProfile;

import { useState } from "react";
import { login } from "../../api/user";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExists } from "../../redux/reducers/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("In Login.jsx, under handleLogin page");
    const payload = {
      email,
      password,
    };
    try {
      const data = await login(payload);
      console.log(data);
      if (data?.ok) {
        dispatch(userExists(data?.user));
        toast.success(data?.message);
        navigate("/dashboard");
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Oops! Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 hover:border-t-8 hover:border-orange-600 transition-all duration-300">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 mb-6">Log in to your SmartFit account.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition-all duration-200"
          >
            Log In
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-orange-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};
export default Login;

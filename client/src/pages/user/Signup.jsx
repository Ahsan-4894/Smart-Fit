import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExists } from "../../redux/reducers/auth";
import { register } from "../../api/user";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);

  const handleSignup = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      email,
      password,
      weight: parseFloat(weight),
      height: parseFloat(height),
      gender,
      age: parseInt(age),
    };
    try {
      const data = await register(payload);
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
    <div className="min-h-screen flex items-center justify-center bg-white py-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 hover:border-t-8 hover:border-orange-600 transition-all duration-300">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Join SmartFit
          </h2>
          <p className="text-gray-600 mb-6">
            Create your account to start training
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Full Name"
              required
            />
          </div>

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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Weight (kg)</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="70"
                min="1"
                step="0.1"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Height (cm)</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="170"
                min="1"
                step="0.1"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Age (years)</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="0"
                min="1"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Gender</label>
            <select
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-md transition-all duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-orange-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

import { useState } from "react";

const Signin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageError("");

    if (file) {
      // Check file type
      const validTypes = ["image/png", "image/jpeg"];
      if (!validTypes.includes(file.type)) {
        setImageError("Only PNG and JPEG files are allowed");
        setProfileImage(null);
        setImagePreview(null);
        e.target.value = "";
        return;
      }

      // Check file size (optional - limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setImageError("File size must be less than 5MB");
        setProfileImage(null);
        setImagePreview(null);
        e.target.value = "";
        return;
      }

      setProfileImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignin = (e) => {
    e.preventDefault();

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("weight", weight);
    formData.append("height", height);
    formData.append("gender", gender);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    // Add your signup API call here
    console.log("Form Data:", {
      name,
      email,
      password,
      weight,
      height,
      gender,
      profileImage: profileImage?.name,
    });
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

        <form onSubmit={handleSignin} className="space-y-4">
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

          <div>
            <label className="block text-gray-700 mb-1">Profile Image</label>
            <input
              type="file"
              accept=".png,.jpeg,.jpg"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
            />
            {imageError && (
              <p className="text-red-500 text-sm mt-1">{imageError}</p>
            )}
            <p className="text-gray-500 text-sm mt-1">
              PNG or JPEG only, max 5MB
            </p>

            {imagePreview && (
              <div className="mt-3 flex justify-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover border-2 border-orange-600"
                />
              </div>
            )}
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

export default Signin;

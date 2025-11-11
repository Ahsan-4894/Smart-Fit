import { useState } from "react";

// Mock Link component (replace with react-router-dom Link in your app)
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>
    {children}
  </a>
);

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      title: "AI Coaching",
      desc: "Real-time form correction and personalized guidance powered by advanced AI",
      icon: "🤖",
      color: "from-purple-500 to-blue-500",
    },
    {
      title: "Workout Plans",
      desc: "Customized programs tailored to your specific fitness goals",
      icon: "💪",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Live Classes",
      desc: "Connect with elite coaches worldwide through live streaming",
      icon: "🎥",
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Progress Tracking",
      desc: "Detailed analytics and insights to monitor your journey",
      icon: "📊",
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Community",
      desc: "Challenge friends and share achievements with fellow athletes",
      icon: "👥",
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Nutrition",
      desc: "Personalized meal plans and recipes for optimal results",
      icon: "🥗",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fitness Enthusiast",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
      text: "SmartFit transformed my fitness journey! The AI coaching is incredible.",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Professional Athlete",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
      text: "Best fitness platform I've ever used. The personalized plans are spot on!",
      rating: 5,
    },
    {
      name: "Emma Davis",
      role: "Yoga Instructor",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
      text: "The live classes and community support keep me motivated every day.",
      rating: 5,
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "1M+", label: "Workouts Completed" },
    { number: "500+", label: "Expert Coaches" },
    { number: "4.9★", label: "User Rating" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-orange-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">SF</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                SmartFit
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-orange-600 font-medium transition-colors"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-orange-600 font-medium transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-orange-600 font-medium transition-colors"
              >
                Pricing
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login">
                <button className="px-5 py-2 text-gray-700 hover:text-orange-600 font-semibold rounded-lg transition-colors">
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-5 py-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105">
                  Sign Up
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-orange-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3 border-t border-gray-200">
              <a
                href="#features"
                className="block px-4 py-2 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="block px-4 py-2 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#pricing"
                className="block px-4 py-2 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
              >
                Pricing
              </a>
              <div className="pt-3 space-y-2">
                <Link to="/login">
                  <button className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg">
                    Log In
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-16 md:py-24 text-center relative">
          {/* Background decoration */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div
            className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>

          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-6">
              <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-orange-600">
                Now with AI-Powered Coaching
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Your{" "}
              <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                AI-Powered
              </span>
              <br />
              Fitness Coach
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get personalized training plans, real-time form feedback, and
              connect with elite coaches. Transform your fitness journey with
              SmartFit's cutting-edge AI technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/signup">
                <button className="px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold rounded-xl shadow-xl transition-all transform hover:scale-105 hover:shadow-2xl">
                  Start Free Trial
                  <span className="ml-2">→</span>
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl border-2 border-gray-200 hover:border-orange-600 transition-all">
                  Watch Demo
                  <span className="ml-2">▶</span>
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-4 shadow-lg border border-gray-100"
                >
                  <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you achieve your fitness goals
              faster
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-orange-600 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by Thousands
            </h2>
            <p className="text-lg text-gray-600">
              See what our users have to say about their transformation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-orange-600"
                  />
                  <div>
                    <div className="font-bold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-orange-500">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Fitness?
            </h2>
            <p className="text-lg text-orange-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already achieved their goals with
              SmartFit
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <button className="px-8 py-4 bg-white hover:bg-gray-100 text-orange-600 font-bold rounded-xl shadow-xl transition-all transform hover:scale-105">
                  Get Started Free
                </button>
              </Link>
              <button className="px-8 py-4 bg-orange-700 hover:bg-orange-800 text-white font-bold rounded-xl transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-gray-200">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SF</span>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  SmartFit
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Transform your fitness journey with AI-powered coaching.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-orange-600">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-600">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-600">
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-orange-600">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-600">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-600">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-orange-600">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-600">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-600">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            © 2024 SmartFit. All rights reserved.
          </div>
        </footer>
      </div>
    </main>
  );
};

export default Home;

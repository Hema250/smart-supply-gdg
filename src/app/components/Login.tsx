import { useState } from "react";
import { useNavigate } from "react-router";
import { Truck, Lock, Mail, Eye, EyeOff, UserPlus, LogIn } from "lucide-react";
import { toast } from "sonner";

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple logic: extract name from email or use fullName
    const name = isLogin ? (email.split("@")[0] || "User") : (fullName || email.split("@")[0]);
    localStorage.setItem("user_name", name);
    
    toast.success(isLogin ? `Welcome back, ${name}!` : `Account created for ${name}!`);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -ml-64 -mb-64"></div>

      <div className="w-full max-w-5xl flex bg-white/5 backdrop-blur-2xl rounded-[40px] shadow-2xl overflow-hidden border border-white/10 relative z-10 animate-in fade-in zoom-in duration-500">
        {/* Left Side - Visual Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 p-16 flex-col justify-between relative">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight">SmartChain</h1>
            </div>

            <h2 className="text-5xl font-black text-white leading-tight mb-6">
              Control the <span className="text-blue-300">Flow</span> of Global Commerce.
            </h2>
            <p className="text-blue-100/70 text-xl font-medium leading-relaxed">
              Logistics, inventory, and analytics unified in a single, high-performance interface.
            </p>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-400/20 flex items-center justify-center">
                <span className="text-blue-400 font-bold">01</span>
              </div>
              <span className="text-white font-bold">Predictive AI Inventory</span>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/20 flex items-center justify-center">
                <span className="text-emerald-400 font-bold">02</span>
              </div>
              <span className="text-white font-bold">Real-time Asset Tracking</span>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-10">
              <h2 className="text-4xl font-black text-white mb-3">
                {isLogin ? "Sign In" : "Join SmartChain"}
              </h2>
              <p className="text-gray-400 font-medium">
                {isLogin ? "Access your commander dashboard." : "Initialize your logistical network."}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-6">
              {!isLogin && (
                <div className="animate-in slide-in-from-top-2 duration-300">
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                  <div className="relative">
                    <LogIn className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all font-medium"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Email Identity</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="abc@smartchain.com"
                    className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Security Key</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-14 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all font-medium"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
              >
                {isLogin ? <LogIn className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
                {isLogin ? "Authenticate" : "Create Identity"}
              </button>
            </form>

            <div className="mt-10 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-gray-400 hover:text-blue-400 font-bold transition-colors"
              >
                {isLogin ? "Need a new account? Create one" : "Already have an identity? Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

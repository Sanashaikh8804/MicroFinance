import { useState } from 'react';
import { Building2, TrendingUp, Shield, Users } from 'lucide-react';
import type { User } from '../../App';

interface LandingPageProps {
  onLogin: (user: User) => void;
  onNavigate: (view: string) => void;
}

export function LandingPage({ onLogin, onNavigate }: LandingPageProps) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleDemoLogin = (role: 'borrower' | 'nbfc') => {
    if (role === 'borrower') {
      onLogin({
        name: 'Rahul Sharma',
        role: 'borrower',
        businessName: 'Rahul Kirana Store'
      });
    } else {
      onLogin({
        name: 'Delta Capital',
        role: 'nbfc'
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, would validate credentials
    handleDemoLogin('borrower');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-success-600 p-12 flex-col justify-between text-white">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <TrendingUp className="w-10 h-10" />
            <span className="text-3xl">FinBridge</span>
          </div>
          
          <h1 className="mb-6">Connecting Small Businesses with Growth Capital</h1>
          <p className="text-xl text-primary-100 mb-12">
            India's most trusted microfinance brokerage platform linking borrowers with NBFCs
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="mb-2">Secure & Trustworthy</h4>
                <p className="text-primary-100">Bank-grade security for all your financial data</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="mb-2">Verified NBFCs</h4>
                <p className="text-primary-100">All lenders are RBI-registered and verified</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h4 className="mb-2">10,000+ Businesses Funded</h4>
                <p className="text-primary-100">Join thousands of successful borrowers</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-primary-100">
          © 2025 FinBridge. All rights reserved.
        </div>
      </div>

      {/* Right Side - Login Form */}
       <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-gray-50">
        <div className="w-4/5 max-w-4xl">
          <div className="lg:hidden mb-12 flex items-center justify-center gap-3 text-primary-700">
            <TrendingUp className="w-10 h-10" />
            <span className="text-3xl font-semibold">FinBridge</span>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-10 sm:p-12 border border-gray-100">
            <div className="mb-10">
              <h2 className="text-gray-900 mb-3 text-3xl font-bold">Welcome Back</h2>
              <p className="text-gray-500 text-lg">Sign in to access your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2.5 font-medium text-sm">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow text-base bg-gray-50 hover:bg-white"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2.5 font-medium text-sm">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow text-base bg-gray-50 hover:bg-white"
                />
              </div>

              <div className="flex items-center justify-between text-sm pt-2">
                <label className="flex items-center gap-2.5 text-gray-600 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 w-4 h-4" />
                  <span>Remember me</span>
                </label>
                <button type="button" className="text-primary-600 hover:text-primary-700 font-medium">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl font-semibold text-base mt-8"
              >
                Sign In
              </button>
            </form>

            {/* Demo Login Links */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-5 text-center font-medium">Quick Demo Access</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => handleDemoLogin('borrower')}
                  className="bg-success-50 text-success-700 border border-success-200 py-3.5 px-4 rounded-xl hover:bg-success-100 transition-all font-medium text-sm hover:shadow-md"
                >
                  Demo Borrower
                </button>
                <button
                  onClick={() => handleDemoLogin('nbfc')}
                  className="bg-primary-50 text-primary-700 border border-primary-200 py-3.5 px-4 rounded-xl hover:bg-primary-100 transition-all font-medium text-sm hover:shadow-md"
                >
                  Demo NBFC
                </button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 text-base">
                Don't have an account?{' '}
                <button
                  onClick={() => onNavigate('registration-select')}
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                  Register now
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

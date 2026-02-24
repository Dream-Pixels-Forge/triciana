import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CloseIcon, SpinnerIcon } from '../common/Icons';

/**
 * SignInModal Component
 * Modal for user sign in
 */
export function SignInModal({ onClose }) {
  const { signIn, isLoading, error, setIsSignUpOpen } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.email || !formData.password) {
      setFormError('Please fill in all fields');
      return;
    }

    const result = await signIn(formData.email, formData.password);
    if (result.success) {
      onClose?.();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
          aria-label="Close sign in modal"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center">
          <h2 className="text-display-sm font-bold text-neutral-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-body-sm text-neutral-600">
            Sign in to your Triciana account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8">
          {/* Error message */}
          {(error || formError) && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-body-sm text-red-600">{error || formError}</p>
            </div>
          )}

          {/* Email field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-body-sm font-medium text-neutral-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          {/* Password field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-body-sm font-medium text-neutral-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                className="w-4 h-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
              />
              <span className="ml-2 text-body-sm text-neutral-600">Remember me</span>
            </label>
            <button
              type="button"
              className="text-body-sm text-primary-500 hover:text-primary-600 font-medium"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn btn-primary btn-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <SpinnerIcon className="w-5 h-5" />
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-neutral-500">or</span>
            </div>
          </div>

          {/* Sign up link */}
          <p className="text-center text-body-sm text-neutral-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => {
                onClose?.();
                setIsSignUpOpen(true);
              }}
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignInModal;

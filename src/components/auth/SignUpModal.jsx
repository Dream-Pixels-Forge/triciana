import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CloseIcon, SpinnerIcon } from '../common/Icons';

/**
 * SignUpModal Component
 * Modal for user registration
 */
export function SignUpModal({ onClose }) {
  const { signUp, isLoading, error, setIsSignInOpen } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setFormError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setFormError('Password must be at least 8 characters');
      return;
    }

    if (!formData.agreeToTerms) {
      setFormError('You must agree to the terms and conditions');
      return;
    }

    const result = await signUp(formData.name, formData.email, formData.password);
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
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
          aria-label="Close sign up modal"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center">
          <h2 className="text-display-sm font-bold text-neutral-900 mb-2">
            Create Account
          </h2>
          <p className="text-body-sm text-neutral-600">
            Join Triciana for exclusive offers
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

          {/* Name field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-body-sm font-medium text-neutral-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="John Doe"
              autoComplete="name"
            />
          </div>

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
          <div className="mb-4">
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
              autoComplete="new-password"
            />
          </div>

          {/* Confirm password field */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-body-sm font-medium text-neutral-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>

          {/* Terms checkbox */}
          <div className="mb-6">
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                className="w-4 h-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500 mt-1"
              />
              <span className="ml-2 text-body-sm text-neutral-600">
                I agree to the{' '}
                <a href="/terms" className="text-primary-500 hover:text-primary-600">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-primary-500 hover:text-primary-600">
                  Privacy Policy
                </a>
              </span>
            </label>
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
                Creating account...
              </span>
            ) : (
              'Create Account'
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

          {/* Sign in link */}
          <p className="text-center text-body-sm text-neutral-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => {
                onClose?.();
                setIsSignInOpen(true);
              }}
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUpModal;

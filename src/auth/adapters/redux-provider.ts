const login = async (email: string, password: string) => {
  try {
    // Demo login: bypass actual authentication for demo purposes
    const auth = { user: { email }, token: 'demo-token' };
    return auth;
  } catch (error) {
    throw error;
  }
};

const register = async (
  email: string,
  password: string,
  password_confirmation: string,
  firstName: string,
  lastName: string,
) => {
  try {
    // Demo register: bypass actual registration for demo purposes
    const user = { email, firstName, lastName };
    const token = 'demo-token';
    return { user, token };
  } catch (error) {
    throw error;
  }
};

const requestPasswordReset = async (email: string) => {
  try {
    // Demo password reset request
    return { success: true, message: 'Password reset email sent (demo).' };
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (
  password: string,
  password_confirmation: string,
) => {
  try {
    // Demo password reset
    return { success: true, message: 'Password has been reset (demo).' };
  } catch (error) {
    throw error;
  }
};

const resendVerificationEmail = async (email: string) => {
  try {
    // Demo resend verification email
    return { success: true, message: 'Verification email resent (demo).' };
  } catch (error) {
    throw error;
  }
};
const getCurrentUser = async () => {
  try {
    // Demo get current user
    return { email: 'demo@lakepedia.com', firstName: 'Demo', lastName: 'User' };
  } catch (error) {
    throw error;
  }
};

const updateUserProfile = async (userData: any) => {
  try {
    // Demo update user profile
    return { ...userData, updated: true };
  } catch (error) {
    throw error;
  }
};

export const ReduxAdapter = {
  login,
  register,
  requestPasswordReset,
  resetPassword,
  resendVerificationEmail,
  getCurrentUser,
  updateUserProfile,
};

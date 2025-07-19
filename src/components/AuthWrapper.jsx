import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthWrapper = () => {
  const [showSignup, setShowSignup] = useState(false);

  return showSignup ? (
    <SignupForm onSwitchToLogin={() => setShowSignup(false)} />
  ) : (
    <LoginForm onSwitchToSignup={() => setShowSignup(true)} />
  );
};

export default AuthWrapper;

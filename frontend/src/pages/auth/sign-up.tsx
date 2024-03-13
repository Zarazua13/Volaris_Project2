import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate()
  const [redirectToHome, setRedirectToHome] = useState(false)

  setTimeout(() => {
    setRedirectToHome(true)
  }, 3000)

  if (redirectToHome) {
    navigate('/responsives')
  }

  return <div className="flex h-screen justify-center items-center">
    <h1>Loading...</h1>
  </div>;
};
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import splashLogo from "../../assets/icons/main.svg";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="w-[22.5rem] h-[46.25rem] mx-auto flex flex-col items-center justify-center bg-gradient-to-b from-white to-[#C2B9FF]">
      <img
        src={splashLogo}
        alt="Splash Logo"
        className="w-[3.0625rem] h-[4.04575rem] mb-4"
      />
     
    </main>
  );
}
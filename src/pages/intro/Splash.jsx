import splashLogo from "../../assets/icons/splash-logo.png";

export default function Splash() {
  return (
    <main
      className="flex flex-col justify-center items-center 
                 w-[22.5rem] h-[46.25rem] mx-auto 
                 bg-gradient-to-b from-[#FFFFFF] to-[#C2B9FF]"
    >
      {/* 로고 */}
      <img
        src={splashLogo}
        alt="Splash Logo"
        className="w-[68px] h-[89.83px]"
      />
    </main>
  );
}
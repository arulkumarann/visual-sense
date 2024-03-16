// App.js
import React from "react";
import ChatApp from "@/app/api/chat";

const App = () => {
  return (
    <div className="relative overflow-hidden ">
      <div className="h-full w-full overflow-hidden dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] absolute inset-0 -z-10 flex items-center justify-center ">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]"></div>
      </div>
      <ChatApp />
    </div>
  );
};

export default App;

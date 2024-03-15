// App.js
import React from "react";
import ChatApp from "@/app/api/chat";
import { DotBackgroundDemo } from "@/components/ui/dot-background";

const App = () => {
  return (
    <div className="relative">
      <div className="h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] absolute inset-0 -z-10 flex items-center justify-center ">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]"></div>
      </div>
      <ChatApp />
    </div>
  );
};

export default App;

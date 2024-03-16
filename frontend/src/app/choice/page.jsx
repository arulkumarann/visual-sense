"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { LampContainer } from "@/components/ui/lamp";
import Link from "next/link";

const App = () => {
  useEffect(() => {
    // Function to speak text
    const speakText = (text) => {
      const speech = new SpeechSynthesisUtterance();
      speech.text = text;
      window.speechSynthesis.speak(speech);
    };

    speakText(
      "Please choose your type of impairment,Glaucoma, Macular Degeneration,Cataract,Diabetic Retinopathy,Achromatopsia,Absolute Blindness"
    );
  }, []);

  return (
    <>
      <div className="relative overflow-hidden ">
        <div className="h-full w-full overflow-hidden dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] absolute inset-0 -z-10 flex items-center justify-center ">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]"></div>
        </div>
        <div className="relative overflow-x-hidden ">
          <div className="flex justify-center items-center h-screen w-screen ">
            <div className="flex flex-col justify-center items-center  gap-5">
              <h1 className="text-4xl">
                Please choose your type of impairment
              </h1>
              <div className="grid grid-cols-3 gap-10">
                <Link
                  href="/glaucoma"
                  className="flex flex-col justify-center items-center gap-4"
                >
                  <Image
                    src="/glaucoma.jpeg"
                    width={250}
                    height={250}
                    alt="glaucoma"
                  ></Image>{" "}
                  <h1 className="text-2xl">Glaucoma</h1>
                </Link>
                <Link
                  href="/dashboard"
                  className="flex flex-col justify-center items-center gap-4 "
                >
                  <Image
                    src="/macular-deg.jpeg"
                    width={250}
                    height={250}
                    alt="macular degeneration"
                  ></Image>{" "}
                  <h1 className="text-2xl">Macular Degeneration</h1>
                </Link>
                <Link
                  href="/dashboard"
                  className="flex flex-col justify-center items-center gap-4"
                >
                  <Image
                    src="/cataract.jpeg"
                    width={250}
                    height={250}
                    alt="Cataract"
                  ></Image>{" "}
                  <h1 className="text-2xl">Cataract</h1>
                </Link>
                <Link
                  href="/dashboard"
                  className="flex flex-col justify-center items-center gap-4"
                >
                  <Image
                    src="/diabetic.jpeg"
                    width={250}
                    height={250}
                    alt="diabetic retinopathy"
                  ></Image>{" "}
                  <h1 className="text-2xl">Diabetic Retinopathy</h1>
                </Link>
                <Link
                  href="/achromatopsia"
                  className="flex flex-col justify-center items-center gap-4"
                >
                  <Image
                    src="/achromatopsia.jpeg"
                    width={250}
                    height={250}
                    alt="achrom"
                  ></Image>{" "}
                  <h1 className="text-2xl">Achromatopsia</h1>
                </Link>
                <Link
                  href="/dashboard"
                  className="flex flex-col justify-center items-center gap-4"
                >
                  <Image
                    src="/absolute.jpeg"
                    width={250}
                    height={250}
                    alt="absolute.jpeg"
                  ></Image>{" "}
                  <h1 className="text-2xl">Absolute Blindness</h1>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

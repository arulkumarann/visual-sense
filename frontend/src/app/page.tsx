import React from "react";
import { SpotlightPreview } from "@/components/ui/SpotlightPreview";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { GridBackgroundDemo } from "@/components/ui/grid-background";
import Link from "next/link";

const people = [
  {
    id: 1,
    name: "Arul Kumaran",
    designation: "",
    image:
      "https://media.licdn.com/dms/image/D5603AQHY6yZbptvMlw/profile-displayphoto-shrink_400_400/0/1703150209927?e=1715817600&v=beta&t=PY04Yy-6DRX2mKVq9om20sJ6NcKPP-XwXmhgusCmxOs",
  },
  {
    id: 2,
    name: "Ruchika Metkar",
    designation: "",
    image:
      "https://media.licdn.com/dms/image/D5603AQEcqot_KDADWQ/profile-displayphoto-shrink_400_400/0/1707747287610?e=1715817600&v=beta&t=ljwHcig16Wk--UjJLYi1UeV-DEKXxjT9TgHg31IyrXM",
  },
  {
    id: 3,
    name: "Sachin Prasanth",
    designation: "",
    image:
      "https://media.licdn.com/dms/image/D5603AQGFAKdq4BRMRA/profile-displayphoto-shrink_400_400/0/1707725115251?e=1715817600&v=beta&t=lGuHVIkE97TGLqSFV3Yq9ATUC6yZekkEWH6mPveUOqg",
  },
  {
    id: 4,
    name: "Suhayb Ahmed",
    designation: "",
    image:
      "https://media.licdn.com/dms/image/D5603AQGDlMH9Pnt3jA/profile-displayphoto-shrink_400_400/0/1693042543408?e=1715817600&v=beta&t=PvZ7DQ8fiQdhtPIx-FsTZHGAgneHw7iuVihe6RNJ2rU",
  },
];

export default function Home() {
  return (
    <div className="relative ">
      <GridBackgroundDemo />
      <main className="flex flex-col bg-black absolute inset-0">
        <SpotlightPreview />
        <div className="flex flex-row items-center justify-center mb-5 w-fit mx-auto z-10 bg-transparent">
          <AnimatedTooltip items={people} />
        </div>{" "}
        <Link
          className="flex self-end justify-center gap-2 items-center h-fit w-fit border border-white/10 rounded-md p-3 px-10 m-3 absolute z-10"
          href="/choice"
        >
          {/* Adjust z-index here */}

          <button>Get Started</button>
        </Link>
      </main>
    </div>
  );
}

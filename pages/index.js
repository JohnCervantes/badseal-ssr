import Image from "next/image";
import { useQuery } from "@apollo/client";
import { readState } from "../operations/query";
import { useEffect } from "react";
import { setState } from "../operations/mutation";

function HomePage() {
  const {
    data: {
      readState: { navbarOpen },
    },
  } = useQuery(readState("navbarOpen"));

  useEffect(() => {
    setState({ showSpinner: false });
  });

  return (
    <div>
      <div
        className={`homepage-container flex-col items-center justify-center  ${
          navbarOpen ? "pt-60" : "pt-36"
        }`}
      >
        <div>
          <p className="homepage-title">
            Welcome and thank you for visiting my website!
          </p>
          <div className="relative mx-auto container w-full mb-1 h-[300px] sm:w-[300px] sm:h-[450px]">
            <Image src="/stock.jpg" layout="fill"></Image>
          </div>
        </div>
        <div className="container mx-auto w-full bg-white p-16  text-black text-center">
          <p className="font-semibold text-3xl">About me</p>
          <div className="divider" />
          <p>
            is blah blahMy name is blah blahMy name is is blah blahMy name is
            blah is blah blahMy name is blah blahMy name is is blah blahMy name
            is blah is blah blahMy name is blah blahMy name is is blah blahMy
            name is blah is blah blahMy name is blah blahMy name is is blah
            blahMy name is blah is blah blahMy name is blah blahMy name is is
            blah blahMy name is blah is blah blahMy name is blah blahMy name is
            is blah blahMy name is blah is blah blahMy name is blah blahMy name
            is is blah blahMy name is blah blahMy name is is blah blahMy name is
            blah blahMy name is is blah
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

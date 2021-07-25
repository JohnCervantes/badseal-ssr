import Image from "next/image";
import { useQuery } from "@apollo/client";
import { readState } from "../operations/query";


function HomePage() {
  const {
    data: {
      readState: { navbarOpen },
    },
  } = useQuery(readState("navbarOpen"));

  return (
    <div>
      <div className="homepage-container flex-col items-center justify-center pb-16">
        <div>
          <p className="homepage-title">
            Welcome and thank you for visiting my website!
          </p>
          <div className="relative mx-auto container w-full h-[300px] sm:w-[300px] sm:h-[450px]">
            <Image src="/stock.jpg" layout="fill"></Image>
          </div>
        </div>
        <div className="container mx-auto w-full bg-white p-16 h-3/6 m-3 text-black text-center">
          <div className="divider">
            <div className="mb-2 font-semibold">About me</div>
            <div/>
          </div>

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

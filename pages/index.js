import Image from "next/image";

function HomePage() {
  return (
    <div className="homepage-container">
      <div className="container">
        <Image src="/stock.jpg" height={50} width={75} layout="responsive"></Image>
      </div>
      <div className="container p-5 h-3/6 sm:w-4/5 m-3 sm:bg-indigo-900 text-white text-center">
        <p className="text-green-100 text-5xl mb-5">
          Welcome and thank you for visiting my website!
        </p>
        <p className="text-3xl mb-3">About me</p>
        <p>
          is blah blahMy name is blah blahMy name is is blah blahMy name is blah
          is blah blahMy name is blah blahMy name is is blah blahMy name is blah
          is blah blahMy name is blah blahMy name is is blah blahMy name is blah
          is blah blahMy name is blah blahMy name is is blah blahMy name is blah
          is blah blahMy name is blah blahMy name is is blah blahMy name is blah
          is blah blahMy name is blah blahMy name is is blah blahMy name is blah
          is blah blahMy name is blah blahMy name is is blah blahMy name is blah
          blahMy name is is blah blahMy name is blah blahMy name is is blah
        </p>
      </div>
    </div>
  );
}

export default HomePage;

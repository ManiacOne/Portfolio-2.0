const GetInTouch = () => {
  return (
    <div className="relative h-screen w-full bg-white flex flex-col items-center justify-center z-40">
      <h2 className="text-[clamp(5rem,_3.571rem_+_3.81vw,_7rem)] font-[Aurochs]">Get In Touch</h2>
      <ul className="flex flex-row gap-8 mt-3 text-md">
        <li>LINKEDIN</li>
        <li>GITHUB</li>
        <li>EMAIL</li>
      </ul>
      <p className="absolute bottom-[2rem] left-1/2 -translate-x-1/2 text-gray-600 text-sm mt-4">
        Copyright © 2024. All rights reserved.
      </p>
    </div>
  );
};

export default GetInTouch;

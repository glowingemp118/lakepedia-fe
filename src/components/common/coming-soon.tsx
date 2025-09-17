import { Button } from "../ui/button";

const ComingSoonPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[90vh] ">
      <div className="text-center p-6  rounded-2xl w-full">
    
        {/* Title */}
        <h1 className=" text-4xl font-extrabold  text-gray-800 dark:text-white">
          Coming Soon
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          We’re working hard to bring you something amazing. Stay tuned!
        </p>

        {/* Call-to-action (optional) */}
        <Button className="mt-6 px-6 py-2 rounded-xl font-semibold transition">
          Notify Me
        </Button>
      </div>
    </div>
  );
};

export default ComingSoonPage;

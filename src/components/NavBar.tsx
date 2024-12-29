export const NavBar = ({
  showBack = true,
  title = "Swipe Demo",
}) => {
  return (
    <nav className="bg-white h-14 flex items-center px-4 right-0 z-50">
      <div className="flex items-center w-full">
        {showBack && (
          <button className="p-2 -ml-2 text-gray-600 hover:text-indigo-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        <h1 className="text-lg font-medium ml-2 flex-1 text-center">{title}</h1>
      </div>
    </nav>
  );
};

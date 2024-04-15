const TopBar: React.FC<unknown> = () => {
  return (
    <div className="sticky top-0 flex flex-row items-center gap-4 overflow-x-auto border-b-1 border-gray-300 bg-gray-200 px-3 py-2 pt-3  shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <a className="font-bold">SiteTitle</a>
      <a>Engineering</a>
      <div className="grow" />
      <a>Category</a>
      <a>About</a>
      <a className="rounded bg-blue-800 px-3 py-0.5 text-white">Contact</a>
    </div>
  );
};

export default TopBar;

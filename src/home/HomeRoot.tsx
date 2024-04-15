const HomeRoot: React.FC<unknown> = (props) => {
  return (
    <div className="flex min-h-full flex-col items-center overflow-y-auto px-6 py-2 opacity-20 md:items-end">
      <div className="grow" />
      <div className="flex min-w-[min(300px,100%)] flex-col gap-2">
        <h1 className="text-4xl font-bold">Sean Zhu</h1>
        <ul className="list-inside list-bullet text-2xl marker:mr-0">
          <li>design</li>
          <li>engineering</li>
          <li>physical</li>
          <li>thoughts</li>
          <li>work history</li>
        </ul>
      </div>
      <div className="grow" />
    </div>
  );
};

export default HomeRoot;

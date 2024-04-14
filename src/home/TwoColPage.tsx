import TopBar from "../app/TopBar";
import HomeRoot from "./HomeRoot";
import WorkHistoryView from "./WorkHistoryView";

const PagesById = {
  root: HomeRoot,
  workHistory: WorkHistoryView,
};

const TwoColPage: React.FC<{
  left: keyof typeof PagesById;
  right: keyof typeof PagesById;
}> = (props) => {
  const Left = PagesById[props.left];
  const Right = PagesById[props.right];

  return (
    <div className="flex h-dvh flex-col md:overflow-y-hidden">
      <header className="contents">
        <TopBar />
      </header>

      <main className="grow bg-white md:grid md:grid-cols-2 md:overflow-y-hidden dark:bg-gray-900">
        <Left />
        <Right />
      </main>

      <footer className="sticky bottom-0 flex flex-row gap-2 border-t-1 border-gray-300 bg-gray-200 p-2 shadow-sm dark:border-gray-700 dark:bg-gray-800" />
    </div>
  );
};

export default TwoColPage;

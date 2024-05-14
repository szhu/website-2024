import _ from "lodash";
import papaparse from "papaparse";
import { z } from "zod";

// https://www.notion.so/c2628c53ba9a4104bcdad64813613844?v=2d7f2e7d4830480a9388daa75c1ac6dc
const csv = `Name	ID	Usability	URL	GitHub	Started	When	Code Type	Description
git-uncommitted	git-uncommitted	Ready		https://github.com/szhu/git-uncommitted	2023/07/15	July 2023	Developer Tool	A simpler alternative to git stash that works per branch and never results in merge conflicts.
ClipVideo	clipvideo	Ready	https://clip-video-szhu.vercel.app/	https://github.com/szhu/ClipVideo	2023/06/15	June 2023	Web App	Chop a long video any number of small pieces, adjacent or overlapping or not, extremely precisely.
???	b	Ready			2023/06/01	June 2023	Web App	????
Lunar Lander Game Autopilot	lunar-lander-autopilot	Ready	https://szhu.github.io/lunar-lander-autopilot/	https://github.com/szhu/lunar-lander-autopilot	2023/03/10	March 2023	Web App	Watch ~100 lines of JS land man on the moon again.
node_modules disk image	nmg	Ready		https://github.com/szhu/nmg	2022/10/13	October 2022	Developer Tool	Mount your node_modules directory as a single file. (macOS only)
Prep Panel	prep-panel	Ready		https://github.com/szhu/prep-panel	2022/07/26	July 2022	Developer Tool	Quickly batch-apply preferences, for onboarding and more.
Pagefreeze	pagefreeze	Ready		https://github.com/szhu/pagefreeze	2022/07/09	July 2022	Chrome Extension	Ban all asynchronous JavaScript on any website.
Gmail Screener	gmail-screener	Ready		https://github.com/szhu/gmail-screener	2022/06/12	June 2022	Google Apps Script	Inspired by Hey Email, a filter to prevent unknown senders to reach your inbox by default.
Gmail Drilldown	gmail-drilldown	Ready		https://gist.github.com/szhu/1d816086307c5de02bc9a2bb1cf01fe0	2022/05/22	May 2022	Chrome Extension	Click any sender or label in Gmail to instantly see all their messages.
Shortcut manager	shortcut-manager	WIP		https://github.com/szhu/hid-shortcut-manager	2021/01/02	January 2021	Developer Tool	A developer-friendly global keyboard shortcuts manager.
github-prune	github-prune	Ready		https://github.com/szhu/github-prune	2019/06/11	June 2019	Developer Tool	Automatically clean up Git branches that have already been merged upstream.
Pushpin	pushpin	Ready	https://chromewebstore.google.com/detail/oeccdogiekfcglkneepeaodoendiikic	https://github.com/szhu/pushpin	2017/03/09	March 2017	Chrome Extension	Keep pinned tabs around even if Chrome automatically closes them.
Facebork	facebork	Defunct			2017/02/22	February 2017	Chrome Extension	Prevent distractions on Facebook by replacing every work with “bork”. (Unavailable due to trademark takedown.)
%%30%30	3030	Ready	https://szhu.github.io/3030/	https://github.com/szhu/3030	2015/09/20	September 2015	Web App	A unique game that exploits the 2015 “link that crashes Chrome” bug.
batchrename	batchrename	Ready		https://github.com/szhu/batchrename	2013/09/05	September 2013	Developer Tool	Batch-rename files using your editor, taking advantage of text-editing shortcuts you’re already familiar with.
S60 apps	s60	Defunct		https://github.com/szhu/s60-sandbox	2008/02/11	2006–2008	Other	Developer tools and other app explorations on the Symbian S60 mobile OS.
`;

const parseCsvResults = papaparse.parse(csv, {
  header: true,
  transformHeader: (header) => _.camelCase(header.toLowerCase()),
  skipEmptyLines: true,
});

function emptyStringToUndefined<T extends string>(value: T | undefined) {
  return value === "" ? undefined : value;
}

const NonEmptyStringCell = z.string().min(1);
const OptionalStringCell = z.string().transform(emptyStringToUndefined);
const OptionalUrlCell = //
  z.union([z.literal(""), z.string().url()]).transform(emptyStringToUndefined);
const ProjectItemSchema = z.object({
  name: NonEmptyStringCell,
  id: NonEmptyStringCell,
  url: OptionalUrlCell,
  github: OptionalUrlCell,
  when: OptionalStringCell,
  // started: OptionalStringCell,
  codeType: z
    .enum([
      "Chrome Extension",
      "Developer Tool",
      "Google Apps Script",
      "Other",
      "Web App",
      "",
    ])
    .transform(emptyStringToUndefined),
  usability: z
    .enum(["Defunct", "Ready", "WIP", ""])
    .transform(emptyStringToUndefined),
  description: OptionalStringCell,
});

export type ProjectItem = z.infer<typeof ProjectItemSchema>;

const data = Object.fromEntries(
  parseCsvResults.data.map((row) => {
    try {
      const item = ProjectItemSchema.parse(row);
      return ["project-" + item.id, item];
    } catch (error) {
      console.error(`Error parsing row: ${JSON.stringify(row, null, 2)}`);
      throw error;
    }
  }),
);

console.log(`import { ProjectItem } from "./ProjectsData.generate";`);
console.log(``);
console.log(`const ProjectsData: Record<string, ProjectItem> =`);
console.log(JSON.stringify(data, null, 2));
console.log();
console.log("export default ProjectsData;");

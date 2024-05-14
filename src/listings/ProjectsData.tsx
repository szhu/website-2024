import { ProjectItem } from "./ProjectsData.generate";

const ProjectsData: Record<string, ProjectItem> = {
  "project-git-uncommitted": {
    name: "git-uncommitted",
    id: "git-uncommitted",
    github: "https://github.com/szhu/git-uncommitted",
    when: "July 2023",
    codeType: "Developer Tool",
    usability: "Ready",
    description:
      "A simpler alternative to git stash that works per branch and never results in merge conflicts.",
  },
  "project-clipvideo": {
    name: "ClipVideo",
    id: "clipvideo",
    url: "https://clip-video-szhu.vercel.app/",
    github: "https://github.com/szhu/ClipVideo",
    when: "June 2023",
    codeType: "Web App",
    usability: "Ready",
    description:
      "Chop a long video any number of small pieces, adjacent or overlapping or not, extremely precisely.",
  },
  "project-b": {
    name: "???",
    id: "b",
    when: "June 2023",
    codeType: "Web App",
    usability: "Ready",
    description: "????",
  },
  "project-lunar-lander-autopilot": {
    name: "Lunar Lander Game Autopilot",
    id: "lunar-lander-autopilot",
    url: "https://szhu.github.io/lunar-lander-autopilot/",
    github: "https://github.com/szhu/lunar-lander-autopilot",
    when: "March 2023",
    codeType: "Web App",
    usability: "Ready",
    description: "Watch ~100 lines of JS land man on the moon again.",
  },
  "project-nmg": {
    name: "node_modules disk image",
    id: "nmg",
    github: "https://github.com/szhu/nmg",
    when: "October 2022",
    codeType: "Developer Tool",
    usability: "Ready",
    description:
      "Mount your node_modules directory as a single file. (macOS only)",
  },
  "project-prep-panel": {
    name: "Prep Panel",
    id: "prep-panel",
    github: "https://github.com/szhu/prep-panel",
    when: "July 2022",
    codeType: "Developer Tool",
    usability: "Ready",
    description: "Quickly batch-apply preferences, for onboarding and more.",
  },
  "project-pagefreeze": {
    name: "Pagefreeze",
    id: "pagefreeze",
    github: "https://github.com/szhu/pagefreeze",
    when: "July 2022",
    codeType: "Chrome Extension",
    usability: "Ready",
    description: "Ban all asynchronous JavaScript on any website.",
  },
  "project-gmail-screener": {
    name: "Gmail Screener",
    id: "gmail-screener",
    github: "https://github.com/szhu/gmail-screener",
    when: "June 2022",
    codeType: "Google Apps Script",
    usability: "Ready",
    description:
      "Inspired by Hey Email, a filter to prevent unknown senders to reach your inbox by default.",
  },
  "project-gmail-drilldown": {
    name: "Gmail Drilldown",
    id: "gmail-drilldown",
    github: "https://gist.github.com/szhu/1d816086307c5de02bc9a2bb1cf01fe0",
    when: "May 2022",
    codeType: "Chrome Extension",
    usability: "Ready",
    description:
      "Click any sender or label in Gmail to instantly see all their messages.",
  },
  "project-shortcut-manager": {
    name: "Shortcut manager",
    id: "shortcut-manager",
    github: "https://github.com/szhu/hid-shortcut-manager",
    when: "January 2021",
    codeType: "Developer Tool",
    usability: "WIP",
    description: "A developer-friendly global keyboard shortcuts manager.",
  },
  "project-github-prune": {
    name: "github-prune",
    id: "github-prune",
    github: "https://github.com/szhu/github-prune",
    when: "June 2019",
    codeType: "Developer Tool",
    usability: "Ready",
    description:
      "Automatically clean up Git branches that have already been merged upstream.",
  },
  "project-pushpin": {
    name: "Pushpin",
    id: "pushpin",
    url: "https://chromewebstore.google.com/detail/oeccdogiekfcglkneepeaodoendiikic",
    github: "https://github.com/szhu/pushpin",
    when: "March 2017",
    codeType: "Chrome Extension",
    usability: "Ready",
    description:
      "Keep pinned tabs around even if Chrome automatically closes them.",
  },
  "project-facebork": {
    name: "Facebork",
    id: "facebork",
    when: "February 2017",
    codeType: "Chrome Extension",
    usability: "Defunct",
    description:
      "Prevent distractions on Facebook by replacing every work with “bork”. (Unavailable due to trademark takedown.)",
  },
  "project-3030": {
    name: "%%30%30",
    id: "3030",
    url: "https://szhu.github.io/3030/",
    github: "https://github.com/szhu/3030",
    when: "September 2015",
    codeType: "Web App",
    usability: "Ready",
    description:
      "A unique game that exploits the 2015 “link that crashes Chrome” bug.",
  },
  "project-batchrename": {
    name: "batchrename",
    id: "batchrename",
    github: "https://github.com/szhu/batchrename",
    when: "September 2013",
    codeType: "Developer Tool",
    usability: "Ready",
    description:
      "Batch-rename files using your editor, taking advantage of text-editing shortcuts you’re already familiar with.",
  },
  "project-s60": {
    name: "S60 apps",
    id: "s60",
    github: "https://github.com/szhu/s60-sandbox",
    when: "2006–2008",
    codeType: "Other",
    usability: "Defunct",
    description:
      "Developer tools and other app explorations on the Symbian S60 mobile OS.",
  },
};

export default ProjectsData;

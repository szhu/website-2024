import Image from "next/image";
import screencastHero from "./screencast-hero.gif";

const page: React.FC<unknown> = () => {
  return (
    <>
      <p>
        <b>Pushpin</b> is a Chrome extension that saves and restores your set of
        pinned tabs. Chrome pins are easy to lose accidentally and there is no
        built-in way to persist a preferred set -- Pushpin fills that gap.
      </p>

      <p>
        <Image
          alt="Pushpin popup showing a saved set of pinned tabs"
          src={screencastHero}
          unoptimized
        />
      </p>

      <p>
        <b>Timeline</b>
      </p>

      <p>
        Shipped in a single session on March 9, 2017 -- code, screenshot, and
        Web Store description all committed the same morning. Dormant for two
        years, then reactivated in bursts: feature work in 2019, permission
        trims in 2022, and a Manifest V3 migration in May 2024 (latest release,
        v0.6.0). Sole author, 61 commits over 7 years.
      </p>

      <p>
        <b>Design decisions worth calling out</b>
      </p>

      <ul>
        <li>
          <b>Don&rsquo;t set any keybindings by default.</b> An earlier version
          shipped with default shortcuts; in September 2019 the default was
          removed, requiring users to opt in.
        </li>
        <li>
          <b>Narrowed permissions after the fact.</b> Two separate commits in
          July 2022 removed the <code>activeTab</code> and <code>tabs</code>{" "}
          permissions once they were no longer needed. Deliberate scope
          reduction rather than a one-time up-front decision.
        </li>
        <li>
          <b>JavaScript + JSDoc, not TypeScript.</b> The README calls this out
          as a stated tradeoff: keep contribution friction low (no compilation
          step) while still getting type checking.
        </li>
        <li>
          <b>Feedback loop lives on GitHub, not the Web Store.</b> The Web Store
          listing copy (<code>detailed_description.txt</code>) tells users to
          file GitHub issues for bugs and requests, because Web Store review
          replies don&rsquo;t notify.
        </li>
      </ul>

      <p>
        <b>Public backlog</b>
      </p>

      <p>
        The README publishes a &ldquo;Possible future features&rdquo; list:
        prevent accidental close, multiple configurations, per-tab always-muted,
        smarter partial restore. Explicit CTA to request features via GitHub
        issues rather than leaving unaddressed store reviews.
      </p>
    </>
  );
};

export default page;

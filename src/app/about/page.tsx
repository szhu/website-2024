/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import Disabled from "../../debug/Disabled";
import { ReadingStyle } from "../../items/ItemView";
import { useGreeting } from "../HomeGreeting";

const ContactButton: React.FC<{
  href: string;
}> = (props) => {
  return (
    <span className="block text-right">
      <a
        href={props.href}
        className="mx-2 cursor-pointer text-xs text-zinc-400"
      >
        Reach out ▸
      </a>
    </span>
  );
};

const page: React.FC<unknown> = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const greeting = useGreeting();

  return (
    <>
      <p>
        <img
          alt="A fake plant in a pot"
          width="100"
          height="100"
          draggable="false"
          src="https://www.ikea.com/us/en/images/products/fejka-artificial-potted-plant-with-pot-indoor-outdoor-succulent__0614211_pe686835_s5.jpg?f=s"
          title={greeting}
          suppressHydrationWarning
          className="rounded-md"
        />
      </p>
      <p>Hi, I’m Sean. I’m a software engineer and aspiring designer.</p>
      <p>
        I want to create tools that assist people in doing more of what they
        want to do. I have an interest in tools that are non-distracting, follow
        existing domain-specific conventions, and take up as little of users’
        headspace as possible.
      </p>
      <p>
        I want what I make to be useful to everyone, especially those who are
        often overlooked by mainstream technology.
      </p>

      <hr className="invisible [:has(details[open])>&]:visible" />

      <details>
        <summary className="contents cursor-pointer font-bold [&::-webkit-details-marker]:hidden">
          Contact
        </summary>

        <div className={ReadingStyle}>
          <p>
            If you’d like to reach out, here are the things I’m most interested
            in at the moment:
          </p>

          {Disabled && (
            <p>
              <b>Following up on any of my free ideas.</b> If you want to work
              with me or just want to take my idea and design/implementation
              advice, I’m happy to offer it.{" "}
              <ContactButton href="mailto:hello+f3b3cf@szhu.me" />
            </p>
          )}

          <p>
            <b>Engineering, design, or consulting opportunities.</b> I am
            currently{" "}
            <Link href="/work" className="underline">
              employed
            </Link>
            , so I’m mostly interested contributing to passion projects,
            open-source projects, or projects with no conflicts of interest.{" "}
            <ContactButton href="mailto:hello+2f0565@szhu.me" />
          </p>

          <p>
            <b>Tiny website or app design.</b> I’m always trying to try out new
            technologies, and small projects are great practice for me, and in
            these case I often enjoy getting paid in experience and exposure. If
            you have an idea for a 1-3 page website or web app that you’d like
            built, please reach out and I’ll let you know if it’s a fit.{" "}
            <ContactButton href="mailto:hello+17d86b@szhu.me" />
          </p>

          <p>
            <b>IRL meetups.</b> If you’re in NYC and think we might have some
            common interests, common experiences, or mutuals, I’d love to say hi
            in person! <ContactButton href="mailto:hello+dfb20d@szhu.me" />
          </p>

          <p>
            <b>Talking about my previous experiences.</b> There’s a lot I wish I
            knew before I started many of my past experiences, and I’m more than
            happy to pay it forward.{" "}
            <ContactButton href="mailto:hello+2f061b@szhu.me" />
          </p>

          <p>
            <b>Other things?</b> I am more likely to say yes if we have at least
            something vaguely in common, including any of the above. If you’re
            not sure, feel free to ask! I am currently responding to all
            incoming mail and the worst I can do is say no.{" "}
            <ContactButton href="mailto:hello+33517a@szhu.me" />
          </p>

          <p className="text-xs">
            You can also contact me via{" "}
            <a
              className="text-zinc-400"
              target="_blank"
              href="https://twitter.com/sfzhu"
              rel="noreferrer"
            >
              Twitter
            </a>{" "}
            or{" "}
            <a
              className="text-zinc-400"
              target="_blank"
              href="https://linkedin.com/in/interestinglythere"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            . (Make sure you send a message or leave a note so I know why you’re
            reaching out; otherwise I will decline the connection.)
          </p>

          <p className="text-xs text-zinc-400">Last updated 2024-06-21.</p>
        </div>
      </details>
    </>
  );
};

export default page;

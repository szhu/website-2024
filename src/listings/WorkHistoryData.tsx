import zod from "zod";

interface WorkHistoryDescription {
  images: {
    image: string;
    caption: string;
  };
  text: string;
}

const WorkHistoryDescriptions: Record<string, WorkHistoryDescription> = {
  "Mutable.ai": {
    images: {
      image: "mutable-ai-logo.png",
      caption: "Mutable.ai Logo",
    },
    text: `
    Mutable.ai is a platform for building and deploying serverless applications.
    `,
  },
  OneSchema: {
    images: {
      image: "oneschema-logo.png",
      caption: "OneSchema Logo",
    },
    text: `
    OneSchema is a platform for building and deploying serverless applications.
    `,
  },
  "Contribution Labs": {
    images: {
      image: "mintkudos-logo.png",
      caption: "MintKudos Logo",
    },
    text: `
    Contribution Labs is a platform for building and deploying serverless applications.
    `,
  },
  Nomify: {
    images: {
      image: "nommenu-logo.png",
      caption: "NomMenu Logo",
    },
    text: `
    Nomify is a platform for building and deploying serverless applications.
    `,
  },
  Slab: {
    images: {
      image: "slab-logo.png",
      caption: "Slab Logo",
    },
    text: `
    Slab is a platform for building and deploying serverless applications.
    `,
  },
  "Otter.ai": {
    images: {
      image: "otter-logo.png",
      caption: "Otter Logo",
    },
    text: `
    Otter.ai is a platform for building and deploying serverless applications.
    `,
  },
  Recividiz: {
    images: {
      image: "recidiviz-logo.png",
      caption: "Recidiviz Logo",
    },
    text: `
    Recividiz is a platform for building and deploying serverless applications.
    `,
  },
  Affinity: {
    images: {
      image: "affinity-logo.png",
      caption: "Affinity Logo",
    },
    text: `
    Affinity is a platform for building and deploying serverless applications.
    `,
  },
  Google: {
    images: {
      image: "google-logo.png",
      caption: "Google Logo",
    },
    text: `
    Google is a platform for building and deploying serverless applications.
    `,
  },
  TheDesignExchange: {
    images: {
      image: "best-logo.png",
      caption: "BEST Logo",
    },
    text: `
    TheDesignExchange is a platform for building and deploying serverless applications.
    `,
  },
  IFTTT: {
    images: {
      image: "ifttt-logo.png",
      caption: "IFTTT Logo",
    },
    text: `
    IFTTT is a platform for building and deploying serverless applications.
    `,
  },
  "The Daily Californian": {
    images: {
      image: "dailycal-logo.png",
      caption: "Daily Cal Logo",
    },
    text: `
    The Daily Californian is a platform for building and deploying serverless applications.
    `,
  },
  Tumblr: {
    images: {
      image: "tumblr-logo.png",
      caption: "Tumblr Logo",
    },
    text: `
    Tumblr is a platform for building and deploying serverless applications.
    `,
  },
  "Global Philanthropy Forum": {
    images: {
      image: "philanthropyforum-logo.png",
      caption: "Philanthropy Forum Logo",
    },
    text: `
    Global Philanthropy Forum is a platform for building and deploying serverless applications.
    `,
  },
  "LBNL/NERSC": {
    images: {
      image: "lbl-logo.png",
      caption: "LBL Logo",
    },
    text: `
    LBNL/NERSC is a platform for building and deploying serverless applications.
    `,
  },
};

interface WorkHistoryItem {
  id: string;
  organization: string;
  domain: string;
  role: string;
  order: string;
  when: string;
}

export const WorkHistoryData: WorkHistoryItem[] = `
mutableai	Mutable.ai	mutable.ai	Lead Frontend Engineer & Designer	2023-06	2023–
oneschema	OneSchema	oneschema.co	Software Engineer	2022-03	Spring 2022
contributionlabs	Contribution Labs	mintkudos.xyz	Software Engineer	2021-12	Winter 2021
nomify	Nomify	www.nommenu.com	Designer & Software Engineer	2021-06	2021–2022
slab	Slab	slab.com	Software Engineer	2020-10	2020–2021
otterai	Otter.ai	otter.ai	Software Engineer	2020-09	2020–2021
recidiviz	Recividiz	www.recidiviz.org	Software Engineer	2020-03	Spring 2023
affinity	Affinity	affinity.co	Software Engineer	2018-01	2018–2020
google	Google	google.com	Software Engineer	2016-08	2016–2017
thedesignexchange	TheDesignExchange	best.berkeley.edu/best-research/thedesignexchange/	Software Engineer	2015-02	2015–2016
ifttt	IFTTT	ifttt.com	Software Engineer Intern	2014-06	Summer 2014
dailycal	The Daily Californian	dailycal.org	Software Engineer	2012-09	2012–2015
tumblr	Tumblr	tumblr.com	Theme Garden Liaison & Software Engineer	2012-07	2012–2015
globalphilanthropyforum	Global Philanthropy Forum	www.philanthropyforum.org	Software Engineer Intern	2012-05	Summer 2012
nersc	LBNL/NERSC	lbl.gov	Software Engineer Intern	2011-06	Summer 2011
`
  .trim()
  .split("\n")
  .map((line) => {
    const [sId, sOrganization, sDomain, sRole, sOrder, sWhen] =
      line.split("\t");

    const NonEmptyString = zod.string().min(1);
    const id = NonEmptyString.parse(sId);
    const organization = NonEmptyString.parse(sOrganization);
    const domain = NonEmptyString.parse(sDomain);
    const role = NonEmptyString.parse(sRole);
    const order = NonEmptyString.parse(sOrder);
    const when = NonEmptyString.parse(sWhen);

    return {
      id,
      organization,
      domain,
      role,
      order,
      when,
      ...WorkHistoryDescriptions[organization],
    };
  });

import zod from "zod";

interface WorkHistoryItem {
  organization: string;
  domain: string;
  role: string;
  order: string;
  when: string;
}

export const WorkHistory: WorkHistoryItem[] = `
Mutable.ai	mutable.ai	Lead Frontend Engineer & Designer	2023-06	2023–
OneSchema	oneschema.co	Software Engineer	2022-03	Spring 2022
Contribution Labs	mintkudos.xyz	Software Engineer	2021-12	Winter 2021
Nomify	www.nommenu.com	Designer & Software Engineer	2021-06	2021–2022
Slab	slab.com	Software Engineer	2020-10	2020–2021
Otter.ai	otter.ai	Software Engineer	2020-09	2020–2021
Recividiz	www.recidiviz.org	Software Engineer	2020-03	Spring 2023
Affinity	affinity.co	Software Engineer	2018-01	2018–2020
Google	google.com	Software Engineer	2016-08	2016–2017
TheDesignExchange	best.berkeley.edu/best-research/thedesignexchange/	Software Engineer	2015-02	2015–2016
IFTTT	ifttt.com	Software Engineer Intern	2014-06	Summer 2014
The Daily Californian	dailycal.org	Software Engineer	2012-09	2012–2015
Tumblr	tumblr.com	Theme Garden Liaison & Software Engineer	2012-07	2012–2015
Global Philanthropy Forum	www.philanthropyforum.org	Software Engineer Intern	2012-05	Summer 2012
LBNL/NERSC	lbl.gov	Software Engineer Intern	2011-06	Summer 2011
`
  .trim()
  .split("\n")
  .map((line) => {
    const [organization, domain, role, order, when] = line.split("\t");

    const NonEmptyString = zod.string().min(1);
    return {
      organization: NonEmptyString.parse(organization),
      domain: NonEmptyString.parse(domain),
      role: NonEmptyString.parse(role),
      order: NonEmptyString.parse(order),
      when: NonEmptyString.parse(when),
    };
  });

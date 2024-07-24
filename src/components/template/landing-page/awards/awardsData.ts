interface IAwards {
  awardImage: string;
  awarderImage: string;
  alt: string;
  title: string;
  subtitle: string;
  content: IAwardsContent[];
}

interface IAwardsContent {
  heading: string;
  description: string[];
}

export const AWARDS_DATA = [
  {
    awardImage: 'regulation-asia-award.png',
    awarderImage: '',
    alt: '5th Regulation Asia Awards for Excellence 2022',
    title: '5th Regulation Asia Awards for Excellence 2022',
    subtitle: 'Regulation Asia',
    content: [
      {
        heading: '"One to Watch &#45; Blockchain for KYC"',
        description: [],
      },
    ],
  },
  {
    awardImage: 'red-herring-award.png',
    awarderImage: '',
    alt: 'Red Herring Award',
    title: '2022 Red Herring Top 100 Global',
    subtitle: 'Red Herring',
    content: [
      {
        heading:
          'ParallelChain Lab Selected as a 2022 Red Herring Top 100 Global',
        description: [],
      },
    ],
  },
  {
    awardImage: 'fintech-award.png',
    awarderImage: 'etnet-logo.png',
    alt: 'ETnet Blockchain Award',
    title: '2020 FinTech Awards',
    subtitle: 'ETNet / Hong Kong Economic Times',
    content: [
      {
        heading: 'Grand Prize: "FinTech of the Year 2020 in Start-up"',
        description: [],
      },
    ],
  },
  {
    awardImage: 'bc-award.png',
    awarderImage: 'etnt-logo.png',
    alt: 'ETnet Blockchain Award',
    title: '2020 FinTech Awards',
    subtitle: 'ETNet / Hong Kong Economic Times',
    content: [
      {
        heading:
          '"Outstanding Real-Time Monitoring Blockchain Application System Solution"',
        description: [],
      },
    ],
  },
  {
    awardImage: 'hkb-award.png',
    awarderImage: 'hkb-logo.png',
    alt: 'HKB Award',
    title: 'Hong Kong Business Technology Excellence Awards 2020',
    subtitle: 'Hong Kong Business Magazine',
    content: [
      {
        heading: '"Blockchain - Computer Software"',
        description: [],
      },
    ],
  },
  {
    awardImage: 'adl-award.png',
    awarderImage: '',
    alt: 'ADL',
    title: 'ADL Report on ParallelChain®',
    subtitle: 'Arthur D. Little',
    content: [
      {
        heading: 'Ranked #1 Blockchain in the World for:',
        description: ['Blockchain Performance', 'Total Cost of Ownership'],
      },
      {
        heading: 'The Best Blockchain Solution for',
        description: [
          'Contract Management: Security Offering, Clean Energy',
          'Know Your Customer (KYC)',
        ],
      },
    ],
  },
];

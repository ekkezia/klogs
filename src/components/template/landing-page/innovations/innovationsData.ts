export interface IApplication {
  suptitle: string;
  title: string;
  url?: string;
  image: string[];
  text?: string;
}

export const INNOVATIONS_DATA = {
  title: 'Research & Development Focuses',
  objective:
    'Advancing our technical leadership with continuous innovations that are years ahead of the world&apos;s digital curve.',
  strategy:
    'Identify the common denominator and develop a core technology for multiple platforms and different vertical applications/solutions.',
};

export const INNOVATIONS_APPLICATIONS = {
  title: 'Full-Stack Development',
  subtitle: 'Encompassing Infrastructure, Platform, and Application.',
  core: [
    {
      suptitle: 'Core / Infrastructure',
      title: 'Distributed Systems',
      url: 'https://parallelchain-lab.io/technology#distributed-systems',
      image: [],
      // text: 'Most organizations are expected to abide by the EU&apos;s GDPR and other data protection regulations, all which eKYC-Chain is fully compliant with.',
    },
    {
      suptitle: 'Core / Infrastructure',
      title: 'Artificial Intelligence',
      url: 'https://parallelchain-lab.io/technology#artificial-intelligence',
      image: [],
      // text: 'Via tracking and analysing the time stamps and location of submission.',
    },
  ],
  platform: [
    {
      suptitle: 'Layer-1 Platform',
      title: 'ParallelChain Mainnet',
      url: 'https://parallelchain.io',
      image: [],
      // image: ['/images/mainnet/mainnet-logo.svg'],
      // text: 'Reliable face verification with spoofing detection that pre-empts identity fraud and establishes a link between the physical and digital identity.',
    },
    {
      suptitle: 'Layer-1 Platform',
      title: 'ParallelChain Enterprise',
      // url: 'https://parallelchain-lab.io/products',
      image: [],
      // text: 'Data is automatically checked for duplicates right when a user provides it. Suspicious accfounts that call for investigation are easily identified.',
    },
  ],
  application: [
    {
      suptitle: 'Application',
      title: 'Enterprise Vertical Solutions',
      url: 'https://parallelchain-lab.io/vertical-solutions/overview',
      image: [
        '/images/vertical-solutions/ekyc-chain/ekyc-chain-logo.svg',
        '/images/vertical-solutions/approval-chain/approval-chain-logo.svg',
        '/images/vertical-solutions/preventive-chain/preventive-chain-logo.svg',
        '/images/vertical-solutions/chattel-chain/chattel-chain-logo.svg',
      ],
      // text: 'Most organizations are expected to abide by the EU&apos;s GDPR and other data protection regulations, all which eKYC-Chain is fully compliant with.',
    },
    {
      suptitle: 'Application',
      title: 'ParallelWallet',
      url: 'https://parallelchain-lab.io/parallelwallet',
      image: ['/images/parallel-wallet/pwallet-logo.svg'],
      // text: 'Designed to aid processes that involve identity verification &#45; from internal business procedures to regulatory compliances such as KYC and AML.',
    },
  ],
};

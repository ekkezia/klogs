interface IPatentsData {
  title: string;
  patents: IPatentItem[];
}

// interface IPatentsList {
//   [key: string]: string[];
// }
interface IPatentItem {
  name: string;
  status: string;
  issuer: string;
}

export const STATUS = {
  Issued: 'Issued',
  'Received Intention to Grant': 'Received Intention to Grant',
  Published: 'Published',
};

export const ISSUER = {
  US: 'US',
  EU: 'EU',
  // UK: 'UK',
  CN: 'CN',
};

export const PATENTS_DATA: IPatentsData[] = [
  {
    title: 'Methods of Proving Immutability of Digital Records',
    patents: [
      {
        name: '(USA - issued) Patent No. 11483131 B2',
        status: STATUS['Issued'],
        issuer: ISSUER.US,
      },
      {
        name: '(EU - received intention to grant) EP21150794.2',
        status: STATUS['Received Intention to Grant'],
        issuer: ISSUER.EU,
      },
      {
        name: '(CN - published) 202110030264.1',
        status: STATUS['Published'],
        issuer: ISSUER.CN,
      },
    ],
  },
  {
    title: 'Parallel Blockchain Processing',
    patents: [
      {
        name: '(USA - issued) Patent No. 11403281 B2',
        status: STATUS['Issued'],
        issuer: ISSUER.US,
      },
    ],
  },
  {
    title:
      'Blockchain-based Transaction Platform with Enhanced Scalability, Testability and Usability',
    patents: [
      {
        name: '(USA - issued) Patent No. 11409730',
        status: STATUS['Issued'],
        issuer: ISSUER.US,
      },
    ],
  },
  {
    title: 'Systems and Methods for Proving Immutability of Blockchains',
    patents: [
      {
        name: '(USA - issued) Patent No. 11570005',
        status: STATUS['Issued'],
        issuer: ISSUER.US,
      },
    ],
  },
  {
    title: 'Ability to Forget in Blockchain',
    patents: [
      {
        name: '(USA - issued) Patent No. 11483131 B2',
        status: STATUS['Issued'],
        issuer: ISSUER.US,
      },
      {
        name: '(EU - received intention to grant) EP21150793.4',
        status: STATUS['Received Intention to Grant'],
        issuer: ISSUER.EU,
      },
      {
        name: '(CN - published) 202110031180.X',
        status: STATUS['Published'],
        issuer: ISSUER.CN,
      },
    ],
  },
  {
    title: 'Blockchain-based Failsafe Mechanisms for Autonomous Systems',
    patents: [
      {
        name: '(USA - issued) Patent No. 11,531,330 B2',
        status: STATUS['Issued'],
        issuer: ISSUER.US,
      },
    ],
  },
];

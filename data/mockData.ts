import { RoommateMember, FlatExpense, FlatSettlement, FlatNotification, SchemaEntitySpec } from '../types';

export const APP_META = {
  name: 'Flat Hisab: Expense Splitter',
  shortName: 'Flat Hisab',
  version: '1.00.04',
  author: 'Aditya',
  themeColor: '#0B4B3D',
  backgroundColor: '#06382D',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.adityaproductionspendwise.app',
  aiStudioUrl: 'https://ai.studio/apps/916927bb-23df-45c3-a272-025dd910d1f3',
  defaultFlatName: 'Flat 302, Green Fields',
  defaultFlatCode: '564903'
};

export const INITIAL_ROOMMATES: RoommateMember[] = [
  {
    uid: 'usr_aditya',
    displayName: 'Aditya',
    email: 'adityaa89468@gmail.com',
    role: 'admin',
    upiId: 'aditya@okaxis',
    roommateScore: 100,
    joinedAt: '2026-09-01T10:00:00Z'
  },
  {
    uid: 'usr_rohan',
    displayName: 'Rohan Verma',
    email: 'rohan.v@gmail.com',
    role: 'member',
    upiId: 'rohanv@okicici',
    roommateScore: 96,
    joinedAt: '2026-09-01T10:15:00Z'
  },
  {
    uid: 'usr_priya',
    displayName: 'Priya Nair',
    email: 'priya.nair@outlook.com',
    role: 'member',
    upiId: 'priyanair@ybl',
    roommateScore: 100,
    joinedAt: '2026-09-02T09:30:00Z'
  },
  {
    uid: 'usr_kabir',
    displayName: 'Kabir Sharma',
    email: 'kabir.s@gmail.com',
    role: 'member',
    upiId: 'kabir@paytm',
    roommateScore: 92,
    joinedAt: '2026-09-03T18:20:00Z'
  }
];

export const INITIAL_EXPENSES: FlatExpense[] = [
  {
    id: 'exp_101',
    title: 'Maid & Morning Cook Monthly Salary',
    amount: 4800,
    payerId: 'usr_aditya',
    payerName: 'Aditya',
    category: 'Maid & Cook',
    date: '2026-10-15',
    splitType: 'equal',
    splits: [
      { uid: 'usr_aditya', displayName: 'Aditya', amount: 1200 },
      { uid: 'usr_rohan', displayName: 'Rohan Verma', amount: 1200 },
      { uid: 'usr_priya', displayName: 'Priya Nair', amount: 1200 },
      { uid: 'usr_kabir', displayName: 'Kabir Sharma', amount: 1200 }
    ]
  },
  {
    id: 'exp_102',
    title: 'ACT Fibernet 300Mbps WiFi Bill',
    amount: 1400,
    payerId: 'usr_priya',
    payerName: 'Priya Nair',
    category: 'WiFi',
    date: '2026-10-16',
    splitType: 'equal',
    splits: [
      { uid: 'usr_aditya', displayName: 'Aditya', amount: 350 },
      { uid: 'usr_rohan', displayName: 'Rohan Verma', amount: 350 },
      { uid: 'usr_priya', displayName: 'Priya Nair', amount: 350 },
      { uid: 'usr_kabir', displayName: 'Kabir Sharma', amount: 350 }
    ]
  },
  {
    id: 'exp_103',
    title: 'Zepto Kitchen & Dairy Essentials',
    amount: 1600,
    payerId: 'usr_aditya',
    payerName: 'Aditya',
    category: 'Groceries',
    date: '2026-10-17',
    splitType: 'equal',
    splits: [
      { uid: 'usr_aditya', displayName: 'Aditya', amount: 400 },
      { uid: 'usr_rohan', displayName: 'Rohan Verma', amount: 400 },
      { uid: 'usr_priya', displayName: 'Priya Nair', amount: 400 },
      { uid: 'usr_kabir', displayName: 'Kabir Sharma', amount: 400 }
    ]
  },
  {
    id: 'exp_104',
    title: 'BESCOM Flat Electricity Utility',
    amount: 2400,
    payerId: 'usr_rohan',
    payerName: 'Rohan Verma',
    category: 'Electricity',
    date: '2026-10-18',
    splitType: 'equal',
    splits: [
      { uid: 'usr_aditya', displayName: 'Aditya', amount: 600 },
      { uid: 'usr_rohan', displayName: 'Rohan Verma', amount: 600 },
      { uid: 'usr_priya', displayName: 'Priya Nair', amount: 600 },
      { uid: 'usr_kabir', displayName: 'Kabir Sharma', amount: 600 }
    ]
  }
];

export const INITIAL_SETTLEMENTS: FlatSettlement[] = [
  {
    id: 'set_201',
    fromId: 'usr_kabir',
    fromName: 'Kabir Sharma',
    toId: 'usr_aditya',
    toName: 'Aditya',
    amount: 800,
    upiTxnId: 'UPI6291048821',
    createdAt: '2026-10-17T19:30:00Z',
    status: 'settled'
  }
];

export const INITIAL_NOTIFICATIONS: FlatNotification[] = [
  {
    id: 'notif_1',
    text: 'Rohan Verma added ₹2,400 for BESCOM Flat Electricity Utility (Your share: ₹600)',
    type: 'expense',
    createdAt: '2026-10-18T08:15:00Z',
    read: false
  },
  {
    id: 'notif_2',
    text: 'Kabir Sharma settled ₹800 with Aditya via UPI (TXN: UPI6291048821)',
    type: 'settlement',
    createdAt: '2026-10-17T19:30:00Z',
    read: true
  },
  {
    id: 'notif_3',
    text: 'Priya Nair added ₹1,400 for ACT Fibernet 300Mbps WiFi Bill (Your share: ₹350)',
    type: 'expense',
    createdAt: '2026-10-16T14:20:00Z',
    read: true
  }
];

export const FIRESTORE_SCHEMA_SPECS: SchemaEntitySpec[] = [
  {
    id: 'Group',
    title: 'Room or Flat Group',
    collectionPath: '/groups/{groupId}',
    description: 'Core document representing a shared apartment, hostel room, or flatmate group with a unique 6-digit invite code.',
    fields: [
      { name: 'id', type: 'string', required: true, note: 'Unique Firestore document ID' },
      { name: 'name', type: 'string', required: true, note: 'e.g. "Flat 302, Green Fields"' },
      { name: 'code', type: 'string', required: true, note: '6-digit numeric join code (e.g. "564903")' },
      { name: 'adminId', type: 'string', required: true, note: 'UID of the roommate who created the flat' },
      { name: 'members', type: 'array', required: true, note: 'Embedded array of RoommateMember objects for single-read speed' },
      { name: 'inventory', type: 'array', note: 'Shared flat kitchen & appliance checklist' },
      { name: 'tasks', type: 'array', note: 'Shared roommate chore rotation list' },
      { name: 'eventFunds', type: 'array', note: 'Pooled funds for birthdays or house parties' }
    ],
    sampleJson: {
      id: 'grp_flat302_99a',
      name: 'Flat 302, Green Fields',
      code: '564903',
      adminId: 'usr_aditya',
      members: [
        { uid: 'usr_aditya', displayName: 'Aditya', role: 'admin', joinedAt: '2026-09-01T10:00:00Z' },
        { uid: 'usr_rohan', displayName: 'Rohan Verma', role: 'member', joinedAt: '2026-09-01T10:15:00Z' }
      ],
      createdAt: '2026-09-01T10:00:00Z'
    }
  },
  {
    id: 'Expense',
    title: 'Room Split Expense',
    collectionPath: '/groups/{groupId}/expenses/{expenseId}',
    description: 'Records a household bill paid by one roommate and split across selected flatmates.',
    fields: [
      { name: 'id', type: 'string', required: true, note: 'Expense entry ID' },
      { name: 'title', type: 'string', required: true, note: 'Description (e.g. "WiFi Bill", "Maid Salary")' },
      { name: 'amount', type: 'number', required: true, note: 'Total bill amount in ₹ INR' },
      { name: 'payerId', type: 'string', required: true, note: 'UID of the roommate who paid the merchant' },
      { name: 'payerName', type: 'string', required: true, note: 'Display name of payer' },
      { name: 'category', type: 'string', required: true, note: 'Category tag for ledger filtering' },
      { name: 'splitType', type: 'enum', required: true, note: '"equal" | "percentage" | "selected"' },
      { name: 'splits', type: 'array', required: true, note: 'Per-roommate share breakdown [{ uid, displayName, amount }]' }
    ],
    sampleJson: {
      id: 'exp_101',
      title: 'ACT Fibernet 300Mbps WiFi Bill',
      amount: 1400,
      payerId: 'usr_priya',
      payerName: 'Priya Nair',
      category: 'WiFi',
      date: '2026-10-16',
      splitType: 'equal',
      splits: [
        { uid: 'usr_aditya', displayName: 'Aditya', amount: 350 },
        { uid: 'usr_rohan', displayName: 'Rohan Verma', amount: 350 },
        { uid: 'usr_priya', displayName: 'Priya Nair', amount: 350 },
        { uid: 'usr_kabir', displayName: 'Kabir Sharma', amount: 350 }
      ]
    }
  },
  {
    id: 'Settlement',
    title: 'Debt Settlement Record',
    collectionPath: '/groups/{groupId}/settlements/{settlementId}',
    description: 'Logs verified peer-to-peer UPI or cash repayments between flatmates to clear simplified balances.',
    fields: [
      { name: 'id', type: 'string', required: true, note: 'Settlement transaction ID' },
      { name: 'amount', type: 'number', required: true, note: 'Amount settled in ₹ INR' },
      { name: 'fromId', type: 'string', required: true, note: 'Debtor UID who sent the payment' },
      { name: 'toId', type: 'string', required: true, note: 'Creditor UID who received the payment' },
      { name: 'status', type: 'enum', required: true, note: '"pending" | "settled"' },
      { name: 'upiTxnId', type: 'string', note: 'Reference UPI transaction ID for audit trail' }
    ],
    sampleJson: {
      id: 'set_201',
      amount: 800,
      fromId: 'usr_kabir',
      fromName: 'Kabir Sharma',
      toId: 'usr_aditya',
      toName: 'Aditya',
      status: 'settled',
      upiTxnId: 'UPI6291048821',
      createdAt: '2026-10-17T19:30:00Z'
    }
  },
  {
    id: 'UserProfile',
    title: 'Flat Hisab User Profile',
    collectionPath: '/users/{userId}',
    description: 'Stores individual roommate identity, UPI handle for QR code generation, and gamified Roommate Score.',
    fields: [
      { name: 'uid', type: 'string', required: true, note: 'Firebase Auth UID' },
      { name: 'displayName', type: 'string', required: true, note: 'Alias visible to flatmates' },
      { name: 'upiId', type: 'string', note: 'Personal UPI ID (e.g. aditya@okaxis) for instant settlements' },
      { name: 'roommateScore', type: 'number', note: 'Default 100/100 reliability & prompt settlement metric' },
      { name: 'currentGroupId', type: 'string', note: 'Active flat group pointer' }
    ],
    sampleJson: {
      uid: 'usr_aditya',
      email: 'adityaa89468@gmail.com',
      displayName: 'Aditya',
      upiId: 'aditya@okaxis',
      roommateScore: 100,
      currentGroupId: 'grp_flat302_99a',
      createdAt: '2026-09-01T10:00:00Z'
    }
  }
];

export const TESTIMONIALS = [
  {
    quote: "In our 4-BHK flat in HSR Layout, tracking maid salary, BESCOM bills, and daily Zepto orders on WhatsApp groups was a nightmare. Flat Hisab's 6-digit room code got all four of us synced in 30 seconds, and the debt simplifier cut our monthly transfers from 9 down to 3.",
    author: "Rohan & Flat 402 Crew",
    role: "Software Engineers & Flatmates",
    location: "Bengaluru, Karnataka",
    metric: "₹42,000+ monthly bills tracked with zero disputes"
  },
  {
    quote: "The instant in-app toast notification whenever someone logs a grocery or WiFi split keeps everything transparent. Plus, adding our UPI IDs directly inside the profile means nobody ever has to ask 'send your GPay number' at the end of the month.",
    author: "Priya Nair",
    role: "Product Designer",
    location: "Wakad, Pune",
    metric: "Under 10 seconds to split any household bill"
  },
  {
    quote: "Unlike bloated expense apps that force ads before you can even type an amount or lock equal splits behind a subscription, Flat Hisab is fast, works smoothly on Android and Web, and shows our exact net standing at a glance.",
    author: "Siddharth Mehta",
    role: "MBA Candidate & Hostel Coordinator",
    location: "Delhi NCR",
    metric: "100% transparent audit log for 6 roommates"
  }
];

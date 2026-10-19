export interface RoommateMember {
  uid: string;
  displayName: string;
  email: string;
  role: 'admin' | 'member';
  upiId: string;
  roommateScore: number;
  joinedAt: string;
}

export interface ExpenseSplit {
  uid: string;
  displayName: string;
  amount: number;
}

export interface FlatExpense {
  id: string;
  title: string;
  amount: number;
  payerId: string;
  payerName: string;
  category: 'Rent' | 'WiFi' | 'Groceries' | 'Electricity' | 'Maid & Cook' | 'Others';
  date: string;
  splitType: 'equal' | 'percentage' | 'selected';
  splits: ExpenseSplit[];
}

export interface FlatSettlement {
  id: string;
  fromId: string;
  fromName: string;
  toId: string;
  toName: string;
  amount: number;
  upiTxnId: string;
  createdAt: string;
  status: 'settled' | 'pending';
}

export interface SuggestedTransfer {
  fromId: string;
  fromName: string;
  toId: string;
  toName: string;
  amount: number;
}

export interface FlatNotification {
  id: string;
  text: string;
  type: 'expense' | 'settlement' | 'room';
  createdAt: string;
  read: boolean;
}

export interface SchemaEntitySpec {
  id: string;
  title: string;
  collectionPath: string;
  description: string;
  fields: { name: string; type: string; required?: boolean; note: string }[];
  sampleJson: Record<string, any>;
}

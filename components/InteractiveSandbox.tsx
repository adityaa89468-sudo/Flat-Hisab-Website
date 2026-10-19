import React, { useState, useEffect } from 'react';
import { 
  Coins, 
  Plus, 
  Users, 
  CheckCircle2, 
  Trash2, 
  Copy, 
  Check, 
  Share2, 
  Bell, 
  RefreshCw,
  UserPlus,
  Download
} from 'lucide-react';
import { RoommateMember, FlatExpense, FlatSettlement, SuggestedTransfer, FlatNotification } from '../types';
import { APP_META } from '../data/mockData';
import { copyTextToClipboard, exportFlatLedgerCsv } from '../utils/helpers';

export type SandboxTab = 'dashboard' | 'split' | 'settle' | 'history' | 'room';

interface InteractiveSandboxProps {
  activeTab: SandboxTab;
  setActiveTab: (tab: SandboxTab) => void;
  roommates: RoommateMember[];
  expenses: FlatExpense[];
  settlements: FlatSettlement[];
  notifications: FlatNotification[];
  memberBalances: Record<string, number>;
  suggestedSettlements: SuggestedTransfer[];
  onAddExpense: (expense: Omit<FlatExpense, 'id' | 'date'>) => void;
  onDeleteExpense: (id: string) => void;
  onSettleDebt: (transfer: SuggestedTransfer) => void;
  onAddRoommate: (name: string, upiId: string) => void;
  onResetSandbox: () => void;
}

export const InteractiveSandbox: React.FC<InteractiveSandboxProps> = ({
  activeTab,
  setActiveTab,
  roommates,
  expenses,
  settlements,
  notifications,
  memberBalances,
  suggestedSettlements,
  onAddExpense,
  onDeleteExpense,
  onSettleDebt,
  onAddRoommate,
  onResetSandbox
}) => {
  const currentUserUid = 'usr_aditya';

  // Split Bill Form State
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState<FlatExpense['category']>('Groceries');
  const [selectedPayer, setSelectedPayer] = useState(currentUserUid);
  const [selectedRoommates, setSelectedRoommates] = useState<string[]>(roommates.map(r => r.uid));
  const [formFeedback, setFormFeedback] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // Sync selected roommates when a new roommate joins
  useEffect(() => {
    setSelectedRoommates(roommates.map(r => r.uid));
  }, [roommates]);

  // Inline Delete Confirmation State
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Settle Up Confirmation Target
  const [settlementTarget, setSettlementTarget] = useState<SuggestedTransfer | null>(null);

  // Room & Invite States
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedRawCode, setCopiedRawCode] = useState(false);
  const [copiedUpiId, setCopiedUpiId] = useState<string | null>(null);
  const [newRoommateName, setNewRoommateName] = useState('');
  const [newRoommateUpi, setNewRoommateUpi] = useState('');

  // Toast alert for real-time simulation
  const [toastAlert, setToastAlert] = useState<string | null>(null);

  const myNetBalance = memberBalances[currentUserUid] || 0;

  const triggerToast = (msg: string) => {
    setToastAlert(msg);
    setTimeout(() => setToastAlert(null), 5000);
  };

  const handleCopyUpi = async (upi: string) => {
    await copyTextToClipboard(upi);
    setCopiedUpiId(upi);
    triggerToast(`Copied UPI ID: ${upi}`);
    setTimeout(() => setCopiedUpiId(null), 2000);
  };

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    setFormFeedback(null);

    const parsedAmount = parseFloat(expenseAmount);
    if (!expenseTitle.trim()) {
      setFormFeedback({ type: 'error', text: 'Please enter what the expense was for.' });
      return;
    }
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setFormFeedback({ type: 'error', text: 'Please enter a valid positive amount in ₹ INR.' });
      return;
    }
    if (selectedRoommates.length === 0) {
      setFormFeedback({ type: 'error', text: 'Please select at least 1 roommate to split with.' });
      return;
    }

    const shareAmount = parsedAmount / selectedRoommates.length;
    const splits = selectedRoommates.map(uid => {
      const member = roommates.find(r => r.uid === uid);
      return {
        uid,
        displayName: member?.displayName || 'Roommate',
        amount: shareAmount
      };
    });

    const payer = roommates.find(r => r.uid === selectedPayer);

    onAddExpense({
      title: expenseTitle.trim(),
      amount: parsedAmount,
      payerId: selectedPayer,
      payerName: payer?.displayName || 'Aditya',
      category: expenseCategory,
      splitType: 'equal',
      splits
    });

    const notifiedNames = splits
      .filter(s => s.uid !== selectedPayer)
      .map(s => `${s.displayName} (₹${Math.round(s.amount)})`)
      .join(', ');

    setExpenseTitle('');
    setExpenseAmount('');

    const msg = notifiedNames
      ? `Expense of ₹${Math.round(parsedAmount)} added! Real-time notifications sent to: ${notifiedNames}.`
      : `Expense of ₹${Math.round(parsedAmount)} logged in ${APP_META.defaultFlatName}.`;

    setFormFeedback({ type: 'success', text: msg });
    triggerToast(msg);
  };

  const handleConfirmSettle = () => {
    if (!settlementTarget) return;
    onSettleDebt(settlementTarget);
    triggerToast(
      `Settlement verified: ${settlementTarget.fromName} paid ${settlementTarget.toName} ₹${Math.round(settlementTarget.amount)} via UPI.`
    );
    setSettlementTarget(null);
  };

  const handleCopyInviteLink = async () => {
    const url = `${window.location.origin}/?join=${APP_META.defaultFlatCode}`;
    await copyTextToClipboard(url);
    setCopiedLink(true);
    triggerToast(`Copied invite link: ${url}`);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCodeOnly = async () => {
    await copyTextToClipboard(APP_META.defaultFlatCode);
    setCopiedRawCode(true);
    triggerToast(`Copied 6-digit Flat Code: ${APP_META.defaultFlatCode}`);
    setTimeout(() => setCopiedRawCode(false), 2000);
  };

  const handleAddMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoommateName.trim()) return;
    onAddRoommate(
      newRoommateName.trim(),
      newRoommateUpi.trim() || `${newRoommateName.toLowerCase().replace(/\s+/g, '')}@okaxis`
    );
    triggerToast(`${newRoommateName.trim()} joined ${APP_META.defaultFlatName} via code ${APP_META.defaultFlatCode}!`);
    setNewRoommateName('');
    setNewRoommateUpi('');
  };

  const handleDownloadCsv = () => {
    exportFlatLedgerCsv(APP_META.defaultFlatName, expenses, settlements);
    triggerToast(`Downloaded ${APP_META.defaultFlatName} CSV ledger.`);
  };

  return (
    <section id="sandbox" className="py-24 bg-slate-900/50 border-y border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              Interactive App Experience
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              Test the live Flat Hisab ledger right in your browser.
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Interact with the actual application screens from <strong className="text-white">Flat Hisab v{APP_META.version}</strong>. Split a new bill, inspect simplified roommate balances, or trigger a UPI debt settlement below.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto shrink-0">
            <button
              onClick={handleDownloadCsv}
              className="px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Download size={14} className="text-emerald-400" />
              <span>Export CSV Ledger</span>
            </button>

            <button
              onClick={() => {
                onResetSandbox();
                triggerToast('Demo ledger reset to initial Flat 302 state.');
              }}
              className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
            >
              <RefreshCw size={14} />
              <span>Reset Demo Ledger</span>
            </button>
          </div>
        </div>

        {/* Real-Time In-App Toast Banner */}
        {toastAlert && (
          <div className="mb-6 p-4 rounded-2xl bg-slate-950 border border-indigo-500/50 shadow-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0">
                <Bell size={16} />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                  Live Flat Notification Broadcast
                </div>
                <div className="text-xs text-slate-200 font-medium">{toastAlert}</div>
              </div>
            </div>
            <button
              onClick={() => setToastAlert(null)}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Simulated App Frame Container */}
        <div className="rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden">
          
          {/* App Top Header Bar */}
          <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0B4B3D] border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-extrabold text-xs">
                FH
              </div>
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Active Flat Group
                </span>
                <h3 className="text-sm font-bold text-white leading-tight">
                  {APP_META.defaultFlatName}
                </h3>
              </div>
            </div>

            {/* Interactive Segmented App Navigation Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
              {[
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'split', label: '+ Split Bill' },
                { id: 'settle', label: `Settle Debts (${suggestedSettlements.length})` },
                { id: 'history', label: `History (${expenses.length})` },
                { id: 'room', label: `Roommates (${roommates.length})` }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as SandboxTab)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    activeTab === t.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* App Workspace Body */}
          <div className="p-6 lg:p-8">
            
            {/* TAB 1: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                
                {/* Net Balance Summary Card */}
                <div className="p-6 lg:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-slate-400">
                      Your General Debt Standing (Viewing as Aditya)
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className={`text-4xl font-extrabold font-mono tabular-nums ${
                        myNetBalance > 1
                          ? 'text-emerald-400'
                          : myNetBalance < -1
                          ? 'text-rose-400'
                          : 'text-white'
                      }`}>
                        ₹{Math.abs(Math.round(myNetBalance)).toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        {myNetBalance > 1
                          ? 'Owed to you overall'
                          : myNetBalance < -1
                          ? 'You owe overall'
                          : 'All flatmate balances settled'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 max-w-xl">
                      {myNetBalance > 1
                        ? 'Roommates have active splits to return to you. Open Settle Debts to view optimized UPI transfers.'
                        : 'Awesome! All flatmate accounts are synced and balanced.'}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <button
                      onClick={() => setActiveTab('split')}
                      className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <Plus size={15} />
                      <span>Split New Bill</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('settle')}
                      className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <Coins size={15} className="text-emerald-400" />
                      <span>Settle Up</span>
                    </button>
                  </div>
                </div>

                {/* 2-Column Dashboard Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left: Roommate Debt Split Network */}
                  <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-indigo-400" />
                        <h4 className="text-sm font-bold text-white">Roommate Debt Split Network</h4>
                      </div>
                      <span className="text-xs text-slate-400">Click any UPI ID to copy</span>
                    </div>

                    <div className="space-y-3">
                      {roommates
                        .filter(m => m.uid !== currentUserUid)
                        .map((member) => {
                          const owesMe = suggestedSettlements.find(
                            s => s.fromId === member.uid && s.toId === currentUserUid
                          );
                          const iOwe = suggestedSettlements.find(
                            s => s.fromId === currentUserUid && s.toId === member.uid
                          );

                          return (
                            <div
                              key={member.uid}
                              className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800/80"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-200">
                                  {member.displayName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className="text-xs font-bold text-white">{member.displayName}</div>
                                  <button
                                    onClick={() => handleCopyUpi(member.upiId)}
                                    className="text-[11px] text-slate-400 hover:text-indigo-400 font-mono flex items-center gap-1 cursor-pointer transition-colors"
                                  >
                                    <span>UPI: {member.upiId}</span>
                                    {copiedUpiId === member.upiId ? (
                                      <Check size={11} className="text-emerald-400" />
                                    ) : (
                                      <Copy size={11} />
                                    )}
                                  </button>
                                </div>
                              </div>

                              <div className="text-right">
                                {owesMe ? (
                                  <div>
                                    <span className="block text-xs font-bold text-emerald-400 font-mono tabular-nums">
                                      owes you ₹{Math.round(owesMe.amount).toLocaleString('en-IN')}
                                    </span>
                                    <button
                                      onClick={() => setActiveTab('settle')}
                                      className="text-[11px] text-indigo-400 hover:underline cursor-pointer"
                                    >
                                      Settle now →
                                    </button>
                                  </div>
                                ) : iOwe ? (
                                  <div>
                                    <span className="block text-xs font-bold text-rose-400 font-mono tabular-nums">
                                      you owe ₹{Math.round(iOwe.amount).toLocaleString('en-IN')}
                                    </span>
                                    <button
                                      onClick={() => setActiveTab('settle')}
                                      className="text-[11px] text-indigo-400 hover:underline cursor-pointer"
                                    >
                                      Pay via UPI →
                                    </button>
                                  </div>
                                ) : (
                                  <span className="text-xs font-medium text-slate-400">Settled state</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {/* Right: Flat Group Stats & Recent Notifications */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
                      <h4 className="text-sm font-bold text-white pb-2 border-b border-slate-800">
                        Group Statistics
                      </h4>

                      <div className="space-y-3 text-xs">
                        <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                          <span className="text-slate-400">Flat Invite Code</span>
                          <button
                            onClick={handleCopyCodeOnly}
                            className="font-mono font-bold text-indigo-400 hover:text-indigo-300 tabular-nums flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>{APP_META.defaultFlatCode}</span>
                            {copiedRawCode ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                          </button>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                          <span className="text-slate-400">Total Expenses Logged</span>
                          <span className="font-mono font-bold text-white tabular-nums">
                            {expenses.length} entries
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                          <span className="text-slate-400">Verified Settlements</span>
                          <span className="font-mono font-bold text-emerald-400 tabular-nums">
                            {settlements.length} completed
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-1">
                          <span className="text-slate-400">Your Flatmate Score</span>
                          <span className="font-mono font-bold text-emerald-400 tabular-nums">
                            100 / 100
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity Feed */}
                    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-3">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                        Recent Split Alerts
                      </h4>
                      <div className="space-y-2.5 max-h-40 overflow-y-auto pr-1">
                        {notifications.slice(0, 4).map((n) => (
                          <div key={n.id} className="text-xs text-slate-300 py-1.5 border-b border-slate-800/60 last:border-none">
                            <p className="leading-snug">{n.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 2: + SPLIT BILL */}
            {activeTab === 'split' && (
              <div className="max-w-2xl mx-auto bg-slate-900/70 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-white">Split New Roommate Expense</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Add a bill to calculate equal per-roommate shares and broadcast real-time split notifications.
                  </p>
                </div>

                {formFeedback && (
                  <div className={`p-3.5 rounded-xl text-xs font-medium border flex items-center justify-between gap-3 ${
                    formFeedback.type === 'success'
                      ? 'bg-emerald-950/50 border-emerald-700/50 text-emerald-300'
                      : 'bg-rose-950/50 border-rose-700/50 text-rose-300'
                  }`}>
                    <span>{formFeedback.text}</span>
                    {formFeedback.type === 'success' && (
                      <button
                        onClick={() => setActiveTab('dashboard')}
                        className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-[11px] font-semibold whitespace-nowrap cursor-pointer"
                      >
                        View Dashboard
                      </button>
                    )}
                  </div>
                )}

                <form onSubmit={handleCreateExpense} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Expense For (Title)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Swiggy Instamart / Gas Cylinder"
                        value={expenseTitle}
                        onChange={(e) => setExpenseTitle(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Amount (₹ INR)
                      </label>
                      <input
                        type="number"
                        step="1"
                        required
                        placeholder="e.g. 1200"
                        value={expenseAmount}
                        onChange={(e) => setExpenseAmount(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Paid By
                      </label>
                      <select
                        value={selectedPayer}
                        onChange={(e) => setSelectedPayer(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                      >
                        {roommates.map((r) => (
                          <option key={r.uid} value={r.uid}>
                            {r.uid === currentUserUid ? `You (${r.displayName})` : r.displayName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Bill Category
                      </label>
                      <select
                        value={expenseCategory}
                        onChange={(e) => setExpenseCategory(e.target.value as any)}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option value="Groceries">Groceries</option>
                        <option value="WiFi">WiFi</option>
                        <option value="Electricity">Electricity</option>
                        <option value="Maid & Cook">Maid &amp; Cook</option>
                        <option value="Rent">Rent</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">
                      Check Roommates Included in Split
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {roommates.map((member) => {
                        const checked = selectedRoommates.includes(member.uid);
                        return (
                          <label
                            key={member.uid}
                            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                              checked
                                ? 'bg-indigo-950/30 border-indigo-500/50 text-white'
                                : 'bg-slate-950 border-slate-800 text-slate-400'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedRoommates(prev => [...prev, member.uid]);
                                } else {
                                  setSelectedRoommates(prev => prev.filter(id => id !== member.uid));
                                }
                              }}
                              className="w-4 h-4 accent-indigo-600 rounded"
                            />
                            <span className="text-xs font-semibold">{member.displayName}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Live Auto Equal Split Preview */}
                  {selectedRoommates.length > 0 && expenseAmount && parseFloat(expenseAmount) > 0 && (
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
                      <span className="text-[11px] text-slate-400 block">
                        Auto Equal Split Calculator
                      </span>
                      <p className="text-xs text-slate-200 font-medium">
                        ₹{parseFloat(expenseAmount).toLocaleString('en-IN')} ÷ {selectedRoommates.length} roommate{selectedRoommates.length > 1 ? 's' : ''} ={' '}
                        <strong className="text-emerald-400 font-mono tabular-nums text-sm">
                          ₹{(parseFloat(expenseAmount) / selectedRoommates.length).toFixed(2)} each
                        </strong>
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
                  >
                    Authorize Split Bill
                  </button>
                </form>
              </div>
            )}

            {/* TAB 3: SETTLE DEBTS */}
            {activeTab === 'settle' && (
              <div className="space-y-6">
                <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
                  <div>
                    <h4 className="text-base font-bold text-white">Algorithmic Debt Simplification</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Flat Hisab collapses circular roommate debts into the minimum number of direct transfers needed to settle the entire flat.
                    </p>
                  </div>

                  {suggestedSettlements.length === 0 ? (
                    <div className="py-10 text-center space-y-2 border border-dashed border-slate-800 rounded-2xl">
                      <CheckCircle2 size={32} className="text-emerald-400 mx-auto" />
                      <div className="text-sm font-bold text-white">All Roommate Accounts Are Settled!</div>
                      <p className="text-xs text-slate-400">Zero outstanding dues in {APP_META.defaultFlatName}.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {suggestedSettlements.map((item, idx) => {
                        const creditor = roommates.find(r => r.uid === item.toId);
                        return (
                          <div
                            key={idx}
                            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-bold text-indigo-400">
                                {item.fromName.charAt(0)}
                              </div>
                              <div>
                                <p className="text-xs font-bold text-white">
                                  <span className="text-indigo-400">{item.fromName}</span> owes{' '}
                                  <span className="text-emerald-400">{item.toName}</span>
                                </p>
                                {creditor && (
                                  <button
                                    onClick={() => handleCopyUpi(creditor.upiId)}
                                    className="text-[11px] text-slate-400 hover:text-indigo-400 font-mono flex items-center gap-1 cursor-pointer"
                                  >
                                    <span>Pay to UPI: {creditor.upiId}</span>
                                    <Copy size={11} />
                                  </button>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                              <span className="text-lg font-extrabold text-white font-mono tabular-nums">
                                ₹{Math.round(item.amount).toLocaleString('en-IN')}
                              </span>
                              <button
                                onClick={() => setSettlementTarget(item)}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer"
                              >
                                Record UPI Settlement
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Verified Settlements Audit Log */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
                  <h4 className="text-sm font-bold text-white pb-2 border-b border-slate-800">
                    Verified UPI Settlements Feed ({settlements.length})
                  </h4>
                  <div className="space-y-2.5">
                    {settlements.map((s) => (
                      <div key={s.id} className="flex items-center justify-between py-2 border-b border-slate-800/60 last:border-none text-xs">
                        <div>
                          <p className="font-semibold text-slate-200">
                            {s.fromName} paid {s.toName}
                          </p>
                          <span className="text-[11px] font-mono text-slate-500">
                            TXN: {s.upiTxnId} · {new Date(s.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-emerald-400 tabular-nums">
                          ₹{Math.round(s.amount).toLocaleString('en-IN')} Settled
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: HISTORY LOGS */}
            {activeTab === 'history' && (
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <h4 className="text-base font-bold text-white">Roommate Expense History</h4>
                    <p className="text-xs text-slate-400">
                      Complete chronological audit log of household splits
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400 tabular-nums">
                      {expenses.length} Split Entries
                    </span>
                    <button
                      onClick={handleDownloadCsv}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download size={13} />
                      <span>Download CSV</span>
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-slate-800/80">
                  {expenses.length === 0 ? (
                    <div className="py-10 text-center text-xs text-slate-500">
                      No expenses logged. Add one in the + Split Bill tab!
                    </div>
                  ) : (
                    expenses.map((exp) => (
                      <div key={exp.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-slate-400">
                            <span className="font-semibold text-indigo-400">{exp.category}</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono">{exp.date}</span>
                          </div>
                          <h5 className="text-sm font-bold text-white">{exp.title}</h5>
                          <p className="text-slate-400">
                            Paid by <strong className="text-slate-200">{exp.payerName}</strong> · Split with:{' '}
                            {exp.splits.map(s => s.displayName).join(', ')}
                          </p>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                          <span className="text-base font-extrabold text-white font-mono tabular-nums">
                            ₹{Math.round(exp.amount).toLocaleString('en-IN')}
                          </span>

                          {confirmDeleteId === exp.id ? (
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => {
                                  onDeleteExpense(exp.id);
                                  setConfirmDeleteId(null);
                                  triggerToast(`Deleted expense "${exp.title}" and recalculated flat balances.`);
                                }}
                                className="px-2.5 py-1 bg-rose-600 text-white rounded-lg text-[11px] font-semibold cursor-pointer"
                              >
                                Confirm Delete
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(null)}
                                className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg text-[11px] cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDeleteId(exp.id)}
                              className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 size={12} />
                              <span>Correction</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 5: ROOMMATES & INVITE CODE */}
            {activeTab === 'room' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left: Flat Access Code & Invite Link */}
                <div className="lg:col-span-6 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-5">
                  <div>
                    <h4 className="text-base font-bold text-white">Room Invites &amp; 6-Digit Access Code</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Share your 6-digit code or URL invitation link (`?join={APP_META.defaultFlatCode}`) to onboard flatmates immediately.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                      Flatmate Room Access Code
                    </span>
                    <div className="text-3xl font-extrabold font-mono tracking-widest text-indigo-400 tabular-nums">
                      {APP_META.defaultFlatCode}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={handleCopyInviteLink}
                      className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      {copiedLink ? (
                        <>
                          <Check size={15} />
                          <span>Invitation Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <Share2 size={15} />
                          <span>Copy Invitation Link</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleCopyCodeOnly}
                      className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedRawCode ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      <span>{copiedRawCode ? 'Copied' : 'Copy Code'}</span>
                    </button>
                  </div>

                  {/* Add a Simulated Roommate */}
                  <form onSubmit={handleAddMemberSubmit} className="pt-4 border-t border-slate-800 space-y-3">
                    <h5 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <UserPlus size={14} className="text-emerald-400" />
                      <span>Simulate Another Flatmate Joining</span>
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input
                        type="text"
                        required
                        placeholder="Flatmate Name (e.g. Neha)"
                        value={newRoommateName}
                        onChange={(e) => setNewRoommateName(e.target.value)}
                        className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="UPI ID (e.g. neha@ybl)"
                        value={newRoommateUpi}
                        onChange={(e) => setNewRoommateUpi(e.target.value)}
                        className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Join {APP_META.defaultFlatName}
                    </button>
                  </form>
                </div>

                {/* Right: Connected Flatmates Roster */}
                <div className="lg:col-span-6 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
                  <h4 className="text-base font-bold text-white pb-2 border-b border-slate-800">
                    Connected Flatmates ({roommates.length})
                  </h4>

                  <div className="space-y-3">
                    {roommates.map((member) => (
                      <div key={member.uid} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-indigo-950/80 border border-indigo-700/40 text-indigo-300 font-bold flex items-center justify-center">
                            {member.displayName.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-white">
                              {member.displayName} {member.uid === currentUserUid && '(You)'}
                            </div>
                            <button
                              onClick={() => handleCopyUpi(member.upiId)}
                              className="text-[11px] text-slate-400 hover:text-indigo-400 font-mono flex items-center gap-1 cursor-pointer"
                            >
                              <span>UPI: {member.upiId} · Score: {member.roommateScore}/100</span>
                              <Copy size={10} />
                            </button>
                          </div>
                        </div>

                        <span className="text-[11px] font-mono text-slate-400">
                          {member.role === 'admin' ? 'Flat Admin' : 'Flatmate'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* Settlement Verification Modal */}
      {settlementTarget && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-5 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
              <Coins size={24} />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                Verify UPI / Cash Settlement
              </span>
              <div className="text-3xl font-extrabold text-white font-mono tabular-nums mt-1">
                ₹{Math.round(settlementTarget.amount).toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Record payment from <strong className="text-white">{settlementTarget.fromName}</strong> to{' '}
                <strong className="text-emerald-400">{settlementTarget.toName}</strong> and update all roommate balances immediately?
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleConfirmSettle}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Yes, Mark Settled
              </button>
              <button
                onClick={() => setSettlementTarget(null)}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

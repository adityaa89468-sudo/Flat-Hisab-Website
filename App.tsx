import React, { useState, useMemo, useEffect } from 'react';
import { RoommateMember, FlatExpense, FlatSettlement, SuggestedTransfer, FlatNotification } from './types';
import { INITIAL_ROOMMATES, INITIAL_EXPENSES, INITIAL_SETTLEMENTS, INITIAL_NOTIFICATIONS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveSandbox, SandboxTab } from './components/InteractiveSandbox';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { GetAppModal } from './components/GetAppModal';
import { LegalModal } from './components/LegalModal';
import { Footer } from './components/Footer';
import { scrollToSection } from './utils/helpers';

export const App: React.FC = () => {
  const [sandboxTab, setSandboxTab] = useState<SandboxTab>('dashboard');
  const [legalDoc, setLegalDoc] = useState<'privacy' | 'terms' | null>(null);

  const [roommates, setRoommates] = useState<RoommateMember[]>(() => {
    try {
      const saved = localStorage.getItem('flathisab_roommates');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_ROOMMATES;
  });

  const [expenses, setExpenses] = useState<FlatExpense[]>(() => {
    try {
      const saved = localStorage.getItem('flathisab_expenses');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_EXPENSES;
  });

  const [settlements, setSettlements] = useState<FlatSettlement[]>(() => {
    try {
      const saved = localStorage.getItem('flathisab_settlements');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_SETTLEMENTS;
  });

  const [notifications, setNotifications] = useState<FlatNotification[]>(() => {
    try {
      const saved = localStorage.getItem('flathisab_notifications');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_NOTIFICATIONS;
  });

  const [isGetAppModalOpen, setIsGetAppModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('flathisab_roommates', JSON.stringify(roommates));
  }, [roommates]);

  useEffect(() => {
    localStorage.setItem('flathisab_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('flathisab_settlements', JSON.stringify(settlements));
  }, [settlements]);

  useEffect(() => {
    localStorage.setItem('flathisab_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Real-time Net Balance & Debt Simplification Engine
  const { memberBalances, suggestedSettlements } = useMemo(() => {
    const balances: Record<string, number> = {};
    roommates.forEach((m) => {
      balances[m.uid] = 0;
    });

    // 1. Apply all expenses
    expenses.forEach((exp) => {
      balances[exp.payerId] = (balances[exp.payerId] || 0) + exp.amount;
      exp.splits.forEach((split) => {
        balances[split.uid] = (balances[split.uid] || 0) - split.amount;
      });
    });

    // 2. Apply all completed settlements
    settlements.forEach((set) => {
      if (set.status === 'settled') {
        balances[set.fromId] = (balances[set.fromId] || 0) + set.amount;
        balances[set.toId] = (balances[set.toId] || 0) - set.amount;
      }
    });

    // 3. Simplify Balances
    const debtors: { uid: string; name: string; amount: number }[] = [];
    const creditors: { uid: string; name: string; amount: number }[] = [];

    Object.entries(balances).forEach(([uid, net]) => {
      const member = roommates.find((r) => r.uid === uid);
      const name = member?.displayName || 'Roommate';
      if (net < -1) {
        debtors.push({ uid, name, amount: Math.abs(net) });
      } else if (net > 1) {
        creditors.push({ uid, name, amount: net });
      }
    });

    debtors.sort((a, b) => b.amount - a.amount);
    creditors.sort((a, b) => b.amount - a.amount);

    const transfers: SuggestedTransfer[] = [];
    let i = 0;
    let j = 0;

    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];
      const settledAmount = Math.min(debtor.amount, creditor.amount);

      if (settledAmount > 1) {
        transfers.push({
          fromId: debtor.uid,
          fromName: debtor.name,
          toId: creditor.uid,
          toName: creditor.name,
          amount: settledAmount
        });
      }

      debtor.amount -= settledAmount;
      creditor.amount -= settledAmount;

      if (debtor.amount < 1) i++;
      if (creditor.amount < 1) j++;
    }

    return { memberBalances: balances, suggestedSettlements: transfers };
  }, [roommates, expenses, settlements]);

  const handleAddExpense = (newExp: Omit<FlatExpense, 'id' | 'date'>) => {
    const created: FlatExpense = {
      ...newExp,
      id: `exp_${Date.now()}`,
      date: new Date().toISOString().slice(0, 10)
    };
    setExpenses((prev) => [created, ...prev]);

    const perPerson = Math.round(created.amount / created.splits.length);
    const notif: FlatNotification = {
      id: `notif_${Date.now()}`,
      text: `${created.payerName} added ₹${Math.round(created.amount)} for ${created.title} (Split: ₹${perPerson} each)`,
      type: 'expense',
      createdAt: new Date().toISOString(),
      read: false
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const handleSettleDebt = (transfer: SuggestedTransfer) => {
    const newSet: FlatSettlement = {
      id: `set_${Date.now()}`,
      fromId: transfer.fromId,
      fromName: transfer.fromName,
      toId: transfer.toId,
      toName: transfer.toName,
      amount: transfer.amount,
      upiTxnId: `UPI${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      createdAt: new Date().toISOString(),
      status: 'settled'
    };
    setSettlements((prev) => [newSet, ...prev]);

    const notif: FlatNotification = {
      id: `notif_${Date.now()}`,
      text: `${transfer.fromName} settled ₹${Math.round(transfer.amount)} with ${transfer.toName} via UPI`,
      type: 'settlement',
      createdAt: new Date().toISOString(),
      read: false
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const handleAddRoommate = (name: string, upiId: string) => {
    const newMember: RoommateMember = {
      uid: `usr_${Date.now()}`,
      displayName: name,
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      role: 'member',
      upiId,
      roommateScore: 100,
      joinedAt: new Date().toISOString()
    };
    setRoommates((prev) => [...prev, newMember]);
  };

  const handleResetSandbox = () => {
    setRoommates(INITIAL_ROOMMATES);
    setExpenses(INITIAL_EXPENSES);
    setSettlements(INITIAL_SETTLEMENTS);
    setNotifications(INITIAL_NOTIFICATIONS);
  };

  const scrollToSandbox = (tab?: SandboxTab) => {
    if (tab) {
      setSandboxTab(tab);
    }
    scrollToSection('sandbox');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      
      {/* Top Bar (Strict 3-Zone Contract) */}
      <Navbar onOpenGetAppModal={() => setIsGetAppModalOpen(true)} />

      <main className="flex-1">
        {/* Hero Proposition & Live Preview */}
        <Hero
          onScrollToSandbox={scrollToSandbox}
          onOpenGetAppModal={() => setIsGetAppModalOpen(true)}
          netBalance={memberBalances['usr_aditya'] || 0}
          totalExpensesCount={expenses.length}
        />

        {/* Interactive Live Flat Hisab Sandbox */}
        <InteractiveSandbox
          activeTab={sandboxTab}
          setActiveTab={setSandboxTab}
          roommates={roommates}
          expenses={expenses}
          settlements={settlements}
          notifications={notifications}
          memberBalances={memberBalances}
          suggestedSettlements={suggestedSettlements}
          onAddExpense={handleAddExpense}
          onDeleteExpense={handleDeleteExpense}
          onSettleDebt={handleSettleDebt}
          onAddRoommate={handleAddRoommate}
          onResetSandbox={handleResetSandbox}
        />

        {/* 4-Step Workflow & Debt Simplification Engine */}
        <HowItWorks />

        {/* Flatmate Stories & Outcomes */}
        <Testimonials />
      </main>

      {/* Get App Modal */}
      <GetAppModal
        isOpen={isGetAppModalOpen}
        onClose={() => setIsGetAppModalOpen(false)}
        onJumpToSandbox={() => scrollToSandbox('dashboard')}
      />

      {/* Privacy Policy & Terms Modal */}
      <LegalModal
        activeDoc={legalDoc}
        onClose={() => setLegalDoc(null)}
        onSwitchDoc={(doc) => setLegalDoc(doc)}
      />

      {/* Quiet Footer */}
      <Footer
        onOpenGetAppModal={() => setIsGetAppModalOpen(true)}
        onOpenLegalModal={(doc) => setLegalDoc(doc)}
      />

    </div>
  );
};

export default App;

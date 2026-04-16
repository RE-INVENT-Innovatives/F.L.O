'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, CreditCard, Sparkles, ShieldCheck, Zap, ArrowRight, History } from 'lucide-react';
import { cn } from '@/lib/utils';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    description: 'Perfect for getting started and sharing your basic portfolio.',
    features: [
      '3 Templates',
      'Basic SEO',
      'F.L.O Subdomain',
      'Community Support'
    ],
    buttonText: 'Current Plan',
    current: true,
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$12',
    period: '/mo',
    description: 'For professionals who want to stand out with advanced tools.',
    features: [
      'All Templates',
      'AI-Powered SEO Analysis',
      'Custom Domain Support',
      'Priority Support',
      'Advanced Blog Features'
    ],
    buttonText: 'Upgrade to Pro',
    current: false,
    popular: true,
  },
  {
    id: 'ultimate',
    name: 'Ultimate',
    price: '$29',
    period: '/mo',
    description: 'The ultimate suite for developers and power users.',
    features: [
      'Everything in Pro',
      'White-labeled Portfolios',
      'Unlimited Assets Storage',
      'Early Access to Features',
      'Dedicated Account Manager'
    ],
    buttonText: 'Get Ultimate',
    current: false,
    popular: false,
  }
];

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="min-h-screen pt-24 pb-32 px-6 origin-top" style={{ zoom: 0.75 }}>

      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Billing & Plans
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Choose the perfect plan <br/> 
            <span className="text-zinc-500 font-medium text-3xl">for your professional journey.</span>
          </motion.h1>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center">
          <div className="p-1 bg-zinc-900/50 border border-white/5 rounded-2xl flex relative overflow-hidden">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                "px-6 py-2 text-sm font-bold relative z-10 transition-colors",
                billingCycle === 'monthly' ? "text-white" : "text-zinc-500"
              )}
            >
              {billingCycle === 'monthly' && (
                <motion.div layoutId="cycle" className="absolute inset-0 bg-white/5 rounded-xl border border-white/10" />
              )}
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={cn(
                "px-6 py-2 text-sm font-bold relative z-10 transition-colors flex items-center gap-2",
                billingCycle === 'yearly' ? "text-white" : "text-zinc-500"
              )}
            >
              {billingCycle === 'yearly' && (
                <motion.div layoutId="cycle" className="absolute inset-0 bg-white/5 rounded-xl border border-white/10" />
              )}
              Yearly
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full uppercase tracking-tighter">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className={cn(
                "relative group p-8 rounded-[32px] border transition-all duration-500",
                plan.popular 
                  ? "bg-gradient-to-b from-white/[0.08] to-transparent border-white/20 shadow-2xl shadow-white/5" 
                  : "bg-zinc-900/20 border-white/5 hover:border-white/10"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-zinc-950 text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-xl">
                  Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-zinc-500 text-sm">{plan.period}</span>
                  </div>
                  <p className="mt-4 text-sm text-zinc-500 leading-relaxed min-h-[40px]">
                    {plan.description}
                  </p>
                </div>

                <div className="h-px bg-white/5" />

                <ul className="space-y-4">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 group/item">
                      <div className="mt-1 w-4 h-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover/item:border-white/20 transition-colors">
                        <Check className="w-2.5 h-2.5 text-zinc-400" />
                      </div>
                      <span className="text-sm text-zinc-400 group-hover/item:text-zinc-200 transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  disabled={plan.current}
                  className={cn(
                    "w-full py-4 rounded-2xl text-sm font-black transition-all active:scale-[0.98]",
                    plan.current
                      ? "bg-white/5 text-zinc-500 cursor-default border border-white/10"
                      : "bg-white text-zinc-950 hover:bg-zinc-200 shadow-xl shadow-white/5"
                  )}
                >
                  {plan.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary Section - Billing History */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-12 space-y-6"
        >
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <History className="w-5 h-5 text-zinc-500" />
              Recent Billings
            </h2>
            <button className="text-xs text-zinc-500 hover:text-white transition-colors underline underline-offset-4 decoration-zinc-800">View All History</button>
          </div>

          <div className="bg-zinc-900/10 border border-white/5 rounded-[32px] overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-8 py-5 text-xs font-bold text-zinc-500 uppercase tracking-widest">Date</th>
                  <th className="px-8 py-5 text-xs font-bold text-zinc-500 uppercase tracking-widest">Plan</th>
                  <th className="px-8 py-5 text-xs font-bold text-zinc-500 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-xs font-bold text-zinc-500 uppercase tracking-widest text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { date: 'Oct 12, 2024', plan: 'Pro Monthly', status: 'Paid', amount: '$12.00' },
                  { date: 'Sep 12, 2024', plan: 'Pro Monthly', status: 'Paid', amount: '$12.00' },
                ].map((row, i) => (
                  <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-5 text-sm text-zinc-400">{row.date}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-500" />
                        <span className="text-sm text-white font-medium">{row.plan}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase">
                        {row.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm text-white font-bold text-right tracking-tight">{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

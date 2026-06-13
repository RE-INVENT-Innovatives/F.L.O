'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';

interface SuccessModalProps {
  source: 'github' | 'resume';
  counts: { edu: number; exp: number };
  onClose: () => void;
}

export function SuccessModal({
  source,
  counts,
  onClose,
}: SuccessModalProps) {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 12, filter: 'blur(8px)' }}
        animate={{ scale: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ scale: 0.95, y: 12, filter: 'blur(8px)' }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xs bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8 flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 14, delay: 0.1 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mb-5 shadow-lg shadow-indigo-500/20"
          >
            <CheckCircle2 className="w-8 h-8 text-white" />
          </motion.div>

          <h3 className="text-[18px] font-semibold text-white mb-1">
            {source === 'github' ? 'GitHub synced' : 'Resume imported'}
          </h3>
          <p className="text-[13px] text-zinc-500 mb-6 font-medium">Your profile has been updated.</p>

          <div className="w-full bg-zinc-900/60 border border-white/5 rounded-2xl p-4 space-y-2 mb-6">
            {[
              { label: 'Education entries added', value: counts.edu },
              { label: 'Experience entries added', value: counts.exp },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between text-[13px]">
                <span className="text-zinc-500">{row.label}</span>
                <span className="font-semibold text-white tabular-nums">{row.value}</span>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-white text-zinc-950 rounded-xl text-[14px] font-semibold hover:bg-zinc-100 transition-colors"
          >
            Done
          </button>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

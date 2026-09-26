'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { MentorProfile } from '../types';

interface BookSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: MentorProfile;
}

export function BookSessionModal({
  isOpen,
  onClose,
  mentor,
}: BookSessionModalProps) {
  const [selectedSlot, setSelectedSlot] = useState(mentor.availableSlots[0] || 'Mon 4:00 PM');
  const [topic, setTopic] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl p-6 max-w-md w-full border border-[#E8E5DD] shadow-2xl relative space-y-4 font-sans text-[#1B1B1B]"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-[#FAF8F5] hover:bg-[#E8E5DD] text-[#787774] hover:text-[#1B1B1B]"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="border-b border-[#F0ECE1] pb-3">
            <h3 className="text-base font-bold text-[#1B1B1B]">Book Mentorship Session</h3>
            <p className="text-xs text-[#575653]">Mentor: {mentor.name} ({mentor.companyOrDept})</p>
          </div>

          {isBooked ? (
            <div className="p-6 text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
              <h4 className="text-base font-bold text-emerald-900">Session Confirmed!</h4>
              <p className="text-xs text-[#575653]">
                Calendar invitation sent for {selectedSlot}. Check your notification inbox.
              </p>
            </div>
          ) : (
            <form onSubmit={handleBook} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#1B1B1B] block mb-1">Select Available Time Slot:</label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#DCD6C9] focus:outline-none focus:border-[#C76A2A]"
                >
                  {mentor.availableSlots.map((slot, i) => (
                    <option key={i} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-[#1B1B1B] block mb-1">Session Agenda / Target Question:</label>
                <textarea
                  required
                  rows={3}
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Code review for Spring Boot REST Order Service architecture..."
                  className="w-full p-2.5 rounded-xl border border-[#DCD6C9] focus:outline-none focus:border-[#C76A2A]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#F0ECE1]">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2 px-3 rounded-xl border border-[#E8E5DD] font-semibold text-[#575653]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 rounded-xl bg-[#C76A2A] text-white font-bold"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

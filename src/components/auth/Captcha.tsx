'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, ShieldCheck } from 'lucide-react';

interface CaptchaProps {
  onVerify: (userAnswer: string, expectedAnswer: string) => void;
}

export function Captcha({ onVerify }: CaptchaProps) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [inputVal, setInputVal] = useState('');

  const generateChallenge = () => {
    const n1 = Math.floor(Math.random() * 9) + 1;
    const n2 = Math.floor(Math.random() * 9) + 1;
    setNum1(n1);
    setNum2(n2);
    setInputVal('');
    const expected = (n1 + n2).toString();
    onVerify('', expected);
  };

  useEffect(() => {
    generateChallenge();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputVal(val);
    const expected = (num1 + num2).toString();
    onVerify(val, expected);
  };

  return (
    <div className="p-3 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl flex items-center justify-between gap-3 select-none">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#C76A2A]" />
        <span className="text-xs font-mono font-bold text-[#1B1B1B]">
          Security Check: {num1} + {num2} =
        </span>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          maxLength={3}
          value={inputVal}
          onChange={handleChange}
          placeholder="?"
          className="w-12 h-8 text-center font-mono font-bold text-xs bg-white border border-[#E8E5DD] rounded-lg focus:outline-none focus:border-[#C76A2A] text-[#1B1B1B]"
        />
        <button
          type="button"
          onClick={generateChallenge}
          className="p-1.5 text-[#6F6A60] hover:text-[#1B1B1B] hover:bg-white rounded-lg transition-colors"
          title="Refresh challenge"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

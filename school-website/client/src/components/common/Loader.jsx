import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function Loader() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      background: 'var(--cream)',
    }}>
      <div style={{
        width: '60px', height: '60px',
        background: 'var(--navy)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--gold)',
        animation: 'pulse 1.5s ease-in-out infinite',
      }}>
        <GraduationCap size={32} />
      </div>
      <div className="spinner" />
    </div>
  );
}

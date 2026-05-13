'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Video, X, Bell } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function MeetNotifier() {
  const [showWarning, setShowWarning] = useState(false);
  const [showLive, setShowLive] = useState(false);
  const [dismissedLive, setDismissedLive] = useState(false);
  const [dismissedWarning, setDismissedWarning] = useState(false);
  
  const notifiedRef = useRef(false);

  useEffect(() => {
    // Attempt to request notification permission for native push
    if ('Notification' in window && Notification.permission === 'default') {
      try {
        Notification.requestPermission().catch(() => {});
      } catch (e) {}
    }

    const checkTime = () => {
      const now = new Date();
      // Parse local time as IST (Asia/Kolkata)
      const istString = now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
      const istTime = new Date(istString);
      
      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();

      // Native Push Notification at exactly 8:50 PM (20:50 IST)
      if (hours === 20 && minutes === 50) {
        if (!notifiedRef.current) {
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Trinity Prayer House', {
              body: 'We will be having a meet in 10 minutes. Join us!',
              icon: '/tph-icon-192.png'
            });
          }
          notifiedRef.current = true;
        }
      } else {
        notifiedRef.current = false;
      }

      // In-app warning banner between 8:50 PM and 9:00 PM (20:50 - 20:59)
      if (hours === 20 && minutes >= 50) {
        if (!showWarning) setShowWarning(true);
      } else {
        if (showWarning) {
          setShowWarning(false);
          setDismissedWarning(false); // reset for next day
        }
      }

      // In-app live banner between 9:00 PM and 10:00 PM (21:00 - 21:59)
      if (hours === 21) {
        if (!showLive) setShowLive(true);
      } else {
        if (showLive) {
          setShowLive(false);
          setDismissedLive(false); // reset for next day
        }
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 20000); // Check every 20 seconds
    return () => clearInterval(interval);
  }, [showWarning, showLive]);

  // Determine which banner to show
  const isWarningActive = showWarning && !dismissedWarning;
  const isLiveActive = showLive && !dismissedLive;

  if (!isWarningActive && !isLiveActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 50, opacity: 0, x: '-50%' }}
        animate={{ y: 0, opacity: 1, x: '-50%' }}
        exit={{ y: 50, opacity: 0, x: '-50%' }}
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          zIndex: 9999,
          width: 'calc(100% - 32px)',
          maxWidth: '420px',
        }}
      >
        <div style={{
          background: isLiveActive ? '#c7a760' : '#121420',
          color: isLiveActive ? '#121420' : '#fff',
          border: isLiveActive ? 'none' : '1px solid rgba(199, 167, 96, 0.4)',
          padding: '16px 20px',
          borderRadius: '16px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}>
          <Link 
            href="/online-meet" 
            style={{ display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none', color: 'inherit', flex: 1 }} 
            onClick={() => isLiveActive ? setDismissedLive(true) : setDismissedWarning(true)}
          >
            <div style={{ 
              background: isLiveActive ? 'rgba(255,255,255,0.3)' : 'rgba(199, 167, 96, 0.15)', 
              color: isLiveActive ? '#121420' : '#c7a760',
              padding: '10px', 
              borderRadius: '50%', 
              display: 'flex' 
            }}>
              {isLiveActive ? <Video size={24} /> : <Bell size={24} />}
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '16px', marginBottom: '2px' }}>
                {isLiveActive ? 'Daily Meet Started!' : 'Upcoming Meet'}
              </strong>
              <span style={{ fontSize: '14px', opacity: 0.9 }}>
                {isLiveActive ? 'Google Meet has started, please join.' : 'We will have a meet in 10 minutes.'}
              </span>
            </div>
          </Link>
          <button 
            onClick={() => isLiveActive ? setDismissedLive(true) : setDismissedWarning(true)} 
            style={{ 
              background: isLiveActive ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)', 
              border: 'none', 
              color: isLiveActive ? '#121420' : '#fff', 
              cursor: 'pointer', 
              padding: '8px', 
              display: 'flex',
              borderRadius: '50%',
              transition: 'background 0.2s'
            }}
            aria-label="Dismiss"
          >
            <X size={18} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Video, X, Bell, BellRing } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Helper to convert VAPID key
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function MeetNotifier() {
  const [showWarning, setShowWarning] = useState(false);
  const [showLive, setShowLive] = useState(false);
  const [dismissedLive, setDismissedLive] = useState(false);
  const [dismissedWarning, setDismissedWarning] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
   
  const notifiedRef = useRef(false);
  const warnRef = useRef<boolean>(false);
  const liveRef = useRef<boolean>(false);

  useEffect(() => {
    warnRef.current = showWarning;
    liveRef.current = showLive;
  }, [showWarning, showLive]);

  useEffect(() => {
    // Register service worker and check if already subscribed to web push
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        registration.pushManager.getSubscription().then(subscription => {
          setIsSubscribed(!!subscription);
        });
      });
    }
    if ('Notification' in window && Notification.permission === 'default') {
      try {
        Notification.requestPermission().catch(() => {});
      } catch { /* empty */ }
    }

    const checkTime = () => {
      const now = new Date();
      // Parse local time as IST (Asia/Kolkata)
      const istString = now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
      const istTime = new Date(istString);

      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();
      const day = istTime.getDay();

      // Skip all meet notifications on Sundays
      if (day === 0) {
        notifiedRef.current = false;
        if (warnRef.current) {
          setShowWarning(false);
          setDismissedWarning(false);
        }
        if (liveRef.current) {
          setShowLive(false);
          setDismissedLive(false);
        }
        return;
      }

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
        if (!warnRef.current) setShowWarning(true);
      } else {
        if (warnRef.current) {
          setShowWarning(false);
          setDismissedWarning(false); // reset for next day
        }
      }

      // In-app live banner between 9:00 PM and 10:00 PM (21:00 - 21:59)
      if (hours === 21) {
        if (!liveRef.current) setShowLive(true);
      } else {
        if (liveRef.current) {
          setShowLive(false);
          setDismissedLive(false); // reset for next day
        }
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 20000); // Check every 20 seconds
    return () => clearInterval(interval);
  }, []);

  const subscribeToPush = async () => {
    if (!('serviceWorker' in navigator && 'PushManager' in window)) {
      alert('Push notifications are not supported in your browser.');
      return;
    }
    
    setIsSubscribing(true);
    try {
      await navigator.serviceWorker.register('/sw.js');
      const registration = await navigator.serviceWorker.ready;
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!)
      });

      // Send to our API
      const res = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription)
      });

      if (res.ok) {
        setIsSubscribed(true);
        alert('You will now receive daily notifications when the meet starts!');
      } else {
        throw new Error('Failed to save subscription');
      }
    } catch (err) {
      console.error('Failed to subscribe:', err);
      alert('Failed to enable notifications. Please ensure you have allowed permissions.');
    } finally {
      setIsSubscribing(false);
    }
  };

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
         aria-live="polite"
         role="region"
         style={{
           position: 'fixed',
           bottom: '95px',
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
          
          <div style={{ display: 'flex', gap: '8px' }}>
            {!isLiveActive && !isSubscribed && (
              <button 
                onClick={subscribeToPush}
                disabled={isSubscribing}
                title="Enable daily notifications"
                style={{ 
                  background: 'rgba(199, 167, 96, 0.2)', 
                  border: 'none', 
                  color: '#c7a760', 
                  cursor: 'pointer', 
                  padding: '8px', 
                  display: 'flex',
                  borderRadius: '50%',
                  transition: 'background 0.2s'
                }}
              >
                <BellRing size={18} />
              </button>
            )}
            
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
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

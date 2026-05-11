'use client';
import eventStyles from './events.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { useLang } from '@/components/LangContext';

export default function Events() {
  const { t } = useLang();
  const upcomingEvents = [
    { id: 1, date: 'MAY 14', day: 'THURSDAY', title: t.ev1Title, time: '7:30 PM', location: 'Main Sanctuary & Online', desc: t.ev1Desc },
    { id: 2, date: 'MAY 17', day: 'SUNDAY', title: t.ev2Title, time: '4:00 PM', location: 'Youth Hall', desc: t.ev2Desc },
    { id: 3, date: 'MAY 24', day: 'SUNDAY', title: t.ev3Title, time: '9:30 AM', location: 'Main Sanctuary', desc: t.ev3Desc },
  ];

  return (
    <div className="pageWrap">
      <section className={eventStyles.headerSection}>
        <div className={eventStyles.headerBg}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100}>
            <div className={eventStyles.secLabel}>{t.calendar}</div>
            <h1>{t.eventsH1a} <i>{t.eventsH1b}</i></h1>
            <p className={eventStyles.headerSubtext}>{t.eventsSub}</p>
          </ScrollReveal>
        </div>
      </section>
      <section className={`section-padding ${eventStyles.eventsSection}`}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className={eventStyles.agendaList}>
            {upcomingEvents.map((event, index) => (
              <ScrollReveal key={event.id} delay={100 * (index + 1)} className={eventStyles.agendaItem}>
                <div className={eventStyles.dateBlock}>
                  <span>{event.day}</span>
                  <strong>{event.date}</strong>
                </div>
                <div className={eventStyles.eventDetails}>
                  <h2>{event.title}</h2>
                  <div className={eventStyles.metaData}>
                    <span>{event.time}</span>
                    <span className={eventStyles.dot}>•</span>
                    <span>{event.location}</span>
                  </div>
                  <p>{event.desc}</p>
                </div>
                <div className={eventStyles.actionBlock}>
                  <button className={`btn-outline ${eventStyles.rsvpBtn}`}>{t.details}</button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import styles from './Counter.module.css';

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  label: string;
}

export default function Counter({ end, suffix = '', label }: CounterProps) {
  return (
    <div className={styles.statCard}>
      <div className={styles.inner}>
        <div className={styles.value}>
          {end}
          {suffix}
        </div>
        <div className={styles.label}>{label}</div>
      </div>
    </div>
  );
}

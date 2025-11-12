import styles from "./placeholder.module.css";

export function BoardPlaceholder() {
  return (
    <div className={styles.layout}>
      <div className={styles.current}>
        <p>Loading...</p>
      </div>
      <div className={styles.daily}></div>
      <div className={styles.hourly}></div>
    </div>
  );
}

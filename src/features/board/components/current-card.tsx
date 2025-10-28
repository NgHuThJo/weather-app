import styles from "./current-card.module.css";
import { formatWeatherValue } from "#frontend/shared/app/formatting";

type CurrentCardProps = {
  text: string;
  value: unknown;
  unit: string;
  separator: string;
};

export function CurrentCard({
  text,
  value,
  unit,
  separator,
}: CurrentCardProps) {
  return (
    <div className={styles.layout}>
      <h3>{text}</h3>
      <span>{formatWeatherValue(String(value), unit, separator)}</span>
    </div>
  );
}

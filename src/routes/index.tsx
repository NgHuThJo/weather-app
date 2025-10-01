import { createFileRoute } from "@tanstack/react-router";
import styles from "./index.module.css";
import { Header } from "#frontend/features/header/components/header";
import { SearchBar } from "#frontend/features/searchbar/components/searchbar";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className={styles.layout}>
      <Header />
      <SearchBar />
    </main>
  );
}

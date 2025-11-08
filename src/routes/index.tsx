import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import styles from "./index.module.css";
import { Board } from "#frontend/features/board/components/board";
import { Header } from "#frontend/features/header/components/header";
import { UnitStoreProvider } from "#frontend/shared/store/unit";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className={styles.layout}>
      <UnitStoreProvider>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Board />
        </Suspense>
      </UnitStoreProvider>
    </main>
  );
}

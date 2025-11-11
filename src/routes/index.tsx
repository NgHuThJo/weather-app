import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useEffect } from "react";
import styles from "./index.module.css";
import { Board } from "#frontend/features/board/components/board";
import { Header } from "#frontend/features/header/components/header";
import { logger } from "#frontend/shared/app/logging";
import { useLocationStore } from "#frontend/shared/store/location";
import { UnitStoreProvider } from "#frontend/shared/store/unit";
import { getCurrentPosition } from "#frontend/shared/utils/geolocation";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const setLocationData = useLocationStore((state) => state.setLocationData);

  useEffect(() => {
    const geoLocationHandler = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      logger.log(latitude, longitude);

      setLocationData(latitude, longitude);
    };

    const watchObject = getCurrentPosition(geoLocationHandler, undefined, {
      enableHighAccuracy: true,
    });

    return () => {
      watchObject.clearWatch();
    };
  }, [setLocationData]);

  return (
    <main className={styles.layout}>
      <UnitStoreProvider>
        <Header />
        <Suspense fallback={<div className={styles.fallback}>Loading...</div>}>
          <Board />
        </Suspense>
      </UnitStoreProvider>
    </main>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useEffect, useState } from "react";
import styles from "./index.module.css";
import { Board } from "#frontend/features/board/components/board";
import { BoardPlaceholder } from "#frontend/features/board/components/placeholder";
import { Header } from "#frontend/features/header/components/header";
import { NotFound } from "#frontend/features/not-found/components/not-found";
import { ErrorBoundary } from "#frontend/shared/app/error-boundary";
import { Logger } from "#frontend/shared/app/logging";
import { useLocationStore } from "#frontend/shared/store/location";
import { UnitStoreProvider } from "#frontend/shared/store/unit";
import { getCurrentPosition } from "#frontend/shared/utils/geolocation";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [errorBoundaryKey, setErrorBoundaryKey] = useState(0);
  const setLocationData = useLocationStore((state) => state.setLocationData);

  useEffect(() => {
    const geoLocationHandler = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      Logger.info(
        "Latitude and longitude in index route useEffect",
        latitude,
        longitude,
      );

      setLocationData(latitude, longitude);
    };

    const watchObject = getCurrentPosition(geoLocationHandler, undefined, {
      enableHighAccuracy: true,
    });

    return () => {
      watchObject.clearWatch();
    };
  }, [setLocationData]);

  const handleRetry = () => {
    setErrorBoundaryKey((prev) => prev + 1);
  };

  return (
    <main className={styles.layout}>
      <ErrorBoundary
        fallback={<NotFound retry={handleRetry} key={errorBoundaryKey} />}
      >
        <UnitStoreProvider>
          <Header />
          <Suspense fallback={<BoardPlaceholder />}>
            <Board />
          </Suspense>
        </UnitStoreProvider>
      </ErrorBoundary>
    </main>
  );
}

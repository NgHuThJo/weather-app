import { logger } from "#frontend/shared/app/logging";

export function getCurrentPosition(
  successCallback: PositionCallback,
  errorCallback?: PositionErrorCallback,
  options?: PositionOptions,
) {
  navigator.geolocation.getCurrentPosition(
    successCallback,
    errorCallback ??
      ((error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED: {
            logger.log("Permission denied:", error);
            break;
          }
          case error.POSITION_UNAVAILABLE: {
            logger.log("Position unavailable:", error);
            break;
          }
          case error.TIMEOUT: {
            logger.log("Request timed out:", error);
            break;
          }
        }
      }),
    options,
  );

  const watchId = navigator.geolocation.watchPosition(
    successCallback,
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED: {
          logger.log("Permission denied:", error);
          break;
        }
        case error.POSITION_UNAVAILABLE: {
          logger.log("Position unavailable:", error);
          break;
        }
        case error.TIMEOUT: {
          logger.log("Request timed out:", error);
          break;
        }
      }
    },
    options,
  );

  return {
    clearWatch: () => {
      navigator.geolocation.clearWatch(watchId);
    },
  };
}

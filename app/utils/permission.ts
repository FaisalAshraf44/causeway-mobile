import { Alert, Platform } from 'react-native';
import {
  checkMultiple,
  openSettings,
  PERMISSIONS,
  requestMultiple,
} from 'react-native-permissions';

const locationPermission =
  Platform.OS == 'ios'
    ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
const locationCoarsePermission =
  Platform.OS == 'ios'
    ? PERMISSIONS.IOS.LOCATION_ALWAYS
    : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION;
const cameraPermission =
  Platform.OS == 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;

export const requestPermissionsForLocation = (
  sendPermissionStatus: (value: boolean) => any
) => {
  requestMultiple([locationPermission, locationCoarsePermission]).then(
    (status) => {
      const multiplePermissions = Object?.values(status);
      if (
        multiplePermissions[0] == 'granted' ||
        multiplePermissions[0] == 'unavailable'
      ) {
        sendPermissionStatus(true);
        return true;
      } else {
        sendPermissionStatus(false);
        permissionAlert('Location', () => {
          sendPermissionStatus(false);
        });
        return status;
      }
    }
  );
};
export const checkPermissionForLocation = (
  sendPermissionStatus: (value: boolean) => any
) => {
  checkMultiple([locationPermission, locationCoarsePermission]).then(
    (statuses) => {
      if (
        statuses[locationPermission] == 'blocked' ||
        statuses[locationPermission] == 'denied'
      ) {
        sendPermissionStatus(false);
      } else if (
        statuses[locationPermission] == 'granted' ||
        statuses[locationPermission] == 'unavailable'
      ) {
        sendPermissionStatus(true);
      } else {
        sendPermissionStatus(false);
      }
    }
  );
};

export const requestPermissionsForCamera = (
  sendPermissionStatus: (value: boolean) => any
) => {
  requestMultiple([cameraPermission]).then((status) => {
    const multiplePermissions = Object?.values(status);
    if (
      multiplePermissions[0] == 'granted' ||
      multiplePermissions[0] == 'unavailable'
    ) {
      sendPermissionStatus(true);
      return true;
    } else {
      sendPermissionStatus(false);
      permissionAlert('Camera', () => {
        sendPermissionStatus(false);
      });
      return status;
    }
  });
};
export const checkPermissionForCamera = (
  sendPermissionStatus: (value: boolean) => any
) => {
  checkMultiple([cameraPermission]).then((statuses) => {
    if (
      statuses[cameraPermission] == 'blocked' ||
      statuses[cameraPermission] == 'denied'
    ) {
      sendPermissionStatus(false);
    } else if (
      statuses[cameraPermission] == 'granted' ||
      statuses[cameraPermission] == 'unavailable'
    ) {
      sendPermissionStatus(true);
    } else {
      sendPermissionStatus(false);
    }
  });
};

export function permissionAlert(type: string, onPressCancel?: () => void) {
  Alert.alert(
    'Permission ',
    `Goto Settings > ${'Himenus'} > ${type} > allow Himenus to access your ${type}`,
    [
      {
        text: 'Cancel',
        onPress: () => {
          if (typeof onPressCancel === 'function') {
            onPressCancel();
          }
        },
      },
      {
        text: 'Open Settings',
        onPress: async () => {
          try {
            openSettings();
          } catch {}
        },
      },
    ],
    { cancelable: false }
  );
}

import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {

    const authStatus = await messaging().requestPermission();
    await messaging().requestPermission({
        provisional: true,
    });
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
}

export async function checkApplicationPermission() {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        console.log('User has notification permissions enabled.');
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
        console.log('User has provisional notification permissions.');
    } else {
        console.log('User has notification permissions disabled');
    }
}


export async function getFCMToken() {
    try {
        let fcmtoken = await AsyncStorage.getItem('fcmtoken');
        console.log(fcmtoken, "old token");
        if (!fcmtoken) {
            fcmtoken = await messaging().getToken();
            if (fcmtoken) {
                console.log(fcmtoken, '......new token');
                await AsyncStorage.setItem('fcmtoken', fcmtoken);
            }
        }
        return fcmtoken;
    } catch (error) {
        console.log(error, 'error in getFCMToken');
        throw error;
    }
}

export const NotificationListener = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );
                }
            });
    });

    messaging().onMessage(async remoteMessage => {
        console.log('notification on foreground state....', remoteMessage);
    });
};

export const handleBackgroundMessage = async (remoteMessage: any) => {
    console.log('Background message received: ', remoteMessage);
};

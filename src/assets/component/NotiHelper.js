import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

import notifee, { AndroidImportance } from '@notifee/react-native';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFCMToken()
    }
}

const getFCMToken = async () => {
    let fcmToken = await AsyncStorage.getItem("fcmToken")
    console.log(fcmToken, "oldtoken");

    if (!fcmToken) {
        try {
            let fcmToken = await messaging().getToken()
            if (fcmToken) {
                console.log('new:', fcmToken);
                await AsyncStorage.setItem("fcmToken", fcmToken)
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export const NotificationService = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );

    });

    messaging().onMessage(async remoteMessage => {
        // console.log('Noti in foreground', remoteMessage);
        console.log(remoteMessage.notification);
        onDisplayNotification(remoteMessage)
    })

    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
                setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
            }
        })
}


export async function onDisplayNotification(data) {
    // Request permissions (required for iOS)

    if (Platform.OS == 'ios') {
        await notifee.requestPermission()
    }
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
        id: "default3",
        name: "Default Channel 3",
        sound: "default",
        importance: AndroidImportance.HIGH,
    });
    // Display a notification
    await notifee.displayNotification({
        title: data.notification && data.notification.title ? data.notification.title : "tiêu đề",
        body: data.notification && data.notification.body ? data.notification.body : "body",
        android: {
            channelId,
            color: '#4caf50',
            actions: [
                {
                    title: '<b>Đồng ý</b>',
                    pressAction: {
                        id: 'accept',
                    },
                },
                {
                    title: '<b>Từ chối</b>',
                    pressAction: {
                        id: 'ingore',
                    },
                },

            ]

        },
    });

}
import { NotificationListener, requestUserPermission } from 'app/helpers/PushNotificationHelper';
import React, { useEffect } from 'react';


import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';


import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Section: React.FC<{
    title: string;
}> = ({ children, title }) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.sectionContainer}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black,
                    },
                ]}>
                {title}
            </Text>
            <Text
                style={[
                    styles.sectionDescription,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark,
                    },
                ]}>
                {children}
            </Text>
        </View>
    );
};




const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    useEffect(() => {
        requestUserPermission();
        NotificationListener();
        getFCMToken();
    }, []);


    async function getFCMToken(user: any) {
        try {
            let fcmtoken = await AsyncStorage.getItem('fcmtoken');

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

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
                <Header />
                <View
                    style={{
                        backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    }}>
                    <Section title="Step One">
                        Edit <Text style={styles.highlight}>App.tsx</Text> to change this screen and
                        then come back to see your edits.
                    </Section>
                    <Section title="See Your Changes">
                        <ReloadInstructions />
                    </Section>
                    <Section title="Debug">
                        <DebugInstructions />
                    </Section>
                    <Section title="Learn More">Read the docs to discover what to do next:</Section>
                    <LearnMoreLinks />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;

/**
 * React Native App
 * Everything starts from the Entry-point
 */

import Navigator from 'app/navigation';
import RNRestart from 'react-native-restart';
import { persistor, store } from 'app/store';
import { RootState } from 'app/store/slice';
import React, { useEffect } from 'react';
import { ActivityIndicator, LogBox, SafeAreaView, Text } from 'react-native';
import codePush from 'react-native-code-push';
import { Button, Provider as PaperProvider, Snackbar, useTheme } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import DarkTheme from './theme/DarkTheme';
import DefaultTheme from './theme/DefaultTheme';
import ErrorBoundary from 'react-native-error-boundary';

const RootNavigation: React.FC = () => {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs(); //Ignore all log notifications
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    const theme = isDark ? DarkTheme : DefaultTheme;

    useEffect(() => {
        SplashScreen.hide();
    }, []);
    return (
        <PaperProvider theme={theme as any}>
            <Navigator />
        </PaperProvider>
    );
};
const codePushOptions = {
    updateDialog: false,
    installMode: codePush.InstallMode.IMMEDIATE,
};

const EntryPoint: React.FC = () => {
    const theme = useTheme();
    useEffect(() => {
        codePush.sync({ installMode: codePush.InstallMode.IMMEDIATE });
    });

    const CustomFallback = (props: { error?: Error; resetError: () => void }) => (
        <SafeAreaView
            style={{
                flex: 1,
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Text style={{ fontWeight: 'bold' }}>Something Error occured, please try again</Text>
            <Button
                onPress={() => RNRestart.Restart()}
                style={{
                    backgroundColor: theme.colors.primary,
                    borderRadius: 20,
                    marginTop: 10,
                }}>
                Restart
            </Button>
            <Snackbar visible={props.error?.message ? true : false} onDismiss={() => {}}>
                {props.error?.message}
            </Snackbar>
        </SafeAreaView>
    );

    return (
        <Provider store={store}>
            <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
                <ErrorBoundary FallbackComponent={CustomFallback}>
                    <RootNavigation />
                </ErrorBoundary>
            </PersistGate>
        </Provider>
    );
};
export default codePush(codePushOptions)(EntryPoint);

import '../global.css';

import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <StatusBar style="light" />
            <SafeAreaView className="bg-background flex flex-1">
                    <Slot />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

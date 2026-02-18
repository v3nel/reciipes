import '../global.css';

import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        Itim: require('../assets/fonts/Itim-Regular.ttf'),
        "Sora-Bold": require('../assets/fonts/Sora/Sora-Bold.ttf'),
        "Sora-ExtraBold": require('../assets/fonts/Sora/Sora-ExtraBold.ttf'),
        "Sora-ExtraLight": require('../assets/fonts/Sora/Sora-ExtraLight.ttf'),
        "Sora-Light": require('../assets/fonts/Sora/Sora-Light.ttf'),
        "Sora-Medium": require('../assets/fonts/Sora/Sora-Medium.ttf'),
        "Sora-Regular": require('../assets/fonts/Sora/Sora-Regular.ttf'),
        "Sora-SemiBold": require('../assets/fonts/Sora/Sora-SemiBold.ttf'),
        "Sora-Thin": require('../assets/fonts/Sora/Sora-Thin.ttf'),
    });

    if (!fontsLoaded) {
        return (
            <View className="flex-1 items-center justify-center bg-background">
                <ActivityIndicator size="large" color="primary" />
            </View>
        );
    }

    return (
        <SafeAreaProvider>
            <StatusBar style="dark" />
            <SafeAreaView className="bg-background flex flex-1">
                    <Slot />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

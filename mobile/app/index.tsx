import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { Text, View } from 'react-native';

export default function HomeScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-background gap-4">
            <Text className="text-lg font-semibold text-primary">
                Bienvenue sur Reciipes
            </Text>
        </View>
    );
}

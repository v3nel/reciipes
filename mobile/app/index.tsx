import { Logosvg } from '@/components/svgs';
import { Text, View } from 'react-native';

export default function HomeScreen() {
    return (
        <View className="flex-1 items-center bg-background gap-4">
            <Text className="text-2xl font-semibold text-primary font-itim ">
                Reciipes
            </Text>
            <Logosvg />
        </View>
    );
}

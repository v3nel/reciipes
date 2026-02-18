import Button from '@/components/button';
import { Logosvg } from '@/components/svgs';
import { Text, View } from 'react-native';

export default function HomeScreen() {
    return (
        <View className="flex-1 items-center bg-background gap-4 px-6 py-2 justify-between">
            <Text className="text-2xl font-semibold text-primary font-itim ">
                Reciipes
            </Text>
            <View className="flex justify-center items-center gap-10">
                <Logosvg />
                <View className="px-6">
                    <Text className="text-primary font-itim text-5xl">On se crée un compte ?</Text>
                    <Text className="text-primary font-itim text-xl">Reciipes est la meilleure solution pour la cuisine en famille ou en collocation</Text>
                </View>
            </View>
            <View className="w-full gap-2 items-center justify-center">
                <Button
                    text='Yesss!!!'
                />
                <Button
                    text="Euhhh.. peut-être plus tard"
                    style='secondary'
                />  
            </View>
        </View>
    );
}

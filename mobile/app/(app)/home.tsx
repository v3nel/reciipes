import { View, Text } from "react-native"
import { Home, CircleUserRound, List } from "lucide-react-native"

export default function HomeScreen() {
    const pages = [
        {
            title: "Acceuil",
            Icon: Home
        },
        {
            title: "Courses",
            Icon: List
        },
        {
            title: "Profil",
            Icon: CircleUserRound
        }
    ]
    return (
        <View className="bg-primary flex-row mx-6 justify-between rounded-full px-14 py-3 mb-3">
            {pages.map((page) => (
                <View key={page.title} className="justify-center items-center">
                    <page.Icon size={36} color={"#99A1AA"}/>
                    <Text className="text-center -mt-1 font-itim text-lg text-[#99A1AA]">{page.title}</Text>
                </View>
            ))}
        </View>
    )
}
import { Input, Button, IconButton } from "@/components/components";
import { Applelogo, Facebooklogo, Googlelogo } from "@/components/svgs";
import { router } from "expo-router";

import { useState } from "react";
import { Text, View } from "react-native";

export default function Login() {
    const [sign, setSign] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const texts = {
        title: sign ? "S'inscrire" : "Se Connecter",
        prompt: sign ? "Vous avez déjà un compte ?" : "Vous n'en avez pas encore ?",
        toggle: sign ? "Se connecter !" : "S'inscrire !",
        social: sign ? "Ou inscrivez-vous via" : "Ou connectez-vous via"
    };

    return (
        <View className="flex-1 flex justify-center items-center p-6 gap-6">
            <View className="w-full gap-1">
                <Text className="text-center text-primary font-itim text-5xl">{texts.title}</Text>
                <View className="flex flex-row justify-center gap-1">
                    <Text className="text-primary font-itim text-xl">{texts.prompt}</Text>
                    <Text 
                        className="text-primary font-itim text-xl underline" 
                        onPress={() => setSign(!sign)}
                    >{texts.toggle}</Text>
                </View>
            </View>
            <View className="w-full gap-3">
                <Input
                    placeholder="Adresse Email"
                    data={email}
                    onChange={setEmail}
                    type="email-address"
                />
                <Input
                    placeholder="Mot de Passe"
                    data={password}
                    onChange={setPassword}
                    type="visible-password"
                    encrypted
                />
            </View>
            <View className="w-full gap-2">
                <Button
                    text={texts.title}
                    onPress={() => router.replace("/home")}
                />
                {
                    sign ? 
                    <Button
                        text="On verra plus tard"
                        onPress={() => router.replace("/home")}
                        style="secondary"
                    /> : <></>
                }
            </View>
            <View className="w-full flex-row items-center gap-3 my-4">
                <View className="flex-1 border-t border-secondary" />
                <Text className="text-primary/70 font-itim text-center">{texts.social}</Text>
                <View className="flex-1 border-t border-secondary" />
            </View>
            <View className="w-full flex-row gap-4">
                <IconButton
                    Icon={Googlelogo}
                    iconSize={30}
                />
                <IconButton
                    Icon={Applelogo}
                    iconSize={30}
                />
                <IconButton
                    Icon={Facebooklogo}
                    iconSize={38}
                />

            </View>
        </View>
    );
}
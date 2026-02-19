import { KeyboardTypeOptions, TextInput, View } from "react-native";

interface InputProps {
    placeholder: string;
    data: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
    type?: KeyboardTypeOptions;
    encrypted?: boolean;
}

export function Input({
    placeholder,
    data,
    onChange,
    type="default",
    encrypted=false
}: InputProps) {
    return (
        <TextInput
            className="flex p-3 border-primary border-2 rounded-3xl font-itim text-primary h-14"
            id={placeholder}
            placeholder={placeholder}
            placeholderTextColor="#244E61"
            value={data}
            onChangeText={onChange}
            keyboardType={type}
            secureTextEntry={encrypted}
        />
    )
}
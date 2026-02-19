import { TouchableOpacity } from "react-native";

interface IconButtonProps {
    Icon: React.ComponentType<{ color?: string; width?: number | string; height?: number | string }>;
    iconColor?: string;
    ratio?: "full" | "fit";
    iconSize?: number | string;
}

export function IconButton({
    Icon,
    iconColor,
    ratio = "full",
    iconSize = 24
}: IconButtonProps) {
    let className = "flex items-center justify-center rounded-3xl border py-3 px-6 ";
    switch(ratio) {
        case 'full':
            className += "h-[62] flex-1";
            break;
        case 'fit':
            className += "w-fit h-fit";
            break;
    }
    return (
        <TouchableOpacity className={className}>
            <Icon 
                color={iconColor || undefined}
                width={iconSize}
                height={iconSize}
            />
        </TouchableOpacity>
    )
}
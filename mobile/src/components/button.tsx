import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface ButtonProps {
    style?: 'primary' | 'secondary';
    ratio?: 'full' | 'fit';
    Icon?: React.ComponentType<{ color?: string }>;
    text: string;
    onPress?: () => void;
    focus?: 'center' | 'start';
    iconColor?: string;
}

export default function Button({
    style = 'primary',
    ratio = 'full',
    Icon,
    text,
    onPress,
    focus = 'center',
    iconColor,
}: ButtonProps) {
    let className = 'rounded-full flex flex-row items-center gap-3 ';

    switch (style) {
        case 'primary':
            className +=
                'bg-primary ';
            break;
        case 'secondary':
            className += 'bg-secondary ';
            break;
    }

    if (ratio === 'full') {
        className += 'w-full h-[62] ';
    } else {
        className += 'px-[25] py-[15] w-fit h-fit ';
    }

    if (focus === 'center') {
        className += 'justify-center ';
    } else {
        className += 'px-8 ';
    }

    return (
        <TouchableOpacity className={className} onPress={onPress}>
            {Icon ? (
                <Icon
                    color={iconColor}
                />
            ) : (
                <></>
            )}
            {text ? (
                <Text
                    className={`font-sora-regular text-xl ${style === 'secondary' ? 'text-primary' : 'text-white'}`}
                >
                    {text}
                </Text>
            ) : (
                <></>
            )}
        </TouchableOpacity>
    );
}

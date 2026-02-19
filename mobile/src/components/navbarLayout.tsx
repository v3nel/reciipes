import React from 'react';
import { View } from 'react-native';
import { Navbar } from './navbar';

interface NavbarLayoutProps {
    children: React.ReactNode;
}

export const NavbarLayout: React.FC<NavbarLayoutProps> = ({ children }) => {
    return (
        <View className="flex-1">
            <View className="flex-1">
                {children}
            </View>
            <Navbar/>
        </View>
    );
};
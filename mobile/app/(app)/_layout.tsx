import { NavbarLayout } from '@/components/components';
import { Slot } from 'expo-router';

export default function RootLayout() {
    
    return (
        <NavbarLayout>
            <Slot />
        </NavbarLayout>
    );
}
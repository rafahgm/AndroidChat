import React, { useCallback } from 'react';
import { StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function useStatusBar(style, color) {
    useFocusEffect(
        useCallback(() => {
            StatusBar.setBarStyle(style);
            StatusBar.setBackgroundColor(color, true);
        }, [])
    );
}
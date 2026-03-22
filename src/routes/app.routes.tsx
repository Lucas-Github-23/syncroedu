import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { Platform, useColorScheme } from 'react-native';

import { Dashboard } from '../screens/Dashboard';
import { Calendar } from '../screens/Calendar';
import { Timer } from '../screens/Timer';
import { History } from '../screens/History';
import { Profile } from '../screens/Profile';
import { GenerateSchedule } from '../screens/GenerateSchedule';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabRoutes() {
  const isDark = useColorScheme() === 'dark';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: isDark ? '#4B5563' : '#9CA3AF',
        tabBarStyle: { 
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingBottom: Platform.OS === 'ios' ? 30 : 15,
          backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: isDark ? '#374151' : '#F3F4F6',
          elevation: 0
        },
      }}
    >
      <Tab.Screen name="Início" component={Dashboard} 
        options={{ tabBarIcon: ({ color }) => <Feather name="home" color={color} size={24} /> }} />
      <Tab.Screen name="Agenda" component={Calendar} 
        options={{ tabBarIcon: ({ color }) => <Feather name="calendar" color={color} size={24} /> }} />
      <Tab.Screen name="Foco" component={Timer} 
        options={{ tabBarIcon: ({ color }) => <Feather name="clock" color={color} size={24} /> }} />
      <Tab.Screen name="Histórico" component={History} 
        options={{ tabBarIcon: ({ color }) => <Feather name="award" color={color} size={24} /> }} />
    </Tab.Navigator>
  );
}

export function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabRoutes} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="IA" component={GenerateSchedule} />
    </Stack.Navigator>
  );
}
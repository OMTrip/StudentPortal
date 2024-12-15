import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../src/screens/LoginScreen';
import DashbordScreen from '../src/screens/DashbordScreen';
import CoursesScreen from '../src/screens/CoursesScreen';
import { PreRecordedClasses } from '../src/screens/PreRecordedClasses';
import ProfileScreen from '../src/screens/ProfileScreen';
import RaiseQueryScreen from '../src/screens/RaiseQueryScreen';
import UploadAssignmentScreen from '../src/screens/UploadAssignmentScreen';
import LiveStreamingScreen from '../src/screens/LiveStreamingScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
       <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Dashboard" component={DashbordScreen} options={{ title: 'Dashboard' }} />
         <Stack.Screen name="Courses" component={CoursesScreen} options={{ title: 'My Courses' }} />
         <Stack.Screen name="PreRecordedClasses" component={PreRecordedClasses} options={{ title: 'Pre Recorded Classes' }} />
         <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }} />
         <Stack.Screen name="RaiseQueryScreen" component={RaiseQueryScreen} options={{ title: 'Raise Quary' }} />
         <Stack.Screen name="UploadAssignmentScreen" component={UploadAssignmentScreen} options={{ title: 'Upload Assignment' }} />
         <Stack.Screen name="LiveStreamingScreen" component={LiveStreamingScreen} options={{ title: 'Live Class' }} />
         {/* <Stack.Screen name="DummyNotification" component={DummyNotification}/> */}


        {/* <Stack.Screen name="Query" component={QueryScreen} options={{ title: 'Raise Query' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        <Stack.Screen name="Assignments" component={AssignmentsScreen} options={{ title: 'Assignments' }} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Notifications' }} /> */} 
      </Stack.Navigator>
  );
}

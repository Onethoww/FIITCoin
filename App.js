import React, { useState, useEffect } from "react";
import { View, Button, Text, ActivityIndicator, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { getAuth, GoogleAuthProvider, signInWithCredential, signOut, onAuthStateChanged } from "firebase/auth";
import Constants from "expo-constants";
import { auth } from "./config/firebase";
import LoginPage from "./screens/LoginPage";
import MainPage from "./screens/MainPage";
import {
  authorizeGoogleFit,
  fetchStepData,
  fetchWorkoutData,
  fetchCaloriesBurned,
  fetchDistanceData,
} from "./googleFitService"; // Import Google Fit functions

WebBrowser.maybeCompleteAuthSession();

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [steps, setSteps] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [calories, setCalories] = useState(null);
  const [distance, setDistance] = useState(null);
  const [fitLoading, setFitLoading] = useState(true); // Separate loading for Google Fit data

  // ✅ Retrieve OAuth Client IDs & Redirect URI from app.json
  const androidClientId = Constants.expoConfig?.extra?.firebase?.androidClientId;
  const webClientId = Constants.expoConfig?.extra?.firebase?.webClientId;
  const redirectUri = Constants.expoConfig?.extra?.firebase?.redirectUrl; // ✅ Use from app.json

  // ✅ Google Auth Request - Prioritizing Android, Then Web
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId, // ✅ Prefer Android Client ID on Native
    webClientId, // ✅ Use Web Client ID for Web Fallback
    redirectUri, // ✅ Correct Expo Redirect URI
  });

  // Monitor Firebase Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      setUser(authenticatedUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Handle Google Sign-In Response
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log("✅ User Signed In: ", userCredential.user);
          setUser(userCredential.user);
        })
        .catch((error) => console.error("❌ Google Sign-In Error: ", error));
    }
  }, [response]);

  // Login with Google
  const handleLogin = () => {
    promptAsync();
  };

  // Logout User
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("✅ User Logged Out");
        setUser(null);
      })
      .catch((error) => console.error("❌ Logout Error: ", error));
  };

  // Fetch Google Fit Data
  useEffect(() => {
    const fetchFitnessData = async () => {
      const isAuthorized = await authorizeGoogleFit();
      if (isAuthorized) {
        setSteps(await fetchStepData());
        setWorkouts(await fetchWorkoutData());
        setCalories(await fetchCaloriesBurned());
        setDistance(await fetchDistanceData());
      }
      setFitLoading(false);
    };

    fetchFitnessData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Main" : "Login"}>
        {/* Login Screen */}
        <Stack.Screen name="Login">
          {() => (
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : user ? (
                <>
                  <Text>Welcome, {user.displayName}!</Text>
                  <Button title="Logout" onPress={handleLogout} />
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 20 }}>📊 Steps Today: {steps?.[0]?.steps || "No Data"}</Text>
                    <Text style={{ fontSize: 20 }}>🏋️ Workouts Logged: {workouts.length}</Text>
                    <Text style={{ fontSize: 20 }}>🔥 Calories Burned: {calories?.[0]?.calories || "No Data"}</Text>
                    <Text style={{ fontSize: 20 }}>📏 Distance Traveled: {distance?.[0]?.distance || "No Data"} km</Text>
                    <Button title="Refresh Data" onPress={async () => {
                      setFitLoading(true);
                      setSteps(await fetchStepData());
                      setWorkouts(await fetchWorkoutData());
                      setCalories(await fetchCaloriesBurned());
                      setDistance(await fetchDistanceData());
                      setFitLoading(false);
                    }} />
                  </View>
                </>
              ) : (
                <Button title="Login with Google" disabled={!request} onPress={handleLogin} />
              )}
            </ScrollView>
          )}
        </Stack.Screen>

        {/* Main Page */}
        <Stack.Screen name="Main" component={MainPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

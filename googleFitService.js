import GoogleFit, { Scopes } from "react-native-google-fit";
import { Alert, Linking, Platform, PermissionsAndroid } from "react-native";

// Google Fit Authorization Options
const options = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ, // Read workout and step data
    Scopes.FITNESS_BODY_READ, // Read body metrics (steps, calories burned)
    Scopes.FITNESS_ACTIVITY_WRITE, // (Optional) Write workouts
  ],
};

// Function to check and request Android permissions
const requestPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
      PermissionsAndroid.PERMISSIONS.BODY_SENSORS,
    ]);

    if (
      granted["android.permission.ACTIVITY_RECOGNITION"] !== PermissionsAndroid.RESULTS.GRANTED ||
      granted["android.permission.BODY_SENSORS"] !== PermissionsAndroid.RESULTS.GRANTED
    ) {
      Alert.alert(
        "Permissions Required",
        "Please grant Activity Recognition and Body Sensor permissions for Google Fit to work."
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error("❌ Error Requesting Permissions:", error);
    return false;
  }
};

// Function to check if Google Fit is installed
const isGoogleFitInstalled = async () => {
  if (Platform.OS === "android") {
    try {
      return await Linking.canOpenURL("market://details?id=com.google.android.apps.fitness");
    } catch (error) {
      console.error("❌ Error Checking Google Fit:", error);
      return false;
    }
  }
  return false;
};

// Function to prompt the user to install Google Fit
const promptInstallGoogleFit = () => {
  Alert.alert(
    "Google Fit Required",
    "Google Fit is not installed. Please install it from the Play Store to track your fitness data.",
    [
      { text: "Cancel", style: "cancel" },
      { text: "Install", onPress: () => Linking.openURL("market://details?id=com.google.android.apps.fitness") },
    ]
  );
};

// Function to initialize Google Fit
const initializeGoogleFit = async () => {
  try {
    console.log("🔄 Checking Google Fit Authorization...");
    GoogleFit.checkIsAuthorized();

    if (GoogleFit.isAuthorized) {
      console.log("✅ Google Fit Already Authorized!");
      return true;
    }

    console.log("🔄 Requesting Google Fit Authorization...");
    const authResult = await GoogleFit.authorize(options);

    if (authResult.success) {
      console.log("✅ Google Fit Authorized!");
      return true;
    } else {
      console.error("❌ Google Fit Authorization Failed:", authResult.message);
      return false;
    }
  } catch (error) {
    console.error("Google Fit Initialization Error:", error);
    return false;
  }
};

// Function to authorize Google Fit
export const authorizeGoogleFit = async () => {
  try {
    const fitInstalled = await isGoogleFitInstalled();
    if (!fitInstalled) {
      promptInstallGoogleFit();
      return false;
    }

    // Request permissions before authorization
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return false;

    return await initializeGoogleFit();
  } catch (error) {
    console.error("Google Fit Authorization Error:", error);
    return false;
  }
};

// Function to fetch step count data
export const fetchStepData = async () => {
  if (!GoogleFit.isAuthorized) {
    console.warn("⚠️ Google Fit is not authorized. Cannot fetch step data.");
    return [];
  }

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7);
  const endDate = new Date();

  const options = {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    bucketUnit: "DAY",
    bucketInterval: 1,
  };

  try {
    const response = await GoogleFit.getDailyStepCountSamples(options);
    console.log("📊 Step Data:", response);

    return response.length > 0 ? response : [];
  } catch (error) {
    console.error("❌ Error Fetching Steps:", error);
    return [];
  }
};

// Function to fetch workout sessions (running, walking, cycling)
export const fetchWorkoutData = async () => {
  if (!GoogleFit.isAuthorized) {
    console.warn("⚠️ Google Fit is not authorized. Cannot fetch workout data.");
    return [];
  }

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  const endDate = new Date();

  const options = {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };

  try {
    const workouts = await GoogleFit.getWorkoutSessions(options);
    console.log("🏋️ Workout Sessions:", workouts);
    return workouts.length > 0 ? workouts : [];
  } catch (error) {
    console.error("❌ Workout Data Error:", error);
    return [];
  }
};

// Function to fetch calories burned
export const fetchCaloriesBurned = async () => {
  if (!GoogleFit.isAuthorized) {
    console.warn("⚠️ Google Fit is not authorized. Cannot fetch calorie data.");
    return [];
  }

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7);
  const endDate = new Date();

  const options = {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };

  try {
    const response = await GoogleFit.getDailyCalorieSamples(options);
    console.log("🔥 Calories Burned:", response);
    return response.length > 0 ? response : [];
  } catch (error) {
    console.error("❌ Error Fetching Calories:", error);
    return [];
  }
};

// Function to fetch distance traveled
export const fetchDistanceData = async () => {
  if (!GoogleFit.isAuthorized) {
    console.warn("⚠️ Google Fit is not authorized. Cannot fetch distance data.");
    return [];
  }

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7);
  const endDate = new Date();

  const options = {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };

  try {
    const response = await GoogleFit.getDailyDistanceSamples(options);
    console.log("📏 Distance Traveled:", response);
    return response.length > 0 ? response : [];
  } catch (error) {
    console.error("❌ Error Fetching Distance:", error);
    return [];
  }
};

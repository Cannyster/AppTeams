import { Groups } from "@/src/screens/groups";
import { ThemeProvider } from "styled-components/native";
import theme from "@/src/theme";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Loading } from "@/src/components/Loading";
import { StatusBar } from "react-native";
import { NewGroup } from "@/src/screens/NewGroup";

export default function Index() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.COLORS.GRAY_700}
      />
      {/* {fontsLoaded ? <Groups /> : <Loading />} */}
      {fontsLoaded ? <NewGroup /> : <Loading />}
    </ThemeProvider>
  );
}

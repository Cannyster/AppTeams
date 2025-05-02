import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import { View } from "react-native";
import { useTheme } from "styled-components/native";

export function Routes() {
  const theme = useTheme();
  return (
    // A view e adicionada para remover o fundo branco que fica visivel ao realizar transiçõa entre telas da aplicação
    <View style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_600 }}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  );
}

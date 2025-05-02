import { Container, Logo, BackIcon, BackButton } from "./styles";
import LogoImg from "../../assets/logo.png";
import React from "react";
import { useNavigation } from "@react-navigation/native";

type Props = {
  showBackButton?: boolean;
};

export function Header({ showBackButton = false }: Props) {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.navigate("groups");
  }

  return (
    <Container showBackButton={showBackButton}>
      {showBackButton && (
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={LogoImg} />
    </Container>
  );
}

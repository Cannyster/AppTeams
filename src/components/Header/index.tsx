import { Container, Logo, BackIcon, BackButton } from "./styles";
import LogoImg from "../../assets/logo.png";
import React from "react";

type Props = {
  showBackButton?: boolean;
};

export function Header({ showBackButton = false }: Props) {
  return (
    <Container showBackButton={showBackButton}>
      {showBackButton && (
        <BackButton>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={LogoImg} />
    </Container>
  );
}

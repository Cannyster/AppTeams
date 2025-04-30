import { TouchableOpacityProps } from "react-native";

import { ButtonIconTypeStyleProps, Container, Icon } from "./styles";

type Props = TouchableOpacityProps & {
  type: ButtonIconTypeStyleProps;
};

export function ButtonIcon({}: Props) {
  return (
    <Container>
      <Icon name="home" type="PRIMARY" />
    </Container>
  );
}

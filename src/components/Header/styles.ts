import styled from "styled-components/native";
import { CaretLeft } from "phosphor-react-native";

type Props = {
  showBackButton?: boolean;
};

export const Container = styled.View<Props>`
  flex-direction: row;
  height: 55px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  align-items: center;
  padding-left: 24px;
  padding-right: 24px;
  justify-content: ${({ showBackButton }) =>
    showBackButton ? "space-between" : "center"};
`;

export const Logo = styled.Image`
  width: 46px;
  height: 55px;
`;

export const BackButton = styled.TouchableOpacity``;

export const BackIcon = styled(CaretLeft).attrs(({ theme }) => ({
  size: 32,
  color: theme.COLORS.WHITE,
}))``;

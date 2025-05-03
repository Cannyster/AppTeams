import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export type ButtonTypeStyleProps = "PRIMARY" | "SECONDARY";

type Props = {
  type: ButtonTypeStyleProps;
  disabled: boolean;
};

export const Container = styled(TouchableOpacity)<Props>`
  flex: 1;

  min-height: 56px;
  max-height: 56px;

  border-radius: 6px;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme, type, disabled }) =>
    disabled
      ? theme.COLORS.GRAY_400
      : type === "PRIMARY"
      ? theme.COLORS.GREEN_700
      : theme.COLORS.RED_DARK};
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
  `};
`;

import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";

export const Container = styled(TextInput)`
  ${({ theme }) => css`
    flex: 1;
    min-height: 56px;
    max-height: 56px;
    background-color: ${theme.COLORS.GRAY_700};

    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.WHITE};

    border-radius: 6px;
    padding: 16px;
  `}
`;

export const Message = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
`;

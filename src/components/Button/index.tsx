import React, { ReactNode, HTMLProps } from "react";
import styled, { CSSProperties } from "styled-components";

import LoadingSpinner from "components/Loading";
import {
  green50,
  green500,
  green600,
  grey50,
  grey500,
  white,
} from "config/styles";

type ButtonType = "primary" | "ghost";
interface StyledButtonProps {
  variant: ButtonType;
  style?: CSSProperties & { "&:hover": object };
}

const primaryButtonStyle = {
  outline: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  backgroundColor: green500,
  border: "none",
  borderRadius: "8px",
  color: green50,
  padding: "10px",
  width: "200px",
  fontSize: "14px",
  fontWeight: 500,
  fontFamily: "inherit, sans-serif",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: green600,
  },
};

const styles = {
  primary: primaryButtonStyle,
  ghost: {
    ...primaryButtonStyle,
    ...{
      backgroundColor: "#FFFFFF",
      color: grey500,
      border: `2px solid ${grey500}`,
      "&:hover": {
        cursor: "pointer",
        backgroundColor: grey50,
      },
    },
  },
};

const StyledButton = styled.button<StyledButtonProps>(
  ({ variant, style = {} }) => ({
    ...primaryButtonStyle,
    ...styles[variant || "primary"],
    ...style,
    "&:hover": {
      ...primaryButtonStyle["&:hover"],
      ...styles[variant || "primary"]["&:hover"],
      ...(style["&:hover"] || {}),
    },
  })
);

const buttonTypeToLoadingColor: { [key in ButtonType]: string } = {
  ghost: grey500,
  primary: white,
};
const Button = ({
  children,
  loading = false,
  variant = "primary",
  ...rest
}: {
  children: ReactNode;
  loading?: boolean;
  variant?: ButtonType;
  fullWidth?: boolean;
  style?: { [x: string]: string | number | {} };
} & HTMLProps<HTMLButtonElement>) => (
  //@ts-ignore
  <StyledButton variant={variant} {...rest}>
    <>
      {loading && <LoadingSpinner color={buttonTypeToLoadingColor[variant]} />}
      {!loading && children}
    </>
  </StyledButton>
);

export default Button;

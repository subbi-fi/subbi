import styled, { CSSProperties } from "styled-components";

interface StyledButtonProps {
  variant?: "primary" | "ghost";
  style?: CSSProperties & { "&:hover": object };
}

const primaryButtonStyle = {
  outline: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  backgroundColor: "#2AD167",
  border: "none",
  borderRadius: "8px",
  color: "#F4FDF7",
  padding: "10px",
  width: "200px",
  fontSize: "14px",
  fontWeight: 500,
  fontFamily: "inherit, sans-serif",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#26BC5E",
  },
};

const styles = {
  primary: primaryButtonStyle,
  ghost: {
    ...primaryButtonStyle,
    ...{
      backgroundColor: "#FFFFFF",
      color: "#556987",
      border: "2px solid #556987",
      "&:hover": {
        cursor: "pointer",
        backgroundColor: "#F7F8F9",
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

export default StyledButton;

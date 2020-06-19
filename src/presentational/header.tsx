import React from "react";

const style_div: React.CSSProperties = {
  backgroundColor: "gray",
  textAlign: "center",
};

const style_text: React.CSSProperties = {
  color: "#212529",
  fontSize: "4rem",
  padding: "2rem 0",
};

export interface HeaderProps {}
const Header: React.SFC<HeaderProps> = () => {
  return (
    <div style={style_div}>
      <div style={style_text}>Space Launches Now</div>
    </div>
  );
};

export default Header;

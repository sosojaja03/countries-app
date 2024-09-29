import React, { ReactNode } from "react";
import { Header } from "../../header";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      {/* You can add a Footer component here if needed */}
    </div>
  );
};

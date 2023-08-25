import React from "react";
import { AppShell } from "@mantine/core";
import { NavbarComponent } from "./NavBar";
import { HeaderComponent } from "./Header";

interface AppShellProps {
  children: React.ReactNode;
}

export const CustomAppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <AppShell
      padding={0}
      header={<HeaderComponent />}
      navbar={<NavbarComponent />}
      styles={{
        main: {
          backgroundColor: "white",
          width: "100%",
        },
      }}
      asideOffsetBreakpoint="sm"
      navbarOffsetBreakpoint="sm"
    >
      {children}
    </AppShell>
  );
};

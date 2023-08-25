import React from "react";
import { AppShell, useMantineTheme } from "@mantine/core";
import { NavbarComponent } from "./NavBar";
import { HeaderComponent } from "./Header";

interface AppShellProps {
  children: React.ReactNode;
}

export const CustomAppShell: React.FC<AppShellProps> = ({ children }) => {
  const theme = useMantineTheme();
  return (
    <AppShell
      padding={0}
      header={<HeaderComponent />}
      navbar={<NavbarComponent />}
      styles={{
        main: {
          background: theme.colors.gray[0],
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

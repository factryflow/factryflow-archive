import React from "react";
import { AppShell } from "@mantine/core";
import { NavbarComponent } from "./NavBar";
import { HeaderComponent } from "./Header";

interface AppShellProps {
  children: React.ReactNode;
}

export const CustomAppShell: React.FC<AppShellProps> = () => {
  return (
    <AppShell
      padding="md"
      navbar={<NavbarComponent />}
      header={<HeaderComponent />}
      styles={{
        main: {
          backgroundColor: "white",
        },
      }}
    >
      {}
    </AppShell>
  );
};

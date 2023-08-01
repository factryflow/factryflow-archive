import React from "react";
import { AppShell as MantineAppShell, useMantineTheme } from "@mantine/core";
import NavbarComponent from "./NavBar";
import HeaderComponent from "./Header";

// define the type of props that your component will receive
interface AppShellProps {
  children: React.ReactNode;
}

// const MyAppShell: React.FC<MyAppShellProps> = ({ children }) => {
const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = React.useState(false);

  return (
    <MantineAppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<NavbarComponent opened={opened} />}
      header={<HeaderComponent opened={opened} setOpened={setOpened} />}
    >
      {children}
    </MantineAppShell>
  );
};

export default AppShell;

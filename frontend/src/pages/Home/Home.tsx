import AppShell from "../../components/Appshell/AppShell";

import { MantineProvider } from "@mantine/core";
import { SpotlightProvider } from "@mantine/spotlight";
import type { SpotlightAction } from "@mantine/spotlight";
import {
  IconHome,
  IconDashboard,
  IconFileText,
  IconSearch,
} from "@tabler/icons-react";
import Table from "../../components/Tables/Table";

const actions: SpotlightAction[] = [
  {
    title: "Home",
    description: "Get to home page",
    onTrigger: () => console.log("Home"),
    icon: <IconHome size="1.2rem" />,
  },
  {
    title: "Dashboard",
    description: "Get full information about current system status",
    onTrigger: () => console.log("Dashboard"),
    icon: <IconDashboard size="1.2rem" />,
  },
  {
    title: "Documentation",
    description: "Visit documentation to lean more about all features",
    onTrigger: () => console.log("Documentation"),
    icon: <IconFileText size="1.2rem" />,
  },
];

function Home() {
  return (
    <MantineProvider>
      <SpotlightProvider
        actions={actions}
        searchIcon={<IconSearch size="1.2rem" />}
        searchPlaceholder="Search..."
        shortcut={["mod + P", "mod + K", "/"]}
        nothingFoundMessage="Nothing found..."
      >
        <AppShell>
          <Table />
        </AppShell>
      </SpotlightProvider>
    </MantineProvider>
  );
}

export default Home;

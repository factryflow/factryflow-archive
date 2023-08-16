import { Box, Navbar, Title } from "@mantine/core";
import { NavBarLinks } from "./NavBarLinks";
import { User } from "./_user";

interface NavbarProps {
  opened: boolean;
}

const NavbarComponent: React.FC<NavbarProps> = ({ opened }) => {
  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 250 }}>
      <Box
        sx={(theme) => ({
          display: "block",
          width: "100%",
          paddingLeft: theme.spacing.xs,
        })}
      >
        <Title order={6} color="dark.3">
          Dashboards
        </Title>
      </Box>
      <Navbar.Section grow mt="xs">
        <NavBarLinks />
      </Navbar.Section>
      <Navbar.Section>
        <User />
      </Navbar.Section>
    </Navbar>
  );
};
export default NavbarComponent;

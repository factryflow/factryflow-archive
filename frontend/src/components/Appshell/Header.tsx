import { Header, MediaQuery, useMantineTheme, Title } from "@mantine/core";
import { Burger } from "@mantine/core";
import { CustomHeaderControls } from "./CustomHeaderControls"; // Make sure this path points to your CustomHeaderControls component
import { openSpotlight } from "@mantine/spotlight";
// Define the interface for props
interface HeaderProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderComponent: React.FC<HeaderProps> = ({ opened, setOpened }) => {
  const theme = useMantineTheme();

  // Define the required functions for CustomHeaderControls

  return (
    <Header height={{ base: 50 }} p="md">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Title order={5} align="left" variant="gradient">
              PRODUCTION SCHEDULER
            </Title>
          </MediaQuery>
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </MediaQuery>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Title order={5} align="left" variant="gradient">
              PRODUCTION SCHEDULER
            </Title>
          </MediaQuery>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <CustomHeaderControls
              onSearch={openSpotlight}
              githubLink="https://github.com/Yacobolo/chartizard"
            />
          </MediaQuery>
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;

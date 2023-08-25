import {
  createStyles,
  Header,
  Group,
  Burger,
  Container,
  Title,
  Autocomplete,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { GithubIcon } from "@mantine/ds";
import { IconSettingsBolt } from "@tabler/icons-react";
import { IconSearch } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: "#4DABF7",
    borderBottom: 0,
    margin: 0,
    padding: 0,

    color: "#E3FAFC",
  },

  inner: {
    height: rem(56),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  input: {
    backgroundColor: "white",
    border: "none",
  },
  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.white,
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      ),
    },
  },

  title: {
    justifyContent: "flex-start",
  },

  rightSide: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  search: {
    [theme.fn.smallerThan("md")]: {
      background: "white",
      display: "none",
    },
  },

  linkGithub: {
    marginLeft: 20,
  },
  linkSettings: {
    marginLeft: 20,
  },
}));

export const HeaderComponent = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  return (
    <Header
      height={56}
      className={classes.header}
      sx={{ zIndex: 1000 }}
      mb={120}
    >
      <Container>
        <div className={classes.inner}>
          <Title size="h5">PRODUCTION SCHEDULER</Title>
          <Group spacing={5} className={classes.links}></Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
            color="#fff"
          />

          <div className={classes.rightSide}>
            <Autocomplete
              classNames={classes}
              placeholder="Search"
              icon={<IconSearch size="1rem" stroke={1.5} />}
              data={[
                "React",
                "Angular",
                "Vue",
                "Next.js",
                "Riot.js",
                "Svelte",
                "Blitz.js",
              ]}
            />
            <GithubIcon className={classes.linkGithub} size="1.1rem" />
            <IconSettingsBolt
              className={classes.linkSettings}
            ></IconSettingsBolt>
          </div>
        </div>
      </Container>
    </Header>
  );
};

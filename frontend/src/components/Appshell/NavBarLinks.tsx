import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";
import * as Icons from "@tabler/icons-react";

interface NavBarLinkProps {
  icon: string;
  color: string;
  label: string;
}

function NavBarLink({ icon, color, label }: NavBarLinkProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  const IconComponent = (Icons as any)[icon] || Icons.IconLayoutBoard;

  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          <IconComponent size="1rem" />
        </ThemeIcon>
        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  {
    icon: "",
    color: "blue",
    label: "Finance Dashboard",
  },
  {
    icon: "IconBrandCashapp",
    color: "teal",
    label: "Open Issues",
  },
  { icon: "IconMessages", color: "violet", label: "Discussions" },
  { icon: "IconDatabase", color: "grape", label: "Databases" },
];

export function NavBarLinks() {
  const links = data.map((link) => <NavBarLink {...link} key={link.label} />);
  return <div>{links}</div>;
}

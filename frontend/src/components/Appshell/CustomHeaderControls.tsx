import { DefaultProps, Group, Tooltip } from "@mantine/core";
import { SearchControl, GithubControl } from "@mantine/ds";

interface CustomHeaderControlsProps extends DefaultProps {
  onSearch(): void;
  githubLink: string;
}

export function CustomHeaderControls({
  onSearch,
  githubLink,
  ...others
}: CustomHeaderControlsProps) {
  return (
    <Tooltip.Group openDelay={600} closeDelay={100}>
      <Group spacing="xs" {...others}>
        <SearchControl onClick={onSearch} />
        <GithubControl link={githubLink} />
      </Group>
    </Tooltip.Group>
  );
}

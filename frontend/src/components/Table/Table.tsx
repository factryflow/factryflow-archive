import {
  createStyles,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { FC } from "react";

interface UsersTableProps {
  data: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    state: string;
  }[];
}
const useStyles = createStyles(() => ({
  table: {
    color: "#212529",
  },
  icons: {
    marginLeft: 4,
  },
  tableTd: {
    borderTop: "1px solid #333 !important",
  },
}));

interface TableTDProps {
  children: JSX.Element;
}
const TableTD: FC<TableTDProps> = ({ children }) => {
  const { classes } = useStyles();
  return <td className={classes.tableTd}>{children}</td>;
};

export function AdminTable({ data }: UsersTableProps) {
  const { classes } = useStyles();
  const rows = data.map((item) => (
    <tr style={{ padding: 0, margin: 0 }} key={item.id}>
      <TableTD>
        <Group spacing="sm">
          <Text fz="sm" fw={500}>
            {item.id}
          </Text>
        </Group>
      </TableTD>
      <TableTD>
        <Group spacing="sm">
          <Text fz="sm" fw={500}>
            {item.firstName}
          </Text>
        </Group>
      </TableTD>
      <TableTD>
        <Group spacing="sm">
          <Text fz="sm" fw={500}>
            {item.lastName}
          </Text>
        </Group>
      </TableTD>
      <TableTD>
        <Anchor component="button" size="sm">
          {item.email}
        </Anchor>
      </TableTD>
      <TableTD>
        <Group spacing="sm">
          <Text fz="sm" fw={500}>
            {item.state}
          </Text>
        </Group>
      </TableTD>

      <TableTD>
        <Group spacing={0} position="right">
          <ActionIcon radius="md" variant="outline">
            <IconPencil size="1rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon className={classes.icons} radius="md" variant="outline">
            <IconTrash size="1rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </TableTD>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table
        className={classes.table}
        sx={{ minWidth: 800 }}
        verticalSpacing="sm"
      >
        <thead
          style={{
            position: "sticky",
            backgroundColor: "#E7F5FF",
            borderBottomColor: "none",
            opacity: 0.9,
          }}
        >
          <tr>
            <th style={{ color: "#339AF0" }}>Id</th>
            <th style={{ color: "#339AF0" }}>First Name</th>
            <th style={{ color: "#339AF0" }}>Last Name</th>
            <th style={{ color: "#339AF0" }}>Email</th>
            <th style={{ color: "#339AF0" }}>State</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

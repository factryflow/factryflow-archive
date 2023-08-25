import { CustomAppShell } from "../../components/Home/AppShell";
import { UsersTable } from "../../components/Table/Table";
export const Home = () => {
  const mockTodoData = [
    {
      id: 1,
      action: "Complete project report",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      state: "Pensilvania",
    },
    {
      id: 2,
      action: "Review presentation slides",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      state: "Ohayo",
    },
    {
      id: 3,
      action: "Send follow-up emails",
      firstName: "Michael",
      lastName: "Johnson",
      email: "michael@example.com",
      state: "Ohayo",
    },

    {
      id: 4,
      action: "Prepare meeting agenda",
      firstName: "Emily",
      lastName: "Williams",
      email: "emily@example.com",
      state: "Ohayo",
    },
    {
      id: 4,
      action: "Prepare meeting agenda",
      firstName: "Emily",
      lastName: "Williams",
      email: "emily@example.com",
      state: "Ohayo",
    },
    {
      id: 4,
      action: "Prepare meeting agenda",
      firstName: "Emily",
      lastName: "Williams",
      email: "emily@example.com",
      state: "Ohayo",
    },
    {
      id: 4,
      action: "Prepare meeting agenda",
      firstName: "Emily",
      lastName: "Williams",
      email: "emily@example.com",
      state: "Ohayo",
    },
    {
      id: 4,
      action: "Prepare meeting agenda",
      firstName: "Emily",
      lastName: "Williams",
      email: "emily@example.com",
      state: "Ohayo",
    },
    {
      id: 4,
      action: "Prepare meeting agenda",
      firstName: "Emily",
      lastName: "Williams",
      email: "emily@example.com",
      state: "Ohayo",
    },
    {
      id: 4,
      action: "Prepare meeting agenda",
      firstName: "Emily",
      lastName: "Williams",
      email: "emily@example.com",
      state: "Ohayo",
    },
    {
      id: 4,
      action: "Prepare meeting agenda",
      firstName: "Emily",
      lastName: "Williams",
      email: "emily@example.com",
      state: "Ohayo",
    },
    {
      id: 4,
      action: "Prepare meeting agenda",
      firstName: "Emily",
      lastName: "Williams",
      email: "emily@example.com",
      state: "Ohayo",
    },
    {
      id: 4,
      action: "Prepare meeting agenda",
      firstName: "Emily",
      lastName: "Williams",
      email: "emily@example.com",
      state: "Ohayo",
    },
    {
      id: 4,
      action: "Prepare meeting agenda",
      firstName: "Emily",
      lastName: "Williams",
      email: "emily@example.com",
      state: "Ohayo",
    },
    {
      id: 4,
      action: "Prepare meeting agenda",
      firstName: "Emily",
      lastName: "Williams",
      email: "emily@example.com",
      state: "Ohayo",
    },
    {
      id: 4,
      action: "Prepare meeting agenda",
      firstName: "Emily",
      lastName: "Williams",
      email: "emily@example.com",
      state: "Ohayo",
    },
  ];

  return (
    <CustomAppShell>
      <UsersTable data={mockTodoData} />
    </CustomAppShell>
  );
};

import { Tabs as MantineTabs } from "@mantine/core";
import { getString } from "@/helpers";
import { useState } from "react";
import { Badge } from "@mantine/core";

const List = MantineTabs.List;
const Tab = MantineTabs.Tab;
type BadgeType = {
  [key in string]: string;
};
const useTabs = () => {
  const [activeTab, setActiveTab] = useState<string | null>("all");

  const Tabs = ({
    tabs,
    filterDataWithActiveTab,
    statusCounts,
  }: {
    tabs: string[];
    filterDataWithActiveTab: (e: string) => void;
    statusCounts: any;
  }) => {
    // console.log("alll tabs", tabs);
    const filterStatusRecords = (
      e: React.SyntheticEvent<HTMLButtonElement>,
      tab?: string
    ) => {
      e.preventDefault();

      if (tab) {
        filterDataWithActiveTab(tab);
        setActiveTab(tab);
      }

      return;
    };
    const badgeColor: BadgeType = {
      completed: "green",
      "not-planned": "red",
      planned: "violet",
      progress: "yellow",
    };
    // console.log(statusCounts, "hjhjhhjhjhjjhjhjhjhjhjhjhjhjh");
    // console.log(tabs, "tabsssssssssssss");
    return (
      <MantineTabs defaultValue={activeTab ?? tabs[0]}>
        <List>
          {tabs &&
            tabs?.map((tab, i) => (
              <Tab
                value={tab}
                key={i}
                onClick={(e) => filterStatusRecords(e, tab)}
              >
                {getString(tab)}
                {statusCounts && (
                  <Badge
                    variant="light"
                    size="lg"
                    color={badgeColor[tab]}
                    sx={{ textTransform: "unset", marginLeft: "10px" }}
                  >
                    {statusCounts?.[tab] ?? 0}
                  </Badge>
                )}
              </Tab>
            ))}
        </List>
      </MantineTabs>
    );
  };

  return { Tabs };
};

export default useTabs;

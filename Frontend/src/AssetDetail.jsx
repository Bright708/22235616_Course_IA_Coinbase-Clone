import { ThemeProvider } from "@coinbase/cds-web";
import { SearchInput } from "@coinbase/cds-web/controls";
import { Box, Divider, Group, HStack, VStack } from "@coinbase/cds-web/layout";
import { Sidebar, SidebarItem } from "@coinbase/cds-web/navigation";
import { MediaQueryProvider } from "@coinbase/cds-web/system";
import { defaultTheme } from "@coinbase/cds-web/themes/defaultTheme";
import { useState } from "react";
import { AssetList } from "./Components/AssetList";
import { CardList } from "./Components/CardList";
import { CDSLogo } from "./Components/CDSLogo";
import { Navbar } from "./Components/Navbar";
import Lasthomepagesection from "./Lasthomepagesection";

const navItems = [
  {
    title: "Assets",
    icon: "chartPie",
  },
  {
    title: "Trade",
    icon: "trading",
  },
  {
    title: "Pay",
    icon: "pay",
  },
  {
    title: "For you",
    icon: "newsFeed",
  },
  {
    title: "Earn",
    icon: "giftBox",
  },
  {
    title: "Borrow",
    icon: "cash",
  },
  {
    title: "DeFi",
    icon: "defi",
  },
];

export const AssetDetail = () => {
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [search, setSearch] = useState("");
  const activeNavItem = navItems[activeNavIndex];

  const [activeColorScheme, setActiveColorScheme] = useState("light");

  const toggleColorScheme = () =>
    setActiveColorScheme((s) => (s === "light" ? "dark" : "light"));

  return (
    <MediaQueryProvider>
      <ThemeProvider activeColorScheme={activeColorScheme} theme={defaultTheme}>
        <HStack background="bg">
          <Sidebar autoCollapse height="100vh" logo={<CDSLogo />}>
            {navItems.map(({ title, icon }, index) => (
              <SidebarItem
                key={title}
                active={index === activeNavIndex}
                icon={icon}
                onClick={() => setActiveNavIndex(index)}
                title={title}
              />
            ))}
          </Sidebar>
          <VStack width="100%" zIndex={0}>
            <Navbar
              title={activeNavItem.title}
              toggleColorScheme={toggleColorScheme}
            />
            <Group
              direction={{ base: "vertical", desktop: "horizontal" }}
              divider={() => (
                <Divider
                  direction={{ base: "horizontal", desktop: "vertical" }}
                />
              )}
              width="100%"
            >
              <VStack
                width={{
                  base: "100%",
                  tablet: "100%",
                  desktop: 660,
                  wide: 700,
                }}
                gap={4}
              >
                <Box padding={2} width="100%">
                  <SearchInput
                    compact
                    accessibilityLabel="Search"
                    onChangeText={setSearch}
                    placeholder="Search"
                    value={search}
                  />
                </Box>
                <Box paddingX={2} width="100%">
                  <AssetList pageSize={5} />
                </Box>
              </VStack>
              <Box
                paddingX={{ base: 2, tablet: 3 }}
                paddingY={2}
                width={{ base: "100%", desktop: "auto" }}
              >
                <CardList />
              </Box>
            </Group>
          </VStack>
        </HStack>
      </ThemeProvider>
      <Lasthomepagesection />
    </MediaQueryProvider>
  );
};

export default AssetDetail;

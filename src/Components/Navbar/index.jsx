import { IconButton } from "@coinbase/cds-web/buttons";
import { SearchInput } from "@coinbase/cds-web/controls";
import { Icon } from "@coinbase/cds-web/icons";
import { useState } from "react";

export const Navbar = ({ title, toggleColorScheme }) => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      <div className="flex items-center gap-3">
        <SearchInput
          accessibilityLabel="Search"
          onChangeText={setSearch}
          placeholder="Search"
          value={search}
        />
        <IconButton
          icon={<Icon name={toggleColorScheme ? "moon" : "sun"} size="m" />}
          onClick={toggleColorScheme}
          maxwidth={142}
          title="Toggle theme"
          variant="primary"
        />
      </div>
    </div>
  );
};

export default Navbar;

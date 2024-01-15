import { useState, MouseEvent } from "react";
import { usersData } from "../utils/Users";
import SelectedUsers from "./SelectedUsers";
import FilteredUsers from "./FilteredUsers";

const Dashboard = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [filterValue, setFilterValue] = useState<string>("");
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const filteredUsers = usersData.filter(
    (user) =>
      user.name.toLowerCase().includes(filterValue.toLowerCase()) &&
      !selectedChips.includes(user.name)
  );

  const handleChipClick = (value: string) => {
    setSelectedChips([...selectedChips, value]);
    setFilterValue("");
  };

  const handleChipDelete = (e: MouseEvent, value: string) => {
    e.preventDefault();
    setSelectedChips(selectedChips.filter((chip) => chip !== value));
  };

  const handleSuggestionClick = (e: MouseEvent, value: string) => {
    e.preventDefault();
    handleChipClick(value);
  };

  return (
    <div className="relative mx-auto mt-10 w-4/5 md:max-w-lg lg:max-w-2xl">
      <div className="flex flex-col items-center">
        <div className="m-2">
          {selectedChips.length > 0 && (
            <SelectedUsers
              selectedChips={selectedChips}
              handleChipDelete={handleChipDelete}
            />
          )}
        </div>
        <div className="flex flex-row py-3 px-10 border-2 border-gray-200 rounded-full">
          <input
            placeholder="Invite collaborators..."
            type="text"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="outline-none"
          />
        </div>
        {isFocused && (
          <FilteredUsers
            filteredUsers={filteredUsers}
            handleSuggestionClick={handleSuggestionClick}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;

import { useState, MouseEvent } from "react";
import { usersData } from "../utils/Users";
import SelectedUsers from "./SelectedUsers";
import FilteredUsers from "./FilteredUsers";

const Dashboard = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [filterValue, setFilterValue] = useState<string>("");
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [readyToDelete, setReadyToDelete] = useState(false);

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
    setReadyToDelete(false);
    e.preventDefault();
    handleChipClick(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (readyToDelete) {
      const newArray = selectedChips.slice(0, -1);
      setSelectedChips(newArray);
    }
    if (e.key == "Backspace") {
      setReadyToDelete(true);
    }
  };

  return (
    <div className="relative mx-auto mt-10 w-4/5 md:max-w-lg lg:max-w-2xl">
      <div className="flex flex-col items-center">
        <div className="m-2">
          {selectedChips.length > 0 && (
            <SelectedUsers
              selectedChips={selectedChips}
              handleChipDelete={handleChipDelete}
              readyToDelete={readyToDelete}
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
            onChange={(e) => {
              setFilterValue(e.target.value);
              setReadyToDelete(false);
            }}
            onKeyDown={handleKeyDown}
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

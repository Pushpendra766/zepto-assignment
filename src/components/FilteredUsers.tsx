import { UserTypes } from "../utils/Users";
import colors from "../utils/Colors";

// Filtered users component
const FilteredUsers = ({
  filteredUsers,
  handleSuggestionClick,
}: {
  filteredUsers: UserTypes[];
  handleSuggestionClick: Function;
}) => {
  return (
    <ul className="top-full bg-gray-100 py-2 rounded-b-md">
      {filteredUsers.length > 0 &&
        filteredUsers.map((user, index) => (
          <>
            {" "}
            <li
              key={index}
              onMouseDown={(e) => handleSuggestionClick(e, user.name)}
              className="text-sm cursor-pointer px-4 py-3 hover:bg-gray-200"
            >
              <span
                className={
                  "text-white py-2 px-3 rounded-full mr-2 font-semibold " +
                  colors[index]
                }
              >
                {user.name[0]}
              </span>
              {user.name}{" "}
              <span className="text-xs text-gray-500 ml-4">{user.email}</span>
            </li>
            <hr />
          </>
        ))}
      {!filteredUsers.length && (
        <p className="text-gray-500 font-semibold px-2">No one to invite</p>
      )}
    </ul>
  );
};

export default FilteredUsers;

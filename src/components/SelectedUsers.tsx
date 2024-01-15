import colors from "../utils/Colors";

const SelectedUsers = ({
  selectedChips,
  handleChipDelete,
}: {
  selectedChips: string[];
  handleChipDelete: Function;
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {selectedChips.map((chip, index) => (
        <p
          key={index}
          className="bg-gray-200 rounded-full hover:bg-gray-400/70 pr-2 cursor-default py-1"
        >
          <span
            className={
              "text-white py-1.5 px-2.5 rounded-full mr-2 font-semibold " +
              colors[index]
            }
          >
            {chip[0]}
          </span>
          {chip}{" "}
          <button
            className="text-red-600 font-bold"
            onMouseDown={(e) => handleChipDelete(e, chip)}
          >
            &#10005;
          </button>
        </p>
      ))}
    </div>
  );
};

export default SelectedUsers;

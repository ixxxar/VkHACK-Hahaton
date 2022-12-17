import { Icon20Cancel } from "@vkontakte/icons";
import { Button } from "@vkontakte/vkui";

const FilterButton = ({ name }) => {
  return (
    <Button
      className="filterButton"
      appearance="accent"
      size="s"
      after={<Icon20Cancel />}
    >
      {name}
    </Button>
  );
};

export default FilterButton;

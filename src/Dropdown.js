import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function DestinationDropdown() {
  return (
    <DropdownButton id="destination-dropdown" title="Destination">
      <Dropdown.Item>Station 1</Dropdown.Item>
      <Dropdown.Item>Station 2</Dropdown.Item>
    </DropdownButton>
  );
}

export default DestinationDropdown;
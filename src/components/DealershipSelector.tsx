import { useState } from "react";
import Select, { ActionMeta, MultiValue } from "react-select";
import  NoSSR  from "react-no-ssr";
import { Option } from "@/typescript/interfaces";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import AlertMessage from "./AlertMessage";

interface DealershipSelectorProps {
  dealerships: Option[];
  selectedDealerships: Option[];
  setSelectedDealerships: (options: Option[]) => void;
}

const DealershipSelector = ({ dealerships, selectedDealerships, setSelectedDealerships }: DealershipSelectorProps) => {

  const maxWidth = useBreakpointValue({ base: "300px", md: "500px" });
  const [showAlert, setShowAlert] = useState(false);

  const handleSelectedDealershipsChange = (
    newValue: MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => {
    // Ensure newValue is an array of Option
    const selectedOptions = newValue as Option[];
    
    // Limit selection to 3 options
    if (selectedOptions.length <= 3) {
      setSelectedDealerships(selectedOptions);
      setShowAlert(false); // Hide alert if selections are valid
    } else {
      // Show alert if more than 3 selections are attempted
      setShowAlert(true);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" w="auto" p="10px">
      <NoSSR>
        <Select
          isMulti
          isClearable
          options={dealerships}
          onChange={handleSelectedDealershipsChange}
          value={selectedDealerships}
          placeholder="First select at least one dealership"
          id="dealership-selector"
          styles={{
            control: (provided) => ({
              ...provided,
              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
              borderColor: '#E2E2E2',
              borderRadius: '10px',
              transition: 'transform 0.3s ease',
              width: '100%', 
              maxWidth: maxWidth,
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }),
            menu: (provided) => ({
              ...provided,
              width: '100%',
              maxWidth: maxWidth,
            }),
          }}
        />
      </NoSSR>
      <AlertMessage showAlert={showAlert} maxWidth={maxWidth} />
    </Box>
  );
};

export default DealershipSelector;

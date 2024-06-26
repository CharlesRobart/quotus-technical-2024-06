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
  const fontSize = useBreakpointValue({ base: "12px", md: "16px" });
  const [showAlert, setShowAlert] = useState(false);

  const handleSelectedDealershipsChange = (
    newValue: MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => {
    const selectedOptions = newValue as Option[];
    
    // Limit selection to 3 options
    if (selectedOptions.length <= 3) {
      setSelectedDealerships(selectedOptions);
      setShowAlert(false); 
    } else {
      setShowAlert(true);
    }
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      w="auto" 
      maxWidth="100%" 
      p="10px"
      >
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
              width: selectedDealerships.length > 1 ? '100%' : maxWidth, 
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }),
            menu: (provided) => ({
              ...provided,
              width: '100%',
              maxWidth: maxWidth,
            }),
            multiValue: (provided) => ({
              ...provided,
              fontSize: fontSize, // Apply font size based on screen size
            }),
            singleValue: (provided) => ({
              ...provided,
              fontSize: fontSize, // Apply font size based on screen size
            }),
            placeholder: (provided) => ({
              ...provided,
              fontSize: fontSize, // Apply font size based on screen size
            }),
          }}
        />
      </NoSSR>
      <AlertMessage showAlert={showAlert} maxWidth={maxWidth} />
    </Box>
  );
};

export default DealershipSelector;

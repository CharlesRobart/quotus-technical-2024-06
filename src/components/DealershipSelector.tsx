import Select from "react-select";
import  NoSSR  from "react-no-ssr";
import { Option } from "@/typescript/interfaces";
import { Box } from "@chakra-ui/react";

interface DealershipSelectorProps {
  dealerships: Option[];
  selectedDealerships: Option[];
  setSelectedDealerships: (options: Option[]) => void;
}

const DealershipSelector = ({ dealerships, selectedDealerships, setSelectedDealerships }: DealershipSelectorProps) => (
  <Box display="flex" justifyContent="center" alignItems="center" w="100%" h="100%" >
    <Box display="flex" justifyContent="center" alignItems="center" w="auto" p="10px">
      <NoSSR>
        <Select
          isMulti
          isClearable
          options={dealerships}
          onChange={(selectedOptions) => setSelectedDealerships(selectedOptions as Option[])}
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
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }),
          }}
        />
      </NoSSR>
    </Box>
  </Box>
);

export default DealershipSelector;

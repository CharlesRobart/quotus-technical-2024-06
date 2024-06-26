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
    <Box display="flex" justifyContent="center" alignItems="center" w="auto" p="10px" my="10px" backgroundColor="white" border="1px solid #E2E2E2" borderRadius="10" boxShadow="2px 2px 5px rgba(0, 0, 0, 0.1)">
      <NoSSR>
        <Select
          isMulti
          isClearable
          options={dealerships}
          onChange={(selectedOptions) => setSelectedDealerships(selectedOptions as Option[])}
          value={selectedDealerships}
          placeholder="First select at least one dealership"
          id="dealership-selector"
        />
      </NoSSR>
    </Box>
  </Box>
);

export default DealershipSelector;

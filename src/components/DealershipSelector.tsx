import Select from "react-select";
import  NoSSR  from "react-no-ssr";
import { Option } from "@/typescript/interfaces";

interface DealershipSelectorProps {
  dealerships: Option[];
  selectedDealerships: Option[];
  setSelectedDealerships: (options: Option[]) => void;
}

const DealershipSelector = ({ dealerships, selectedDealerships, setSelectedDealerships }: DealershipSelectorProps) => (
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
);

export default DealershipSelector;

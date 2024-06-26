import React from 'react';
import NoSSR from 'react-no-ssr';
import Select from 'react-select';
import type { Option } from "@/typescript/interfaces";
import { getReactSelectOptionsFromGroupedKpis } from "@utils/helper";

interface GroupByFormatAndFirstWordSelectorProps {
  groupedByFormatAndFirstWord: Record<string, any>;
  selectedKpiFormatAndFirstWordGroup: Option | undefined;
  setSelectedKpiFormatAndFirstWordGroup: (option: Option) => void;
}

const GroupByFormatAndFirstWordSelector: React.FC<GroupByFormatAndFirstWordSelectorProps> = ({
  groupedByFormatAndFirstWord,
  selectedKpiFormatAndFirstWordGroup,
  setSelectedKpiFormatAndFirstWordGroup,
}) => {

  return (
    <NoSSR>
      <Select
        options={getReactSelectOptionsFromGroupedKpis(groupedByFormatAndFirstWord)}
        onChange={(selectedOption) => {
          setSelectedKpiFormatAndFirstWordGroup(selectedOption as Option);
        }}
        placeholder="Select Kpi By Format And First Word Group "
        value={selectedKpiFormatAndFirstWordGroup}
        id="kpi-by-format-and-first-word-group"
        styles={{
          control: (base) => ({
            ...base,
            width: "auto",
            backgroundColor: "white",
            fontSize: "16px",
            borderColor: "#091646",
            hover: {
              borderColor: "darkblue",
            },
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? "blue" : "white",
            color: state.isSelected ? "white" : "black",
            padding: 20,
          }),
          placeholder: (base) => ({
            ...base,
            fontSize: "10px", 
          }),
        }}
      />
    </NoSSR>
  );
};

export default GroupByFormatAndFirstWordSelector;

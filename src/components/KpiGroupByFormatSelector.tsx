// components/KpiGroupByFormatSelector.tsx
import React from 'react';
import NoSSR from 'react-no-ssr';
import Select from 'react-select';
import type { Option } from "@/typescript/interfaces";
import { getReactSelectOptionsFromGroupedKpis } from "@utils/helper";

interface KpiGroupByFormatSelectorProps {
  groupedByFormat: Record<string, any>;
  selectedKpiFormatGroup: Option | undefined;
  setSelectedKpiFormatGroup: (option: Option) => void;
}

const KpiGroupByFormatSelector: React.FC<KpiGroupByFormatSelectorProps> = ({
  groupedByFormat,
  selectedKpiFormatGroup,
  setSelectedKpiFormatGroup,
}) => {
  return (
    <NoSSR>
      <Select
        options={getReactSelectOptionsFromGroupedKpis(groupedByFormat)}
        onChange={(selectedOption) => {
          setSelectedKpiFormatGroup(selectedOption as Option);
        }}
        placeholder="Select Kpi By Format Group for the Bar Chart"
        value={selectedKpiFormatGroup}
        id="kpi-by-format-group"
      />
    </NoSSR>
  );
};

export default KpiGroupByFormatSelector;

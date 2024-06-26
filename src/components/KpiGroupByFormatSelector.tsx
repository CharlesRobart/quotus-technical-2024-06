import React from 'react';
import { Button, ButtonGroup, Flex } from '@chakra-ui/react';
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
  const options = getReactSelectOptionsFromGroupedKpis(groupedByFormat);

  return (
    <Flex justifyContent="end" alignItems="center" w="100%" mb={2}>
      <ButtonGroup flex="1" justifyContent="flex-end">
        {options.map((option) => (
          <Button
            key={option.value}
            onClick={() => setSelectedKpiFormatGroup(option)}
            colorScheme={selectedKpiFormatGroup?.value === option.value ? 'blue' : 'gray'}
            size="sm"
          >
            {option.label}
          </Button>
        ))}
      </ButtonGroup>
    </Flex>
    
  );
};

export default KpiGroupByFormatSelector;

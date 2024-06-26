import React, { useState } from 'react';
import {
  IconButton,
  useDisclosure,
  Box
} from '@chakra-ui/react';
import { FaFilter } from 'react-icons/fa';
import type { Option } from "@/typescript/interfaces";
import KpiModal from './kpimodaltable';

interface KpiSelectorProps {
  kpis: Option[];
  selectedKpis: Option[];
  setSelectedKpis: (options: Option[]) => void;
}

const KpiSelector = ({ kpis, selectedKpis, setSelectedKpis }: KpiSelectorProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tempSelectedKpis, setTempSelectedKpis] = useState<Option[]>(selectedKpis);

  const handleSave = () => {
    setSelectedKpis(tempSelectedKpis);
    onClose();
  };

  const handleToggleOption = (option: Option) => {
    const isSelected = tempSelectedKpis.some(selected => selected.value === option.value);
    const newSelectedKpis = isSelected
      ? tempSelectedKpis.filter(selected => selected.value !== option.value)
      : [...tempSelectedKpis, option];
    setTempSelectedKpis(newSelectedKpis);
  };

  return (
    <Box display="flex" justifyContent="end" mb={1}>
      <IconButton
        icon={<FaFilter />}
        aria-label="Filter KPIs"
        onClick={onOpen}
        variant="outline"
      />
      <KpiModal
        isOpen={isOpen}
        onClose={onClose}
        kpis={kpis}
        tempSelectedKpis={tempSelectedKpis}
        handleToggleOption={handleToggleOption}
        handleSave={handleSave}
      />
    </Box>
  );
};

export default KpiSelector;

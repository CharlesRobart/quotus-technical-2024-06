import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Checkbox,
  CheckboxGroup,
  Stack,
  IconButton,
  useDisclosure,
  Box
} from '@chakra-ui/react';
import { FaFilter } from 'react-icons/fa';
import type { Option } from "@/typescript/interfaces";

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
    <Box>
      <IconButton
        icon={<FaFilter />}
        aria-label="Filter KPIs"
        onClick={onOpen}
        variant="outline"
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select KPIs</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CheckboxGroup>
              <Stack>
                {kpis.map((option) => (
                  <Checkbox
                    key={option.value}
                    isChecked={tempSelectedKpis.some(selected => selected.value === option.value)}
                    onChange={() => handleToggleOption(option)}
                  >
                    {option.label}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default KpiSelector;

import React from 'react';
import {
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
  Button,
} from '@chakra-ui/react';
import type { Option } from "@/typescript/interfaces";

interface KpiModalProps {
  isOpen: boolean;
  onClose: () => void;
  kpis: Option[];
  tempSelectedKpis: Option[];
  handleToggleOption: (option: Option) => void;
  handleSave: () => void;
}

const KpiModal: React.FC<KpiModalProps> = ({
  isOpen,
  onClose,
  kpis,
  tempSelectedKpis,
  handleToggleOption,
  handleSave,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select KPIs</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CheckboxGroup>
            <Stack spacing={2}>
              {kpis.map((option) => (
                <Checkbox
                  key={option.value}
                  isChecked={tempSelectedKpis.some((selected) => selected.value === option.value)}
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
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default KpiModal;

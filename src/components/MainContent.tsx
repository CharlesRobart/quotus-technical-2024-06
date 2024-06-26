import { Box, Flex, HStack, Heading, IconButton, Text } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import type { Option } from "@/typescript/interfaces";
import DealershipSelector from "./DealershipSelector";

interface MainContentProps {
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
    dealerships: Option[];
    selectedDealerships: Option[];
    setSelectedDealerships: (selected: Option[]) => void;
  }

const MainContent = ({ 
  children, 
  isOpen, 
  onToggle,
  dealerships,
  selectedDealerships,
  setSelectedDealerships, 
}: MainContentProps) => {

  return (
    <Box>
      <Flex alignItems="center" h="70px" p={2}>
        <HStack >
          <IconButton
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={onToggle}
            aria-label="Toggle Sidebar"
          />
          <Heading w="400px">Quotus Technical</Heading>
        </HStack>
        <DealershipSelector
            dealerships={dealerships}
            selectedDealerships={selectedDealerships}
            setSelectedDealerships={setSelectedDealerships}
          />
        </Flex>
      {children}
    </Box>
  );
};

export default MainContent;

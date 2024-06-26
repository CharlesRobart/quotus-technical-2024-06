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
      <Flex 
        alignItems={{ base: "center", md: "center" }}
        justifyContent={{ base: "center", md: "space-between" }}
        direction={{ base: "column", md: "row" }}
        flexWrap="wrap" 
        h="auto" 
        p={2} 
        w="100%"
        >
        <HStack 
          w={{ base: "100%", md: "auto" }}
          justifyContent={{ base: "space-between", md: "flex-start" }}
          alignItems="center"
          >
          <IconButton
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={onToggle}
            aria-label="Toggle Sidebar"
          />
          <Heading w={{ base: "100%", md: "400px" }} textAlign={{ base: "center", md: "left" }}>Quotus Technical</Heading>
        </HStack>
        <Flex flex="1" justifyContent="center">
          <DealershipSelector
              dealerships={dealerships}
              selectedDealerships={selectedDealerships}
              setSelectedDealerships={setSelectedDealerships}
            />
        </Flex>
      </Flex>
      {children}
    </Box>
  );
};

export default MainContent;

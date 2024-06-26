import { Box, HStack, Heading, IconButton, Text } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";

interface MainContentProps {
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
  }

const MainContent = ({ children, isOpen, onToggle }: MainContentProps) => {

  return (
    <Box>
      <HStack mb="20px">
        <IconButton
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={onToggle}
          aria-label="Toggle Sidebar"
        />
        <Heading>Quotus Technical</Heading>
      </HStack>
      {children}
    </Box>
  );
};

export default MainContent;

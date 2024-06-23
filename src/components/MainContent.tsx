import { Box, HStack, Heading, IconButton, Text } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";

interface MainContentProps {
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
  }

const MainContent = ({ children, isOpen, onToggle }: MainContentProps) => {

  const introductionMessage = `
    Welcome to the Quotus Technical test. This landing page is designed to test your creativity and ability to create a visually appealing and user-friendly interface. The current setup includes basic implementations of react-select, react-table, and chartjs (with rechart) to give you an idea of the existing functionality.

    Feel free to use these libraries or replace them with any other library or dependency you prefer. The goal is to transform this unstyled page into a modern, aesthetically pleasing UI that demonstrates your design skills and attention to UX.

    The graphs, tables, and selectors are provided as examples. You are encouraged to modify, replace, or remove them as you see fit. The data included is mock data, replicating what we actually have in the app, providing a realistic environment for your work.

    This is your sandbox—make it your own. Management will focus on the visual style, while I will give a slight emphasis on code organization, as I already assume you have the necessary React knowledge.

    Good luck, and have fun!
    `;
  return (
    <Box>
      <HStack>
        <IconButton
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={onToggle}
          aria-label="Toggle Sidebar"
        />
        <Heading>Quotus Technical</Heading>
      </HStack>
      <Text as="b">{introductionMessage}</Text>
      {children}
    </Box>
  );
};

export default MainContent;

import { Box, Heading, VStack } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

interface SideNavProps {
  isOpen: boolean;
  onToggle: () => void;
  sidenavWidth: string;
  sidenavTransition: string;
}

const SideNav = ({ isOpen, onToggle, sidenavWidth, sidenavTransition }: SideNavProps) => (
  <Box width={sidenavWidth} transition={sidenavTransition} overflow="hidden">
    <Box p="4" bg="gray.100" height="100%">
      <Heading size="md" mb="4">
        Menu
      </Heading>
      <VStack align="start">
        <Link href="/">Dashboard</Link>
      </VStack>
    </Box>
  </Box>
);

export default SideNav;

import { Box, Heading, VStack } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

interface SideNavProps {
  isOpen: boolean;
  onToggle: () => void;
  sidenavWidth: string;
  sidenavTransition: string;
}

const linkStyles = {
  _hover: {
    fontWeight: "bold",
    transform: "scale(1.05)", 
  },
};

const SideNav = ({ isOpen, onToggle, sidenavWidth, sidenavTransition }: SideNavProps) => (
  <Box width={sidenavWidth} minW={sidenavWidth} transition={sidenavTransition} overflow="hidden">
    <Box p="4" bg="gray.100" height="100%">
      <Heading size="lg" mb="4">
        Menu
      </Heading>
      <VStack align="start">
        <Link href="/" {...linkStyles}>Dashboard</Link>
        <Link href="/" {...linkStyles}>Profil</Link>
        <Link href="/" {...linkStyles}>Settings</Link>
      </VStack>
    </Box>
  </Box>
);

export default SideNav;

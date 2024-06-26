import { useEffect, useState } from "react";
import { Alert, AlertIcon, Flex } from "@chakra-ui/react";


interface AlertMessageProps {
  showAlert: boolean;
  maxWidth: string | undefined;
  onHide?: () => void;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ showAlert, maxWidth, onHide }) => {
    const [visible, setVisible] = useState(showAlert);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (showAlert) {
        setVisible(true);

        timer = setTimeout(() => {
            setVisible(false);
            if (onHide) {
                onHide();
              }
        }, 5000); 
        } else {
        setVisible(false);
        }

        return () => clearTimeout(timer);
    }, [showAlert, onHide]);

    if (!visible) {
        return null;
    }

  return (
    <Flex position="absolute" top="4" right="4">
      <Alert status="warning" maxWidth={maxWidth} borderRadius="md">
        <AlertIcon />
        You can select up to 3 dealerships.
      </Alert>
    </Flex>
  );
};

export default AlertMessage;

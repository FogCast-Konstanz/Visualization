import { Box, Button, HStack, Icon, Slide, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCookieBite  } from "react-icons/fa";

export default function CookieBanner() {
    const { t } = useTranslation();

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasAccepted = localStorage.getItem("cookieConsent");
        if (!hasAccepted) {
            setIsOpen(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookieConsent", "true");
        setIsOpen(false);
    };

    return (
        <Slide direction="bottom" in={isOpen} style={{ zIndex: 1000 }}>
            <Box p={4}
                bg={useColorModeValue('custom_light.background', 'custom_dark.background')}
                color={useColorModeValue('custom_light.text', 'custom_dark.text')}
                textAlign="center"
                marginInline={'20%'}
                borderRadius={'5px'}
                mb={'10px'}
                >

                <HStack justify="space-between" align="center">
                    <Icon as={FaCookieBite } boxSize={12} />
                    <Text>{t('cookies.text')}</Text>
                    <Button
                        background={useColorModeValue('custom_light.primary', 'custom_dark.primary')}
                        color={useColorModeValue('custom_light.secondarytext', 'custom_dark.secondarytext')}
                        _hover={{ bg: useColorModeValue('custom_light.surface', 'custom_dark.surface') }}
                        onClick={acceptCookies}
                        flexShrink={0}
                        >{t('cookies.accept')}</Button>
                </HStack>
            </Box>
        </Slide>
    );
};


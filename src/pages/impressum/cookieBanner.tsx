import { Box, Button, Flex, Icon, Slide, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCookieBite } from "react-icons/fa";
import { layoutConfig, useBackgroundColor, usePrimaryColor, useSurfaceColor, useTextColor } from '../../components/style';


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
        <Slide direction="bottom" in={isOpen} style={{ zIndex: 1000 }} >
            <Box p={layoutConfig.padding}
                bg={usePrimaryColor()}
                color={useTextColor()}
                textAlign="center"
                marginInline={{lg: '20%', base: '10%'}}
                borderRadius={layoutConfig.borderRadius}
                mb={layoutConfig.margin}
                >

                <Flex justify="space-between" align="center" direction={{lg: 'row', base: 'column'}} gap={layoutConfig.gap}>
                    <Icon as={FaCookieBite } boxSize={12} />
                    <Text>{t('cookies.text')}</Text>
                    <Button
                        background={useBackgroundColor()}
                        color={useTextColor()}
                        _hover={{ bg: useSurfaceColor() }}
                        onClick={acceptCookies}
                        flexShrink={0}
                        >{t('cookies.accept')}</Button>
                </Flex>
            </Box>
        </Slide>
    );
};


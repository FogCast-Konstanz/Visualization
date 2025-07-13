import { Box, Button, Flex, Icon, Slide } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCookieBite } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';
import { layoutConfig, useColor } from '../../components/style';

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
        <Slide direction="bottom" in={isOpen} style={{ zIndex: 1000 }} id="cookieBanner" >
            <Box p={layoutConfig.padding}
                bg={useColor('primary')}
                color={useColor('navbarText')}
                textAlign="center"
                marginInline={{ lg: '20%', base: '10%' }}
                borderRadius={layoutConfig.borderRadius}
                mb={layoutConfig.margin}
            >

                <Flex justify="space-between" align="center" direction={{ lg: 'row', base: 'column' }} gap={layoutConfig.gap}>
                    <Icon as={FaCookieBite} boxSize={12} />
                    <ReactMarkdown children={t('cookies.text')} />
                    <Button
                        background={useColor('background')}
                        color={useColor('text')}
                        _hover={{ bg: useColor('surface') }}
                        onClick={acceptCookies}
                        flexShrink={0}
                    >{t('cookies.accept')}</Button>
                </Flex>
            </Box>
        </Slide>
    );
};


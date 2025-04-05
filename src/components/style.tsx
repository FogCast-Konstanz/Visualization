

import { useColorModeValue } from '@chakra-ui/react';

export const useCustomBg = () => useColorModeValue('custom_light.background', 'custom_dark.background');


export const layoutConfig = {
    borderWidth: '10px',

    navBar: {
        width: '250px'
    }

};

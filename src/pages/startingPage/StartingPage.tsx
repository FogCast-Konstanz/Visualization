import { Flex, Heading, Select, useColorModeValue } from '@chakra-ui/react'


import { useTranslation } from 'react-i18next'
import StandardMode from './modes/Standard'
import { useState } from 'react';
import AdvancedMode from './modes/Advanced';

// const userModes = ['Standard', 'Advanced', 'Segler']

const userModes = [
  { label: "Standard", code: "1" },
  { label: "Advances", code: "2" },
  { label: "Segler", code: "3" },
];

export default function StartingPage() {
  const { t } = useTranslation();

  const [userMode, setUserMode] = useState<number>(1)


  return (
    <Flex direction='column' width={{ lg: "calc(100vw - 250px)", base: 'calc(100vw - 20px)' }} gap='10px' margin={'10px'} maxWidth={'100%'}>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Heading>{t('startingPage.title')}</Heading>

        <Select
          defaultValue={userMode}
          onChange={(e) => setUserMode(Number(e.target.value))}
          width={'fit-content'}
          bg={useColorModeValue('custom_light.background', 'custom_dark.background')}
          color={useColorModeValue('custom_light.text', 'custom_dark.text')}
          _focus={{ borderColor: useColorModeValue('custom_light.background', 'custom_dark.background') }}
          sx={{
            option: {
              background: useColorModeValue('custom_light.background', 'custom_dark.background'),
              color: useColorModeValue('custom_light.text', 'custom_dark.text'),
              _hover: { background: useColorModeValue('custom_light.background', 'custom_dark.background') }
            },
          }}
        >
          {userModes.map(({code, label}) => (
            <option
              key={code}
              value={code}
              color={useColorModeValue('custom_light.text', 'custom_dark.text')}
            >
              {label}
            </option>
          ))}
          
        </Select>

      </Flex>

      { userMode == 1 ? <StandardMode></StandardMode> 
        : userMode == 2 ? <AdvancedMode></AdvancedMode> 
        : <></>
    }
    </Flex>
  )
}

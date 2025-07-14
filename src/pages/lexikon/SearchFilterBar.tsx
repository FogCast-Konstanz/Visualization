import { CloseIcon } from '@chakra-ui/icons';
import {
    Flex,
    IconButton,
    Input, InputGroup, InputRightElement,
    useColorModeValue
} from '@chakra-ui/react';
// import CustomSelect from './CustomSelect'; // adjust import if needed
import CustomSelect, { SelectOption } from '../../components/elements/Select';

interface SearchFilterBarProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    tagOptions: SelectOption[];
    changeTags: (value: any) => void;
    layoutConfig: any;
}

const useColor = (key: string) =>
    useColorModeValue(`${key}.light`, `${key}.dark`);

export function SearchFilterBar({ searchQuery, setSearchQuery, tagOptions, changeTags, layoutConfig }: SearchFilterBarProps) {

    return (
        <Flex
            flex={1}
            direction={{ lg: 'row', base: 'column' }}
            alignItems={{ lg: 'center', base: 'flex-start' }}
            justifyContent="space-between"
            gap={{ lg: '20px', base: '10px' }}
            width="100%"
        >
            <InputGroup
                flex={{ lg: 1, base: 'none' }}
                bg={useColor('background')}
                color={useColor('text')}
                _focus={{ borderColor: useColor('background') }}
                sx={{
                    option: {
                        background: useColor('background'),
                        color: useColor('text'),
                        _hover: { background: useColor('background') }
                    },
                }}
                borderRadius={layoutConfig.buttonBorderRadius}
            >
                <Input
                    placeholder="Search title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                    <InputRightElement>
                        <IconButton
                            aria-label="Clear search"
                            icon={<CloseIcon />}
                            size="xs"
                            border="none"
                            background="none"
                            onClick={() => setSearchQuery("")}
                        />
                    </InputRightElement>
                )}
            </InputGroup>

            <CustomSelect
                onChange={changeTags}
                options={tagOptions}
                placeholder="Filter by tag"
            />
        </Flex>
    )
};

export default SearchFilterBar;

import { Card, CardBody, CardHeader, Heading, useColorModeValue } from '@chakra-ui/react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


type IntroductionFormat = { header: string; text: string };

export default function Introduction({ header, text }: IntroductionFormat) {
    return (
        <>
            <Card
                bg={useColorModeValue('custom_light.background', 'custom_dark.background')}
                color={useColorModeValue('custom_light.text', 'custom_dark.text')}
                width={'100%'}>
                <CardHeader pb={'0px'}>
                        <Heading>{header}</Heading>
                </CardHeader>
                <CardBody>
                    <ReactMarkdown children={text} remarkPlugins={[remarkGfm]} />
                </CardBody>
            </Card>
        </>
    )
}
import { Card, CardBody, CardHeader, Heading, useColorModeValue } from "@chakra-ui/react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Input = {header: string, body: string}
export default function CardIndividual({ header, body }: Input) {

    return (
        <Card
            bg={useColorModeValue('custom_light.background', 'custom_dark.background')}
            color={useColorModeValue('custom_light.text', 'custom_dark.text')}
            width={'100%'} >
            <CardHeader paddingBottom={'0'}>
                <Heading size='lg'>{header}</Heading>
                {/* <Text>{description}</Text> */}
            </CardHeader>
            <CardBody>
                {/* <Text>{t('phenomena.introduction')}</Text> */}
                <ReactMarkdown children={body} remarkPlugins={[remarkGfm]} />
            </CardBody>
        </Card>
    )
}
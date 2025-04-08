import { Card, CardBody, CardHeader, Heading, useColorModeValue } from "@chakra-ui/react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { layoutConfig, useColor, useSurfaceColor, useTextColor } from './style';

type Input = {header: string, body: string}
export default function CardIndividual({ header, body }: Input) {

    return (
        <Card
            bg={useColor('background')}
            color={useColor('text')}
            width={'100%'} >
            <CardHeader paddingBottom={'0'}>
                <Heading size='lg'>{header}</Heading>
                {/* <Text>{description}</Text> */}
            </CardHeader>
            <CardBody>
                {/* <Text>{t('phenomena.introduction')}</Text> */}
                <ReactMarkdown 
                    children={body} 
                    remarkPlugins={[remarkGfm]} 
                    components={{
                        p: ({ node, children }) => <div>{children}</div>, // Ensures paragraphs work properly
                        img: ({ node, ...props }) => (
                          <figure>
                            <img {...props} alt={props.alt} />
                            {props.title && <figcaption>{props.title}</figcaption>}
                          </figure>
                        ),
                      }}
                />
            </CardBody>
        </Card>
    )
}
import { Accordion } from '@mantine/core';
import "./faq.css";

function Faq() {
    const groceries = [
        {
            emoji: '💰',
            value: 'Ticket refund',
            description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non felis tempus, dapibus ligula eu, sollicitudin augue. Vivamus vel justo sit amet ante dapibus blandit eu id nisi. Pellentesque auctor, dolor sed dignissim hendrerit, nisl neque commodo diam, id pulvinar ipsum enim in magna.',
        },
        {
            emoji: '💳',
            value: 'Payment methods',
            description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non felis tempus, dapibus ligula eu, sollicitudin augue. Vivamus vel justo sit amet ante dapibus blandit eu id nisi. Pellentesque auctor, dolor sed dignissim hendrerit, nisl neque commodo diam, id pulvinar ipsum enim in magna.',
        },
        {
            emoji: '🎁',
            value: 'Gift cards',
            description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non felis tempus, dapibus ligula eu, sollicitudin augue. Vivamus vel justo sit amet ante dapibus blandit eu id nisi. Pellentesque auctor, dolor sed dignissim hendrerit, nisl neque commodo diam, id pulvinar ipsum enim in magna.',
        },
    ];

    const items = groceries.map((item) => (
        <Accordion.Item key={item.value} value={item.value}>
            <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
            <Accordion.Panel>{item.description}</Accordion.Panel>
        </Accordion.Item>
    ));

    return (
        <div className="faq-container">
            <Accordion id="faq" radius="xs">
                {items}
            </Accordion>
        </div>
    );
}

export default Faq;
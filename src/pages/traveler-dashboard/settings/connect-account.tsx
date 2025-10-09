import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { CardNotification } from '@/partials/cards';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';


interface IChannelsItem {
    icon: LucideIcon|string;
    title: string;
    description?: string;
    button?: boolean;
    actions: ReactNode;
}
type IChannelsItems = Array<IChannelsItem>;

const ConnectAccount = () => {
    const items: IChannelsItems = [
        {
            icon: "/media/images/social/googleIcon.png",
            title: 'Google',
            description: "Plan properly your workflow",
            actions: <Switch id="size-sm" size="sm" defaultChecked />,
        },
        {
            icon: "/media/images/social/facebook.svg",
            title: 'Facebook',
            description: "Plan properly your workflow",
            actions: <Switch id="size-sm" size="sm" />,
        },
    ];

    const renderItem = (item: IChannelsItem, index: number) => {
        return (
            <CardNotification
                icon={item.icon}
                title={item.title}
                description={item.description}
                button={item.button}
                actions={item.actions}
                key={index}
            />
        );
    };

    return (
        <Card>
            <CardHeader className="gap-2">
                <CardTitle>Connected Account</CardTitle>

            </CardHeader>
            <div id="notifications_cards">
                {items.map((item, index) => {
                    return renderItem(item, index);
                })}
            </div>
            <CardFooter className='flex justify-end gap-2'>
                <Button variant={"outline"} size="lg">Discard</Button>
                <Button variant="primary">Save Changes</Button>
            </CardFooter>
        </Card>
    );
};

export { ConnectAccount, type IChannelsItem, type IChannelsItems };


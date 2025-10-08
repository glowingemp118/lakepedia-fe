import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { CardNotification } from '@/partials/cards';
import { Bell, LucideIcon ,Settings as PrivacyPolicySetting} from 'lucide-react';
import { ReactNode  } from 'react';


interface IChannelsItem {
  icon: LucideIcon;
  title: string;
  description?: string;
  button?: boolean;
  actions: ReactNode;
}
type IChannelsItems = Array<IChannelsItem>;

const Settings = () => {
  const items: IChannelsItems = [
    {
      icon: Bell ,
      title: 'Notifications',
      actions: <Switch id="size-sm" size="sm" defaultChecked />,
    },
    {
      icon: PrivacyPolicySetting,
      title: 'Privacy Settings',
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
        <CardTitle>Settings</CardTitle>
       
      </CardHeader>
      <div id="notifications_cards">
        {items.map((item, index) => {
          return renderItem(item, index);
        })}
      </div>
      <CardFooter className='flex justify-end'>
        <Button variant="primary">Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export { Settings, type IChannelsItem, type IChannelsItems };


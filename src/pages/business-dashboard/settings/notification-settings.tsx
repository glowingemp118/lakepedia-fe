import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { CardNotification } from '@/partials/cards';
import { HexagonBadge } from '@/partials/common/hexagon-badge';
import { Bell, LucideIcon, Settings as PrivacyPolicySetting } from 'lucide-react';
import { ReactNode } from 'react';
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod"
import { Form } from '@/components/ui/form';
import RhfCheckbox from '@/components/rhf/rhf-checkbox';


interface IChannelsItem {
  icon: LucideIcon;
  title: string;
  description?: string;
  button?: boolean;
  actions?: ReactNode;
}
const defaultValues = {
  activities: true,
  trip: true,
  favorites: false,
}
type IChannelsItems = Array<IChannelsItem>;

const items: IChannelsItems = [

  {
    icon: PrivacyPolicySetting,
    title: 'Privacy Settings',
    actions: <Switch id="size-sm" size="sm" />,
  },
];

const Settings = () => {

  const schema = z.object({
    activities: z.boolean(),
    trip: z.boolean(),
    favorites: z.boolean(),
  });
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues
  });

  const onSubmit = (data: any) => {
    console.log(data);
  }

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
        <CardTitle>Notifications</CardTitle>

      </CardHeader>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>

          <div id="notifications_cards">
            <CardContent className='flex flex-col'>
              <div className="flex items-center gap-3.5">
                <HexagonBadge
                  size="size-[50px]"
                  badge={<Bell size={16} className="text-xl text-muted-foreground" />}
                  stroke="stroke-input"
                  fill="fill-muted/30"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="flex items-center gap-1.5 leading-none font-medium text-sm text-mono">
                    {"Notification"}
                  </span>

                </div>
              </div>
              <div className='flex flex-col items-start gap-3 md:ml-3 mt-4'>

                <RhfCheckbox name="activities" label="Manage Activities" />

                <RhfCheckbox name="trip" label="Organize Trips" />

                <RhfCheckbox name="favorites" label="Favorites & Wishlist Management" />
              </div>

            </CardContent>
            {items.map((item, index) => {
              return renderItem(item, index);
            })}
          </div>
          <CardFooter className='flex justify-end gap-2'>
            <Button variant={"outline"} size="lg">Discard</Button>
            <Button variant="primary" type='submit'>Save Changes</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export { Settings, type IChannelsItem, type IChannelsItems };


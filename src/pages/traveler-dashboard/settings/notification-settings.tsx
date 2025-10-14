// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Switch } from '@/components/ui/switch';
// import { CardNotification } from '@/partials/cards';
// import { HexagonBadge } from '@/partials/common/hexagon-badge';
// import { Bell, LucideIcon, Settings as PrivacyPolicySetting } from 'lucide-react';
// import { ReactNode } from 'react';
// import { useForm } from "react-hook-form"
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from "zod"
// import { Form } from '@/components/ui/form';
// import RhfCheckbox from '@/components/rhf/rhf-checkbox';


// interface IChannelsItem {
//   icon: LucideIcon;
//   title: string;
//   description?: string;
//   button?: boolean;
//   actions?: ReactNode;
// }
// const defaultValues = {
//   activities: true,
//   trip: true,
//   favorites: false,
// }
// type IChannelsItems = Array<IChannelsItem>;

// const items: IChannelsItems = [

//   {
//     icon: PrivacyPolicySetting,
//     title: 'Privacy Settings',
//     actions: <Switch id="size-sm" size="sm" />,
//   },
// ];

// const Settings = () => {

//   const schema = z.object({
//     activities: z.boolean(),
//     trip: z.boolean(),
//     favorites: z.boolean(),
//   });
//   const methods = useForm({
//     resolver: zodResolver(schema),
//     defaultValues
//   });

//   const onSubmit = (data: any) => {
//     console.log(data);
//   }

//   const renderItem = (item: IChannelsItem, index: number) => {
//     return (
//       <CardNotification
//         icon={item.icon}
//         title={item.title}
//         description={item.description}
//         button={item.button}
//         actions={item.actions}
//         key={index}
//       />
//     );
//   };

//   return (
//     <Card>
//       <CardHeader className="gap-2">
//         <CardTitle>Notifications</CardTitle>

//       </CardHeader>
//       <Form {...methods}>
//         <form onSubmit={methods.handleSubmit(onSubmit)}>

//           <div id="notifications_cards">
//             <CardContent className='flex flex-col'>
//               <div className="flex items-center gap-3.5">
//                 <HexagonBadge
//                   size="size-[50px]"
//                   badge={<Bell size={16} className="text-xl text-muted-foreground" />}
//                   stroke="stroke-input"
//                   fill="fill-muted/30"
//                 />
//                 <div className="flex flex-col gap-0.5">
//                   <span className="flex items-center gap-1.5 leading-none font-medium text-sm text-mono">
//                     {"Notification"}
//                   </span>

//                 </div>
//               </div>
//               <div className='flex flex-col items-start gap-3 md:ml-3 mt-4'>

//                 <RhfCheckbox name="activities" label="Manage Activities" />

//                 <RhfCheckbox name="trip" label="Organize Trips" />

//                 <RhfCheckbox name="favorites" label="Favorites & Wishlist Management" />
//               </div>

//             </CardContent>
//             {items.map((item, index) => {
//               return renderItem(item, index);
//             })}
//           </div>
//           <CardFooter className='flex justify-end gap-2'>
//             <Button variant={"outline"} size="lg">Discard</Button>
//             <Button variant="primary" type='submit'>Save Changes</Button>
//           </CardFooter>
//         </form>
//       </Form>
//     </Card>
//   );
// };

// export { Settings, type IChannelsItem, type IChannelsItems };

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { HexagonBadge } from '@/partials/common/hexagon-badge';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bell, Shield } from 'lucide-react';
import { useForm } from "react-hook-form";
import * as z from "zod";
import RhfSwitch from '@/components/rhf/rhf-switch';

// ✅ Schema for validation
const schema = z.object({
  profileVisibility: z.boolean(),
  showLocation: z.boolean(),
  showPastActivity: z.boolean(),
  allowMessages: z.boolean(),
  shareFavoriteLakes: z.boolean(),
  shareTrips: z.boolean(),
  displaySocialLinks: z.boolean(),

  postReply: z.boolean(),
  commentReply: z.boolean(),
  lakeReviewed: z.boolean(),
  directMessage: z.boolean(),
  newPhoto: z.boolean(),
  tripSuggestions: z.boolean(),
  platformAnnouncements: z.boolean(),
  mentions: z.boolean(),
});

const defaultValues = {
  profileVisibility: true,
  showLocation: true,
  showPastActivity: true,
  allowMessages: true,
  shareFavoriteLakes: false,
  shareTrips: true,
  displaySocialLinks: true,

  postReply: true,
  commentReply: true,
  lakeReviewed: true,
  directMessage: true,
  newPhoto: true,
  tripSuggestions: true,
  platformAnnouncements: true,
  mentions: true,
};

export function Settings() {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: any) => {
    console.log("Traveler Settings:", data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Traveler Settings</CardTitle>
      </CardHeader>

      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">

          {/* 🔒 Privacy Settings Section */}
          <CardContent className=" p-5 space-y-4">
            <div className="flex items-center gap-3">
              <HexagonBadge
                size="size-[50px]"
                badge={<Shield size={16} className="text-muted-foreground" />}
                stroke="stroke-input"
                fill="fill-muted/30"
              />
              <div>
                <h3 className="text-base font-semibold text-mono">Privacy Settings</h3>
                <p className="text-xs text-muted-foreground">
                  Control what others can see about you.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-3">
             
              <RhfSwitch name="profileVisibility" label="Profile visibility"  className='flex flex-row justify-between'
               description="Whether the profile is public (can be found and browsed)"
              />
             
              <RhfSwitch name="showLocation" label="Show location" className='flex flex-row justify-between'
              description='Whether city/country is visible to others'
              />
             
              <RhfSwitch name="showPastActivity" label="Show past activity" className='flex !flex-row justify-between'
              description="Whether others can view posts, reviews, photos, etc."
              />
             
              <RhfSwitch name="allowMessages" label="Allow messages" className='flex flex-row justify-between'
               description="Can other users contact you?"
              />
             
              <RhfSwitch name="shareFavoriteLakes" label="Share favorite lakes" className='flex flex-row justify-between'
               description="Can others see the lakes you liked/saved"
              />
             
              <RhfSwitch name="shareTrips" label="Share trips" className='flex flex-row justify-between'
              description='Can others see the trips you created'
              />
             
              <RhfSwitch name="displaySocialLinks" label="Display social links" className='flex flex-row justify-between'
              description='Can others see the trips you created'
              />
           
            </div>
          </CardContent>

          {/* 🔔 Notification Settings Section */}
          <CardContent className=" p-5 space-y-4">
            <div className="flex items-center gap-3">
              <HexagonBadge
                size="size-[50px]"
                badge={<Bell size={16} className="text-muted-foreground" />}
                stroke="stroke-input"
                fill="fill-muted/30"
              />
              <div>
                <h3 className="text-base font-semibold text-mono">Notification Settings</h3>
                <p className="text-xs text-muted-foreground">
                  Choose which notifications you want to receive.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-3">

              <RhfSwitch name="postReply" label="Post reply"  className='flex flex-row justify-between'
              description="Someone replies to user's post (review, photos)"
              />
              
              <RhfSwitch name="commentReply" label="Comment reply" className='flex flex-row justify-between'
              description="Someone replies to user's comment"
              />
              
              <RhfSwitch name="lakeReviewed" label="Lake reviewed" className='flex flex-row justify-between'
              description='A new review is posted for a lake the user follows/liked'
              />
              
              <RhfSwitch name="directMessage" label="Direct message received" className='flex flex-row justify-between'
              description="Another user sends a message"
              />
              
              <RhfSwitch name="newPhoto" label="New photo on followed lake" className='flex flex-row justify-between'
              description="Someone adds a photo to a followed lake"
              />
              
              <RhfSwitch name="tripSuggestions" label="Trip suggestions near favorite lake" className='flex flex-row justify-between'
              description='System detects new trip ideas or POIs nearby'
              />
              
              <RhfSwitch name="platformAnnouncements" label="Platform announcements" className='flex flex-row justify-between'
              description='Admin-level messages (e.g. new features, policy updates)'
              />
              
              <RhfSwitch name="mentions" label="Mentions" className='flex flex-row justify-between'
              description='Someone mentions you in a post/comment'
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-3">
            <Button type="button" variant="outline">Discard</Button>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

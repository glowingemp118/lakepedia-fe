

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { HexagonBadge } from '@/partials/common/hexagon-badge';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bell, LoaderCircleIcon, Shield } from 'lucide-react';
import { useForm } from "react-hook-form";
import * as z from "zod";
import RhfSwitch from '@/components/rhf/rhf-switch';
import { FC, useMemo } from 'react';
import { useUpdateProfileMutation } from '@/store/Reducer/users';
import { toast } from 'sonner';

const schema = z.object({
  // profileVisibility: z.boolean(),
  // showLocation: z.boolean(),
  // showPastActivity: z.boolean(),
  // allowMessages: z.boolean(),
  // shareFavoriteLakes: z.boolean(),
  // shareTrips: z.boolean(),
  // displaySocialLinks: z.boolean(),

  // postReply: z.boolean(),
  // commentReply: z.boolean(),
  // lakeReviewed: z.boolean(),
  // directMessage: z.boolean(),
  // newPhoto: z.boolean(),
  // tripSuggestions: z.boolean(),
  // platformAnnouncements: z.boolean(),
  // mentions: z.boolean(),
  profile_public: z.boolean(),
  show_location: z.boolean(),
  share_trips: z.boolean(),
  notify_announcements: z.boolean(),
  notify_replies: z.boolean(),
  notify_messages: z.boolean(),
});
//  privacy:{
//             profile_public:profileData?.user?.privacy?.profile_public,
//             share_trips:profileData?.user?.privacy?.share_trips,
//             show_location:profileData?.user?.privacy?.show_location
//         },
//         notifications:{
//             notify_announcements:profileData?.user?.notifications?.notify_announcements,
//             notify_replies:profileData?.user?.notifications?.notify_replies,
//             notify_messages:profileData?.user?.notifications?.notify_messages,
//         }

// const defaultValues = {
//   profileVisibility: true,
//   showLocation: true,
//   showPastActivity: true,
//   allowMessages: true,
//   shareFavoriteLakes: false,
//   shareTrips: true,
//   displaySocialLinks: true,

//   postReply: true,
//   commentReply: true,
//   lakeReviewed: true,
//   directMessage: true,
//   newPhoto: true,
//   tripSuggestions: true,
//   platformAnnouncements: true,
//   mentions: true,
// };

interface PageProps {
  travelerSettings: {
    privacy: {
      profile_public: boolean;
      show_location: boolean;
      share_trips: boolean;
    };
    notifications: {
      notify_announcements: boolean;
      notify_replies: boolean;
      notify_messages: boolean;
    };
  };
}

const Settings: FC<PageProps> = ({ travelerSettings }) => {


  const defaultValues = useMemo(() => ({
    profile_public: travelerSettings?.privacy?.profile_public || false,
    show_location: travelerSettings?.privacy?.show_location || false,
    share_trips: travelerSettings?.privacy?.share_trips || false,
    notify_announcements: travelerSettings?.notifications?.notify_announcements || false,
    notify_replies: travelerSettings?.notifications?.notify_replies || false,
    notify_messages: travelerSettings?.notifications?.notify_messages || false,
  }), [travelerSettings]);
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const [updateProfile] = useUpdateProfileMutation();

  const onSubmit = async (data: any) => {

    const privacySettings = {
      profile_public: data.profile_public,
      show_location: data.show_location,
      share_trips: data.share_trips,
      key: "privacy"
    }

    let response: any = await updateProfile(privacySettings);

    if (!response.error) {
      const notificationSettings = {
        notify_announcements: data.notify_announcements,
        notify_replies: data.notify_replies,
        notify_messages: data.notify_messages,
        key: "notifications"
      }

      let res: any = await updateProfile(notificationSettings);

      if (!res.error) {
        toast.success("Traveler settings updated successfully");
      }

    };
  }

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

              <RhfSwitch name="profile_public" label="Profile visibility" className='flex flex-row justify-between'
                description="Whether the profile is public (can be found and browsed)"
              />

              <RhfSwitch name="show_location" label="Show location" className='flex flex-row justify-between'
                description='Whether city/country is visible to others'
              />

              {/* <RhfSwitch name="show_past_activity" label="Show past activity" className='flex !flex-row justify-between'
                description="Whether others can view posts, reviews, photos, etc."
              /> */}

              {/* <RhfSwitch name="allow_messages" label="Allow messages" className='flex flex-row justify-between'
                description="Can other users contact you?"
              /> */}

              {/* <RhfSwitch name="share_favorite_lakes" label="Share favorite lakes" className='flex flex-row justify-between'
                description="Can others see the lakes you liked/saved"
              /> */}

              <RhfSwitch name="share_trips" label="Share trips" className='flex flex-row justify-between'
                description='Can others see the trips you created'
              />

              {/* <RhfSwitch name="display_social_links" label="Display social links" className='flex flex-row justify-between'
                description='Can others see the trips you created'
              /> */}

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

              <RhfSwitch name="notify_replies" label="Post reply" className='flex flex-row justify-between'
                description="Someone replies to user's post (review, photos)"
              />

              {/* <RhfSwitch name="commentReply" label="Comment reply" className='flex flex-row justify-between'
                description="Someone replies to user's comment"
              />

              <RhfSwitch name="lakeReviewed" label="Lake reviewed" className='flex flex-row justify-between'
                description='A new review is posted for a lake the user follows/liked'
              /> */}

              <RhfSwitch name="notify_messages" label="Direct message received" className='flex flex-row justify-between'
                description="Another user sends a message"
              />

              {/* <RhfSwitch name="newPhoto" label="New photo on followed lake" className='flex flex-row justify-between'
                description="Someone adds a photo to a followed lake"
              />

              <RhfSwitch name="tripSuggestions" label="Trip suggestions near favorite lake" className='flex flex-row justify-between'
                description='System detects new trip ideas or POIs nearby'
              /> */}

              <RhfSwitch name="notify_announcements" label="Platform announcements" className='flex flex-row justify-between'
                description='Admin-level messages (e.g. new features, policy updates)'
              />

              {/* <RhfSwitch name="mentions" label="Mentions" className='flex flex-row justify-between'
                description='Someone mentions you in a post/comment'
              /> */}
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-3">
            <Button type="button" variant="outline">Discard</Button>
            <Button type="submit"
              disabled={methods.formState.isSubmitting}
            >
              {methods.formState.isSubmitting ? (
                <span className="flex items-center gap-2">
                  <LoaderCircleIcon className="h-4 w-4 animate-spin" /> Loading...
                </span>
              ) : ("Save Changes")}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}


export { Settings };
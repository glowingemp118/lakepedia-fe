

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

  profile_public: z.boolean(),
  show_location: z.boolean(),
  share_trips: z.boolean(),
  show_past_activity: z.boolean(),
  allow_messages: z.boolean(),
  share_favorite_lakes: z.boolean(),
  display_social_links: z.boolean(),


  notify_post_reply: z.boolean(),
  notify_comment_reply: z.boolean(),
  notify_lake_reviewed: z.boolean(),
  notify_messages: z.boolean(),
  notify_new_photo_on_followed_lake: z.boolean(),
  notify_trip_suggestions: z.boolean(),
  notify_announcements: z.boolean(),
  notify_mentions: z.boolean(),
});


interface PageProps {
  travelerSettings: {
    privacy: {
      profile_public: boolean;
      show_location: boolean;
      share_trips: boolean;
      show_past_activity: boolean;
      allow_messages: boolean;
      share_favorite_lakes: boolean;
      display_social_links: boolean;

    };

    notifications: {
      notify_post_reply: boolean;
      notify_comment_reply: boolean;
      notify_lake_reviewed: boolean;
      notify_messages: boolean;
      notify_new_photo_on_followed_lake: boolean;
      notify_trip_suggestions: boolean;
      notify_announcements: boolean;
      notify_mentions: boolean;
    };
  };
}

const Settings: FC<PageProps> = ({ travelerSettings }) => {


  const defaultValues = useMemo(() => ({

    profile_public: travelerSettings?.privacy?.profile_public,
    show_location: travelerSettings?.privacy?.show_location,
    share_trips: travelerSettings?.privacy?.share_trips,
    show_past_activity: travelerSettings?.privacy?.show_past_activity,
    allow_messages: travelerSettings?.privacy?.allow_messages,
    share_favorite_lakes: travelerSettings?.privacy?.share_favorite_lakes,
    display_social_links: travelerSettings?.privacy?.display_social_links,

    notify_post_reply: travelerSettings?.notifications?.notify_post_reply,
    notify_comment_reply: travelerSettings?.notifications?.notify_comment_reply,
    notify_lake_reviewed: travelerSettings?.notifications?.notify_lake_reviewed,
    notify_messages: travelerSettings?.notifications?.notify_messages,
    notify_new_photo_on_followed_lake: travelerSettings?.notifications?.notify_new_photo_on_followed_lake,
    notify_trip_suggestions: travelerSettings?.notifications?.notify_trip_suggestions,
    notify_announcements: travelerSettings?.notifications?.notify_announcements,
    notify_mentions: travelerSettings?.notifications?.notify_mentions,

  }), [travelerSettings]);
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const [updateProfile] = useUpdateProfileMutation();

  const onSubmit = async (data: any) => {

    //privacy settings
    const privacySettings = {
      profile_public: data.profile_public,
      show_location: data.show_location,
      share_trips: data.share_trips,
      show_past_activity: data.show_past_activity,
      allow_messages: data.allow_messages,
      share_favorite_lakes: data.share_favorite_lakes,
      display_social_links: data.display_social_links
    }

    let response: any = await updateProfile({ privacy: privacySettings,   key: "privacy" });

    if (!response.error) {
      // notification settings
      const notificationSettings = {
        notify_post_reply: data.notify_post_reply,
        notify_comment_reply: data.notify_comment_reply,
        notify_lake_reviewed: data.notify_lake_reviewed,
        notify_messages: data.notify_messages,
        notify_new_photo_on_followed_lake: data.notify_new_photo_on_followed_lake,
        notify_trip_suggestions: data.notify_trip_suggestions,
        notify_announcements: data.notify_announcements,
        notify_mentions: data.notify_mentions,
      }

      let res: any = await updateProfile({ notifications: notificationSettings, key: "notifications" });

      if (!res.error) {
        toast.success("Traveler settings updated successfully");
      }

    };
  }
  const handleReset = () => {
    methods.reset(defaultValues);
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

              <RhfSwitch name="show_past_activity" label="Show past activity" className='flex !flex-row justify-between'
                description="Whether others can view posts, reviews, photos, etc."
              />

              <RhfSwitch name="allow_messages" label="Allow messages" className='flex flex-row justify-between'
                description="Can other users contact you?"
              />

              <RhfSwitch name="share_favorite_lakes" label="Share favorite lakes" className='flex flex-row justify-between'
                description="Can others see the lakes you liked/saved"
              />

              <RhfSwitch name="share_trips" label="Share trips" className='flex flex-row justify-between'
                description='Can others see the trips you created'
              />

              <RhfSwitch name="display_social_links" label="Display social links" className='flex flex-row justify-between'
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

              <RhfSwitch name="notify_post_reply" label="Post reply" className='flex flex-row justify-between'
                description="Someone replies to user's post (review, photos)"
              />

              <RhfSwitch name="notify_comment_reply" label="Comment reply" className='flex flex-row justify-between'
                description="Someone replies to user's comment"
              />

              <RhfSwitch name="notify_lake_reviewed" label="Lake reviewed" className='flex flex-row justify-between'
                description='A new review is posted for a lake the user follows/liked'
              />

              <RhfSwitch name="notify_messages" label="Direct message received" className='flex flex-row justify-between'
                description="Another user sends a message"
              />

              <RhfSwitch name="notify_new_photo_on_followed_lake" label="New photo on followed lake" className='flex flex-row justify-between'
                description="Someone adds a photo to a followed lake"
              />

              <RhfSwitch name="notify_trip_suggestions" label="Trip suggestions near favorite lake" className='flex flex-row justify-between'
                description='System detects new trip ideas or POIs nearby'
              />

              <RhfSwitch name="notify_announcements" label="Platform announcements" className='flex flex-row justify-between'
                description='Admin-level messages (e.g. new features, policy updates)'
              />

              <RhfSwitch name="notify_mentions" label="Mentions" className='flex flex-row justify-between'
                description='Someone mentions you in a post/comment'
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-3">
            <Button type="button" onClick={handleReset} variant="outline">Discard</Button>
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
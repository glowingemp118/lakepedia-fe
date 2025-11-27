import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { HexagonBadge } from '@/partials/common/hexagon-badge';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bell, LoaderCircleIcon, Shield } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import RhfSwitch from '@/components/rhf/rhf-switch';
import { FC, useEffect, useMemo } from 'react';
import { useUpdateProfileMutation } from '@/store/Reducer/users';
import { toast } from 'react-toastify';

const schema = z.object({
  // Privacy settings
  profile_public: z.boolean().optional().default(false),
  show_location: z.boolean().optional().default(false),
  show_past_activity: z.boolean().optional().default(false),
  allow_messages: z.boolean().optional().default(false),
  share_favorite_lakes: z.boolean().optional().default(false),
  share_trips: z.boolean().optional().default(false),
  display_social_links: z.boolean().optional().default(false),

  //  Notifications settings
  notify_post_reply: z.boolean().optional().default(false),
  notify_comment_reply: z.boolean().optional().default(false),
  notify_lake_reviewed: z.boolean().optional().default(false),
  notify_messages: z.boolean().optional().default(false),
  notify_new_photo_on_followed_lake: z.boolean().optional().default(false),
  // notify_trip_suggestions: z.boolean().optional().default(false),
  notify_announcements: z.boolean().optional().default(false),
  notify_mentions: z.boolean().optional().default(false),
  booking_inquiry: z.boolean().optional().default(false),
});

type SchemaType = z.infer<typeof schema>;

interface PageProps {
  businessSettings?: {
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
      // notify_trip_suggestions: boolean;
      notify_announcements: boolean;
      notify_mentions: boolean;
      booking_inquiry: boolean;
    };
  };
}

const Settings: FC<PageProps> = ({ businessSettings }) => {



  const defaultValues = useMemo(() => ({
    //  Privacy settings
    profile_public: businessSettings?.privacy?.profile_public || true,
    show_location: businessSettings?.privacy?.show_location || true,
    share_trips: businessSettings?.privacy?.share_trips || false,
    show_past_activity: businessSettings?.privacy?.show_past_activity || true,
    allow_messages: businessSettings?.privacy?.allow_messages || false,
    share_favorite_lakes: businessSettings?.privacy?.share_favorite_lakes || true,
    display_social_links: businessSettings?.privacy?.display_social_links || false,

    // Notifications settings
    notify_post_reply: businessSettings?.notifications?.notify_post_reply || false,
    notify_comment_reply: businessSettings?.notifications?.notify_comment_reply || false,
    notify_lake_reviewed: businessSettings?.notifications?.notify_lake_reviewed || false,
    notify_messages: businessSettings?.notifications?.notify_messages || false,
    notify_new_photo_on_followed_lake:
      businessSettings?.notifications?.notify_new_photo_on_followed_lake || false,
    notify_announcements: businessSettings?.notifications?.notify_announcements || true,
    notify_mentions: businessSettings?.notifications?.notify_mentions || false,
    booking_inquiry: businessSettings?.notifications?.booking_inquiry || false,
  }), [businessSettings]);

  const [updateProfile] = useUpdateProfileMutation();


  const methods = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(()=>{
    methods.reset(defaultValues);
  },[defaultValues]);

  const onSubmit = async (data: any) => {


    //privacy settings
    const privacySettings = {
      profile_public: data.profile_public,
      show_location: data.show_location,
      share_trips: data.share_trips,
      show_past_activity: data.show_past_activity,
      allow_messages: data.allow_messages,
      share_favorite_lakes: data.share_favorite_lakes,
      display_social_links: data.display_social_links,
    }

    let response: any = await updateProfile({ privacy: privacySettings, key: "privacy" });

    if (!response.error) {
      // notification settings
      const notificationSettings = {
        notify_post_reply: data.notify_post_reply,
        notify_comment_reply: data.notify_comment_reply,
        notify_lake_reviewed: data.notify_lake_reviewed,
        notify_direct_message: data.notify_messages,
        notify_new_photo_on_followed_lake: data.notify_new_photo_on_followed_lake,
        // notify_trip_suggestions: data.notify_trip_suggestions,
        notify_announcements: data.notify_announcements,
        notify_mentions: data.notify_mentions,
        notify_booking_inquiry: data.booking_inquiry,
      }

      let res: any = await updateProfile({ notifications: notificationSettings, key: "notifications" });

      if (!res.error) {
        toast.success("Business settings updated successfully", {
          autoClose: 2000
        });
        // methods.reset(defaultValues);
      }

    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Settings</CardTitle>
      </CardHeader>

      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">

          {/* 🔒 Privacy Settings */}
          <CardContent className="p-5 space-y-4">
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
                  Control what your customers and followers can see about your business.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-3">
              <RhfSwitch name="profile_public" label="Show business profile" className='flex flex-row justify-between ' disabled
                description="Whether your business profile is public." />

              <RhfSwitch name="show_location" label="Show location" className='flex flex-row justify-between'
                description="Display your business location." disabled />

              <RhfSwitch name="show_past_activity" label="Show past activity" className='flex flex-row justify-between'
                description="Allow others to view past business activity" disabled />

              <RhfSwitch name="allow_messages" label="Allow messages" className='flex flex-row justify-between'
                description="Can others contact you?" />

              <RhfSwitch name="share_favorite_lakes" label="Share favorite lakes" className='flex flex-row justify-between'
                description="Others can see your liked lakes" disabled />

              <RhfSwitch name="share_trips" label="Share trips" className='flex flex-row justify-between'
                description="Others can see your trips" />

              <RhfSwitch name="display_social_links" label="Display social links" className='flex flex-row justify-between'
                description="Show social links on profile" disabled />
            </div>
          </CardContent>

          {/* 🔔 Notification Settings */}
          <CardContent className="p-5 space-y-4">
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
                  Choose notifications your business receives.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-3">

              <RhfSwitch name="notify_post_reply" label="Post reply"
                description="Someone replies to user's post (review, photos)"
                className='flex flex-row justify-between' />

              <RhfSwitch name="notify_comment_reply" label="Comment reply"
                description="Someone replies to user's comment"
                className='flex flex-row justify-between' />

              <RhfSwitch name="notify_lake_reviewed" label="Lake reviewed"
                description="User's followed lake has a new review"
                className='flex flex-row justify-between' />

              <RhfSwitch name="notify_messages" label="Direct message received"
                description="User receives a direct message"
                className='flex flex-row justify-between' />

              <RhfSwitch name="notify_new_photo_on_followed_lake" label="New photo on followed lake"
                description="New photo is added to a followed lake"
                className='flex flex-row justify-between' />

              {/* <RhfSwitch name="notify_trip_suggestions" label="Trip suggestions"
                description="User receives trip suggestions"
                className='flex flex-row justify-between' /> */}

              <RhfSwitch name="notify_announcements" label="Platform announcements"
                description="User receives platform announcements"
                className='flex flex-row justify-between' disabled />

              <RhfSwitch name="notify_mentions" label="Mentions"
                description="User is mentioned in a post or comment"
                className='flex flex-row justify-between' />

              <RhfSwitch name="booking_inquiry" label="Booking inquiries"
                description="User receives booking inquiries"
                className='flex flex-row justify-between' />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-3">
            <Button type="button" variant="outline">Discard</Button>
            <Button type='submit' variant={"primary"} size="lg" disabled={methods.formState.isSubmitting}>
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
};

export { Settings };

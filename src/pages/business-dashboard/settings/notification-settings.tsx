import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { HexagonBadge } from '@/partials/common/hexagon-badge';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bell, Shield } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import RhfSwitch from '@/components/rhf/rhf-switch';

// ✅ Schema for validation
const schema = z.object({
  showBusinessProfile: z.boolean(),
  displayContactInfo: z.boolean(),
  showLocation: z.boolean(),
  allowReviews: z.boolean(),
  allowDirectMessages: z.boolean(),
  showOperatingHours: z.boolean(),
  displaySocialLinks: z.boolean(),

  newReview: z.boolean(),
  newFollower: z.boolean(),
  messageReceived: z.boolean(),
  bookingRequest: z.boolean(),
  systemAnnouncements: z.boolean(),
  mentions: z.boolean(),
});

const defaultValues = {
  showBusinessProfile: true,
  displayContactInfo: true,
  showLocation: true,
  allowReviews: true,
  allowDirectMessages: true,
  showOperatingHours: true,
  displaySocialLinks: true,

  newReview: true,
  newFollower: true,
  messageReceived: true,
  bookingRequest: true,
  systemAnnouncements: true,
  mentions: true,
};

export function Settings() {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: any) => {
    console.log('Business Settings:', data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Settings</CardTitle>
      </CardHeader>

      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">

          {/* 🔒 Privacy Settings Section */}
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
              <RhfSwitch
                name="showBusinessProfile"
                label="Show business profile"
                description="Whether your business profile is public and visible in search results."
                className="flex flex-row justify-between"
              />
              <RhfSwitch
                name="displayContactInfo"
                label="Display contact info"
                description="Show phone, email, or website on your public profile."
                className="flex flex-row justify-between"
              />
              <RhfSwitch
                name="showLocation"
                label="Show location"
                description="Display your business address or location on map."
                className="flex flex-row justify-between"
              />
              <RhfSwitch
                name="allowReviews"
                label="Allow customer reviews"
                description="Enable customers to leave reviews or ratings."
                className="flex flex-row justify-between"
              />
              <RhfSwitch
                name="allowDirectMessages"
                label="Allow direct messages"
                description="Let customers or collaborators message your business directly."
                className="flex flex-row justify-between"
              />
              <RhfSwitch
                name="showOperatingHours"
                label="Show operating hours"
                description="Display your business working hours publicly."
                className="flex flex-row justify-between"
              />
              <RhfSwitch
                name="displaySocialLinks"
                label="Display social links"
                description="Show linked social media profiles on your page."
                className="flex flex-row justify-between"
              />
            </div>
          </CardContent>

          {/* 🔔 Notification Settings Section */}
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
                  Choose which notifications your business should receive.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-3">
              <RhfSwitch
                name="newReview"
                label="New review received"
                description="Get notified when a new review or rating is posted."
                className="flex flex-row justify-between"
              />
              <RhfSwitch
                name="newFollower"
                label="New follower"
                description="Receive alerts when someone follows your business page."
                className="flex flex-row justify-between"
              />
              <RhfSwitch
                name="messageReceived"
                label="New message received"
                description="Notify when a customer or partner sends a direct message."
                className="flex flex-row justify-between"
              />
              <RhfSwitch
                name="bookingRequest"
                label="Booking or inquiry request"
                description="Notify when a new booking or business inquiry arrives."
                className="flex flex-row justify-between"
              />
              <RhfSwitch
                name="systemAnnouncements"
                label="Platform announcements"
                description="Get updates from admin about new features or policies."
                className="flex flex-row justify-between"
              />
              <RhfSwitch
                name="mentions"
                label="Mentions"
                description="Get notified when your business is mentioned by a user."
                className="flex flex-row justify-between"
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

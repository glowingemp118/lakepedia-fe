import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useBoolean } from '@/hooks/use-boolean';
import { zodResolver } from '@hookform/resolvers/zod';
import { SquarePen } from 'lucide-react';
import { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import DialogContent, { Dialog, DialogClose, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';


interface PageProps {
  profileData: {
    photo: string;
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    usState: string;
    favoriteActivities: string[];
    privacy: string;
    notifications: boolean;
  };

}

const ProfileInfo: FC<PageProps> = ({ profileData }) => {

  const defaultValues = useMemo(() => ({
    photo: profileData.photo || null,
    firstName: profileData.firstName || '',
    lastName: profileData.lastName || '',
    email: profileData.email || '',
    country: profileData.country || '',
    usState: profileData.usState || '',

  }), [profileData])

  const open = useBoolean();

  const schema = z.object({
    photo: z.string().nullable().optional(),
    firstName: z.string().min(3, 'First name is required'),
    lastName: z.string().min(3, 'Last name is required'),
    email: z.email('Invalid email address'),
    country: z.string().min(2, 'Country is required'),
    usState: z.string().min(2, 'State is required'),
  })

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });


  useEffect(() => {
    methods.reset(defaultValues);
  }, [defaultValues])

  const onSubmit = (data: z.infer<typeof schema>) => {
    //console.log(data);
  }



  return (
    <Card className="min-w-full">
      <CardHeader>
        <CardTitle>Traveler Profile Info</CardTitle>
        <Button variant="ghost" mode="icon" onClick={open.onTrue} >
          <SquarePen size={16} className="text-blue-500" />
        </Button>
      </CardHeader>
      <CardContent className="kt-scrollable-x-auto pb-3 p-0">
        <Table className="align-middle text-sm text-muted-foreground">
          <TableBody>
            <TableRow>
              <TableCell className="py-2 min-w-28 text-secondary-foreground font-normal">
                Photo
              </TableCell>
              <TableCell className="py-2 text-gray700 font-normal min-w-32 text-sm">
                150x150px JPEG, PNG Image
              </TableCell>
              <TableCell className="py-2 text-center">
                <div className="flex justify-center items-center">

                  <img
                    src={"/media/avatars/300-2.png"}
                    alt="Avatar"
                    className="size-16 rounded-full border-2 border-green-500"
                  />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                First Name
              </TableCell>
              <TableCell className="py-3 text-foreground font-normal text-sm">
                {profileData.firstName}
              </TableCell>
              <TableCell className="py-2 text-center">
                <span>-</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                Last Name
              </TableCell>
              <TableCell className="py-3 text-foreground font-normal text-sm">
                {profileData.lastName}
              </TableCell>
              <TableCell className="py-3 text-center">
                <span>-</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                Email
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                {profileData.email}
              </TableCell>
              <TableCell className="py-3 text-center">
                <span>-</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                UsState
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                {profileData.usState}
              </TableCell>
              <TableCell className="py-3 text-center">
                <span>-</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                Country
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                {profileData.country}
              </TableCell>
              <TableCell className="py-3 text-center">
                <span>-</span>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                Privacy Settings
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                {profileData.privacy}
              </TableCell>
              <TableCell className="py-3 text-center">
                <span>-</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                Notifications
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                {profileData.notifications ? 'Enabled' : 'Disabled'}
              </TableCell>
              <TableCell className="py-3 text-center">
                <span>-</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                Deactivate Account
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                <span className="text-red-500">Deactivate your account</span>
              </TableCell>
              <TableCell className="py-3 text-center">
                <Button variant="destructive" size="sm" onClick={() => { }}>
                  Deactivate
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>


      <Dialog open={open.value} onOpenChange={open.onFalse}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <Form {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="block w-full space-y-5"
            >
              <FormField
                control={methods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>

      </Dialog>
    </Card >
  );
};

export { ProfileInfo };


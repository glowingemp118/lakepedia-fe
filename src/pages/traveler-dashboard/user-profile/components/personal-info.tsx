import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useBoolean } from '@/hooks/use-boolean';
import { FC } from 'react';
import { Link } from 'react-router';
import ProfileQuickEditForm from '../quick-update-profile';

interface PageProps {
  user: any
}
const PersonalInfo: FC<PageProps> = ({ user }) => {

  const open = useBoolean();

  return (
    <Card className="min-w-full">
      <CardHeader>
        <div className='flex justify-between items-center'>
          <CardTitle>Personal Info</CardTitle>
        </div>
      
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
                    src={(user.image as { url?: string })?.url  || "/media/avatars/300-2.png"}
                    alt="Avatar"
                    className="size-16 rounded-full border-2 border-green-500"
                  />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                First Name
              </TableCell>
              <TableCell className="py-2 text-foreground font-normaltext-sm">
                {user.first_name || 'Unknown'}
              </TableCell>
              <TableCell className="py-2 text-center">
                -
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                Last Name
              </TableCell>
              <TableCell className="py-2 text-foreground font-normaltext-sm">
                {user.last_name || 'Unknown'}
              </TableCell>
              <TableCell className="py-2 text-center">
                -
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2 min-w-36 text-secondary-foreground font-normal">
                Email
              </TableCell>
              <TableCell className="py-2 min-w-60">
                <Link
                  to="#"
                  className="text-foreground font-normal text-sm hover:text-primary-active"
                >
                  {user.email || 'Unknown'}
                </Link>
              </TableCell>
              <TableCell className="py-2 max-w-16 text-center">
                -
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                UsState
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                {user?.state || 'Not Added'}
              </TableCell>
              <TableCell className="py-3 text-center">
                -
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                Country
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                {user?.country || 'Not Added'}
              </TableCell>
              <TableCell className="py-3 text-center">
                -
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </CardContent>
      <ProfileQuickEditForm open={open.value} onClose={open.onFalse} profileData={user} />
    </Card>
  );
};

export { PersonalInfo };

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useBoolean } from '@/hooks/use-boolean';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Mail } from 'lucide-react';
import { Link } from 'react-router';
import QuickUpdatePassword from '../quick-update-password';

interface IBasicSettingsProps {
  title: string;
  basicSettings: {
    lastEmailLogin: string;
    signInWith: string;
    privacySettings: any;
    notificationSettings: any;
    last_login_with: string;
  }
}

const BasicSettings = ({ title, basicSettings }: IBasicSettingsProps) => {

  const open = useBoolean();

  return (
    <Card className="min-w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>

      </CardHeader>
      <CardContent className="kt-scrollable-x-auto pb-3 p-0">
        <Table className="align-middle text-sm text-muted-foreground">
          <TableBody>

            <TableRow>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                Last email login
              </TableCell>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                {basicSettings.lastEmailLogin}
              </TableCell>
              <TableCell className="py-2 text-end">

                -
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="py-2text-secondary-foreground font-normal">
                Sign-in with
              </TableCell>
              <TableCell className="py-0.5">
                <div className="flex items-center gap-2.5">
                  {basicSettings.last_login_with === "google" && <Link
                    to="#"
                    className="flex items-center justify-center size-8 bg-background rounded-full border border-input"
                  >
                    <img
                      src={toAbsoluteUrl('/media/brand-logos/google.svg')}
                      className="size-4"
                      alt=""
                    />
                  </Link>}
                  {basicSettings.last_login_with === "facebook" && <Link
                    to="#"
                    className="flex items-center justify-center size-8 bg-background rounded-full border border-input"
                  >
                    <img
                      src={toAbsoluteUrl('/media/brand-logos/facebook.svg')}
                      className="size-4"
                      alt=""
                    />
                  </Link>}
                  {basicSettings.last_login_with === "email" && <Mail />}
                </div>
              </TableCell>
              <TableCell className="py-2 text-end">

                -
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3.5text-secondary-foreground font-normal">
                Privacy Settings
              </TableCell>
              <TableCell className="py-3.5 text-secondary-foreground font-normal">
                Public
              </TableCell>
              <TableCell className="py-2 text-end">

                -
              </TableCell>
            </TableRow>


            <TableRow>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                Notifications
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                <div className="flex items-center gap-0.5">
                  Disabled

                </div>
              </TableCell>
              <TableCell className="py-2 text-end">

                -
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>

      <QuickUpdatePassword open={open.value} onClose={open.onFalse} />
    </Card>
  );
};

export { BasicSettings, type IBasicSettingsProps };

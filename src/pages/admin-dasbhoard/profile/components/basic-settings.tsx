import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useBoolean } from '@/hooks/use-boolean';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Link } from 'react-router';
import QuickUpdatePassword from '../quick-update-password';

interface IBasicSettingsProps {
  title: string;
}

const BasicSettings = ({ title }: IBasicSettingsProps) => {
   
  const open=useBoolean();

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
                Password
              </TableCell>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                Password last changed 2 months ago
              </TableCell>
              <TableCell className="py-2 text-end">
               
                -
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3.5text-secondary-foreground font-normal">
                2FA
              </TableCell>
              <TableCell className="py-3.5 text-secondary-foreground font-normal">
                To be set
              </TableCell>
              <TableCell className="py-3 text-end">
                
                -
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2text-secondary-foreground font-normal">
                Sign-in with
              </TableCell>
              <TableCell className="py-0.5">
                <div className="flex items-center gap-2.5">
                  <Link
                    to="#"
                    className="flex items-center justify-center size-8 bg-background rounded-full border border-input"
                  >
                    <img
                      src={toAbsoluteUrl('/media/brand-logos/google.svg')}
                      className="size-4"
                      alt=""
                    />
                  </Link>
                  <Link
                    to="#"
                    className="flex items-center justify-center size-8 bg-background rounded-full border border-input"
                  >
                    <img
                      src={toAbsoluteUrl('/media/brand-logos/facebook.svg')}
                      className="size-4"
                      alt=""
                    />
                  </Link>
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

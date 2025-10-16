
import { Table, TableBody, TableHeadCustom } from '@/components/ui/table';

import ConfirmDialog from '@/components/comfirm-dialog/confirm-dialog';
import { Container } from '@/components/common/container';
import { Navbar } from '@/components/layouts/layout-3/components/navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useBoolean } from '@/hooks/use-boolean';
import { toAbsoluteUrl } from '@/lib/helpers';
import { selectUser } from '@/store/slices/userSlice';
import { CircleUser, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { UserHero } from '../../profile/profile-hero';
import { UserStatusModal } from '../user-status-modal';
import UserTableRow from '../user-table-row';

const headLabel = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'country', label: 'Country', align: 'left' },
  { id: 'state', label: 'State', align: 'left' },
  { id: 'status', label: 'Status', align: 'center' },
  { id: 'action', label: '', align: 'right' },
];



const UsersView = () => {

  const open = useBoolean();

  const deleteModal = useBoolean();

  const user = useSelector(selectUser);

  const [currentUser, setCurrentUser] = useState<IUsers | null>(null);

  const image = (
    <img
      src={toAbsoluteUrl(user?.image as string || '/media/avatars/300-1.png')}
      className="rounded-full border-3 border-green-500 size-[100px] shrink-0"
      alt="image"
    />
  );

  const CapitalizeRole = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  }


  return (

    <div className='md:mx-10 mx-2 my-4 flex flex-col gap-6'>
      <UserHero
        name={CapitalizeRole(user?.first_name as string || "Jenny") + " " + CapitalizeRole(user?.last_name as string || "Klabber")}
        image={image}
        info={[
          { label: CapitalizeRole(user?.role as string || "Traveler"), icon: CircleUser },
          { label: 'SF, Bay Area', icon: MapPin },
          { email: user?.email as string || "jenny@kteam.com", icon: Mail },
        ]}
      />
      <Container>
        <Navbar />
      </Container>
      <Container className=''>

        <Card className='mt-5 shadow-md col-span-12 lg:col-span-12  md:px-8 px-2  mb-5  dark:bg-secondary'>

          <div className='flex md:justify-between md:items-center flex-col md:flex-row gap-4'>
            <h3 className='text-xl font-semibold md:ml-0 ml-2 my-5'>Users List</h3>
            <div>

            </div>
          </div>
          <div className='w-full '>
            <Input
              placeholder="Search Business"
              // value={globalFilter}
              // onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full h-10 "
            />
          </div>
          <div className='border rounded-lg my-5 overflow-x-auto'>
            <Table className="w-full">
              <TableHeadCustom headLabel={headLabel} />
              <TableBody>
                {data.map((item: any, index: number) => (
                  <UserTableRow key={index} item={item}
                    handleEdit={() => {
                      setCurrentUser(item);
                      open.onTrue();
                    }}
                    handleDelete={() => {
                      setCurrentUser(item);
                      deleteModal.onTrue();
                    }}
                  />
                ))}
              </TableBody>
            </Table>
            <div >
            </div>

            <Pagination className='w-full flex justify-end mt-2'>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

          </div>
        </Card>
        <UserStatusModal isOpen={open.value} onClose={open.onFalse} user={currentUser} />

        <ConfirmDialog
          open={deleteModal.value}
          onClose={deleteModal.onFalse}
          title="Delete User"
          content="Are you sure you want to delete this user?"
          action={
            <Button
              variant="destructive"
              onClick={() => {
                deleteModal.onFalse();
              }}
            >
              Delete
            </Button>
          }
        />
      </Container>
    </div>
  )
}

export default UsersView

interface IUsers {
  id: string;
  image: string;
  name: string;
  email: string;
  country: string;
  state: string;
  status: 'Active' | 'Pending' | 'Rejected';
}



const data: IUsers[] = [
  {
    id: '1',
    image: '/media/images/altit-fort.jpg',
    name: 'John Doe',
    email: 'contact@bluewaveboating.com',
    country: 'USA',
    state: 'California',
    status: 'Active',
  },
  {
    id: '2',
    image: '/media/images/attabad.jpg',
    name: 'Jane Smith',
    email: 'info@trouthaven.com',
    country: 'USA',
    state: 'Montana',
    status: 'Pending',
  },
  {
    id: '3',
    image: '/media/images/baltit-fort.webp',
    name: 'Mike Johnson',
    email: 'support@lakesideadventures.com',
    country: 'USA',
    state: 'Minnesota',
    status: 'Active',
  },
  {
    id: '4',
    image: '/media/images/eagles-nest-hotel.webp',
    name: 'Sara Wilson',
    email: 'hello@naturenest.com',
    country: 'USA',
    state: 'Oregon',
    status: 'Rejected',
  },
  {
    id: '5',
    image: '/media/images/skardu-hotel.jpg',
    name: 'David Brown',
    email: 'reservations@sunsetcafe.com',
    country: 'USA',
    state: 'Washington',
    status: 'Active',
  },
  {
    id: '6',
    image: '/media/images/serena.jpg',
    name: 'Emma Davis',
    email: 'eco@ecoriderentals.com',
    country: 'USA',
    state: 'California',
    status: 'Pending',
  },
];

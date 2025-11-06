
import { PaginationControls, Table, TableBody, TableDataLoading, TableHeadCustom, TableNoData } from '@/components/ui/table';

import ConfirmDialog from '@/components/comfirm-dialog/confirm-dialog';
import { Container } from '@/components/common/container';
import { Navbar } from '@/components/layouts/layout-3/components/navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useBoolean } from '@/hooks/use-boolean';
import { useGetAllUsersQuery } from '@/store/Reducer/users';
import { useState } from 'react';
import { AdminHeroWithProfile } from '../../profile/profile-hero';
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

  const [currentUser, setCurrentUser] = useState(null);

  const [page, setPage] = useState(1);

  const [globalFilter, setGlobalFilter] = useState('');

  const { data: userData, isLoading, isFetching } = useGetAllUsersQuery({
    page,
    limit: 10,
    search: globalFilter,
  });

  return (

    <div className='md:mx-10 mx-2 my-4 flex flex-col gap-6'>
      <AdminHeroWithProfile />
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
              placeholder="Search User"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full h-10 "
            />
          </div>
          <div className='border rounded-lg my-5 lg:col-span-12'>
            <ScrollArea className="w-full overflow-auto ">
              <div className="min-w-max">
                <Table className="w-full">
                  <TableHeadCustom headLabel={headLabel} />
                  <TableBody>

                    {(isLoading || isFetching) && <TableDataLoading loading={isLoading || isFetching} colSpan={headLabel.length} />}

                    {userData?.data?.users?.map((item: any, index: number) => (
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
                    <TableNoData
                      colSpan={headLabel.length}
                      dataLength={userData?.data?.users?.length || 0}
                    />
                  </TableBody>
                </Table>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <div >
            </div>

            <PaginationControls
              currentPage={page}
              totalPages={userData?.data?.meta?.pages || 1}
              totalRecords={userData?.data?.meta?.total || 0}
              limit={10}
              onPageChange={(p: number) => setPage(p)}
            />

          </div>
        </Card >
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
      </Container >
    </div >
  )
}

export default UsersView



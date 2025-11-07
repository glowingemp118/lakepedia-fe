
import { PaginationControls, Table, TableBody, TableDataLoading, TableHeadCustom, TableNoData } from '@/components/ui/table';

import ConfirmDialog from '@/components/comfirm-dialog/confirm-dialog';
import { Container } from '@/components/common/container';
import { Navbar } from '@/components/layouts/layout-3/components/navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useBoolean } from '@/hooks/use-boolean';
import { useGetAllUsersQuery } from '@/store/Reducer/users';
import { useState } from 'react';
import { AdminHeroWithProfile } from '../../profile/profile-hero';
import { TravelerStatusModal } from '../traveler-status-modal';
import TravelerTableRow from '../traveler-table-row';

const headLabel = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'country', label: 'Country', align: 'left' },
  { id: 'state', label: 'State', align: 'left' },
  {id:"createdAt", label:"Created At", align:'center'},
  { id: 'status', label: 'Status', align: 'center' },
  { id: 'action', label: 'Actions', align: 'center' },
];



const TravelersView = () => {

  const open = useBoolean();

  const deleteModal = useBoolean();

  const [currentTraveler, setCurrentTraveler] = useState(null);

  const [page, setPage] = useState(1);

  const [globalFilter, setGlobalFilter] = useState('');

  const { data: travelerData, isLoading, isFetching } = useGetAllUsersQuery({
    page,
    limit: 10,
    search: globalFilter,
  });
  return (

    <div>
      <AdminHeroWithProfile />
      <Container>
        <Navbar />
      </Container>
      <Container className='grid grid-cols-12'>
        <Card
          className='dark:bg-secondary col-span-12 mt-5 mb-5 px-2 shadow-md md:px-8 lg:col-span-12'
        >
          <div className='flex justify-start items-center flex-row gap-4'>
            <h3 className='text-xl font-semibold md:ml-0 ml-2 my-5'>Travelers List</h3>
          </div>
          <div className='w-full '>
            <Input
              placeholder="Search Traveler"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full h-10 "
            />
          </div>
          <div className='border rounded-lg mt-5 '>
            <Table className="w-full overflow-x-scroll">
              <TableHeadCustom headLabel={headLabel} />
              <TableBody>

                <TableDataLoading loading={isLoading || isFetching} colSpan={headLabel.length} />

                {travelerData?.data?.users?.map((item: any, index: number) => (
                  <TravelerTableRow key={index} item={item}
                    handleEdit={() => {
                      setCurrentTraveler(item);
                      open.onTrue();
                    }}
                    handleDelete={() => {
                      setCurrentTraveler(item);
                      deleteModal.onTrue();
                    }}
                  />
                ))}
                {!(isLoading || isFetching) && <TableNoData
                  colSpan={headLabel.length}
                  dataLength={travelerData?.data?.users?.length || 0}
                />}
              </TableBody>
            </Table>
          </div>

          <div className='mb-5'>
            <PaginationControls
              currentPage={page}
              totalPages={travelerData?.data?.meta?.pages || 1}
              totalRecords={travelerData?.data?.meta?.total || 0}
              limit={10}
              onPageChange={(p: number) => setPage(p)}
            />
          </div>

        </Card >
        <TravelerStatusModal isOpen={open.value} onClose={open.onFalse} traveler={currentTraveler} />

        <ConfirmDialog
          open={deleteModal.value}
          onClose={deleteModal.onFalse}
          title="Delete Traveler"
          content="Are you sure you want to delete this traveler?"
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
    </div >
  )
}

export default TravelersView



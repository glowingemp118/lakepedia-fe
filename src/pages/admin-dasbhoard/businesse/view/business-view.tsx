
import { Table, TableBody, TableHeadCustom } from '@/components/ui/table';

import ConfirmDialog from '@/components/comfirm-dialog/confirm-dialog';
import { Container } from '@/components/common/container';
import { Navbar } from '@/components/layouts/layout-3/components/navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useBoolean } from '@/hooks/use-boolean';
import { useState } from 'react';
import { AdminHeroWithProfile } from '../../profile/profile-hero';
import { BusinessStatusModal } from '../business-status-modal';
import BusinessTableRow from '../business-table-row';

const headLabel = [
  { id: 'name', label: 'Business', align: 'left' },
  { id: 'businessType', label: 'Business Type', align: 'left' },
  { id: 'servicesOffered', label: 'Services Offered', align: 'left' },
  { id: 'status', label: 'Status', align: 'center' },
  { id: 'action', label: '', align: 'right' },
];



const BusinessView = () => {

  const open = useBoolean();

  const deleteModal = useBoolean();
  
  const [currentBusiness, setCurrentBusiness] = useState<IBusiness | null>(null);

  


  return (

    <div className='md:mx-10 mx-2 my-4 flex flex-col gap-6'>
    
      <AdminHeroWithProfile/>
      <Container>
        <Navbar />
      </Container>
      <Container className=''>

        <Card className='mt-5 shadow-md col-span-12 lg:col-span-12  md:px-8 px-2  mb-5  dark:bg-secondary'>

          <div className='flex md:justify-between md:items-center flex-col md:flex-row gap-4'>
            <h3 className='text-xl font-semibold md:ml-0 ml-2 my-5'>Businesses List</h3>
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
                  <BusinessTableRow key={index} item={item}
                    handleEdit={() => {
                      setCurrentBusiness(item);
                      open.onTrue();
                    }}
                    handleDelete={() => {
                      setCurrentBusiness(item);
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
        <BusinessStatusModal isOpen={open.value} onClose={open.onFalse} business={currentBusiness} />

        <ConfirmDialog
          open={deleteModal.value}
          onClose={deleteModal.onFalse}
          title="Delete Business"
          content="Are you sure you want to delete this business?"
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

export default BusinessView

interface IBusiness {
  id: string;
  image: string;
  name: string;
  email: string;
  businessType: string;
  status: 'Active' | 'Pending' | 'Rejected';
  servicesOffered: string[];
}



const data: IBusiness[] = [
  {
    id: '1',
    image: '/media/images/altit-fort.jpg',
    name: 'BlueWave Boating Co.',
    email: 'contact@bluewaveboating.com',
    businessType: 'Boating & Rentals',
    status: 'Active',
    servicesOffered: ['Boat Rentals', 'Jet Ski Tours', 'Guided Lake Cruises'],
  },
  {
    id: '2',
    image: '/media/images/attabad.jpg',
    name: 'Trout Haven Fishing Lodge',
    email: 'info@trouthaven.com',
    businessType: 'Fishing',
    status: 'Pending',
    servicesOffered: ['Fishing Gear Rentals', 'Guided Fishing Trips', 'Boat Hire'],
  },
  {
    id: '3',
    image: '/media/images/baltit-fort.webp',
    name: 'Lakeside Adventures',
    email: 'support@lakesideadventures.com',
    businessType: 'Outdoor Activities',
    status: 'Active',
    servicesOffered: ['Kayaking', 'Canoeing', 'Stand-Up Paddleboarding'],
  },
  {
    id: '4',
    image: '/media/images/eagles-nest-hotel.webp',
    name: 'NatureNest Camping Grounds',
    email: 'hello@naturenest.com',
    businessType: 'Camping',
    status: 'Rejected',
    servicesOffered: ['Tent Rentals', 'Fire Pit Areas', 'Overnight Camping Packages'],
  },
  {
    id: '5',
    image: '/media/images/skardu-hotel.jpg',
    name: 'Sunset Café by the Lake',
    email: 'reservations@sunsetcafe.com',
    businessType: 'Food & Refreshments',
    status: 'Pending',
    servicesOffered: ['Outdoor Dining', 'Lake View Snacks', 'Beverage Bar'],
  },
  {
    id: '6',
    image: '/media/images/serena.jpg',
    name: 'EcoRide Rentals',
    email: 'eco@ecoriderentals.com',
    businessType: 'Biking & Rentals',
    status: 'Active',
    servicesOffered: ['Bike Rentals', 'Electric Scooters', 'Trail Tours'],
  },
];

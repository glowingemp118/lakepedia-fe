
import { PaginationControls, Table, TableBody, TableDataLoading, TableHeadCustom, TableNoData } from '@/components/ui/table';

import ConfirmDialog from '@/components/comfirm-dialog/confirm-dialog';
import { Container } from '@/components/common/container';
import { Navbar } from '@/components/layouts/layout-3/components/navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useBoolean } from '@/hooks/use-boolean';
import { useState } from 'react';
import { AdminHeroWithProfile } from '../../profile/profile-hero';
// import { BusinessStatusModal } from '../business-status-modal';
import ReviewTableRow from '../review-table-row';

const headLabel = [
    { id: 'name', label: 'Name', align: 'left' },
    { id: 'title', label: 'Title', align: 'left' },
    { id: 'description', label: 'Description', align: 'left' },
    { id: "rating", label: "Rating" },
    { id: "type", label: "Type" },
    { id: 'status', label: 'Status', align: 'center' },
    { id: 'action', label: 'Actions', align: 'center' },
];



const ReviewsView = () => {

    const open = useBoolean();

    const deleteModal = useBoolean();

    const [currentBusiness, setCurrentBusiness] = useState(null);

    const [page, setPage] = useState(1);

    const [globalFilter, setGlobalFilter] = useState('');

    const isLoading=false;

    const isFetching=false;

  
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
                        <h3 className='text-xl font-semibold md:ml-0 ml-2 my-5'>Reviews List</h3>
                    </div>
                    <div className='w-full '>
                        <Input
                            placeholder="Search Reviews"
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

                                {reviewsData.map((item: any, index: number) => (
                                    <ReviewTableRow
                                     key={index} item={item}
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
                                {!(isLoading || isFetching) && <TableNoData
                                    colSpan={headLabel.length}
                                    dataLength={reviewsData.length || 0}
                                />}
                            </TableBody>
                        </Table>
                    </div>

                    <div className='mb-5'>
                        <PaginationControls
                            currentPage={page}
                            totalPages={1}
                            totalRecords={reviewsData.length || 0}
                            limit={10}
                            onPageChange={(p: number) => setPage(p)}
                        />
                    </div>

                </Card >
                {/* <BusinessStatusModal isOpen={open.value} onClose={open.onFalse} business={currentBusiness} /> */}

                <ConfirmDialog
                    open={deleteModal.value}
                    onClose={deleteModal.onFalse}
                    title="Delete Business"
                    content="Are you sure you want to delete this Business?"
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

export default ReviewsView

const reviewsData = [
    {
        id: 1,
        user: {
            first_name: "John",
            last_name: "Doe",
            email: "johndoe@gmail.com",
            image: { url: "https://placehold.co/40x40?text=J" }
        },
        title: "Great Service",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        rating: 5,
        type: "Lake Review",
        status: "approved"
    },
    {
        id: 2,
        user: {
            first_name: "Jane",
            last_name: "Smith",
            email: "janesmith@gmail.com",
            image: { url: "https://placehold.co/40x40?text=J" }
        },
        title: "Average Experience",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        rating: 3,
        type: "Business Review",
        status: "pending"
    },
    {
        id: 3,
        user: {
            first_name: "Mike",
            last_name: "Johnson",
            email: "mikejohnson@jpggmail.com",
            image: { url: "https://placehold.co/40x40?text=M" }
        },
        title: "Poor Service",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        rating: 1,
        type: "Fishing Report",
        status: "approved"
    },
    {
        id: 4,
        user: {
            first_name: "Emily",
            last_name: "Davis",
            email: "emilydevis@gmail.com",
            image: { url: "https://placehold.co/40x40?text=E" }
        },
        title: "Excellent Support",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        rating: 4,
        type: "POIs Review",
        status: "approved"
    }

]



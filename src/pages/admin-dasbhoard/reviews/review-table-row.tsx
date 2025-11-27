import { FC } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatDate, toAbsoluteUrl } from '@/lib/helpers';
import { Rating } from '@/partials/common/rating';

interface IReview {
    id: string;
    user: {
        image: { url?: string };
        first_name: string;
        last_name: string;
        email: string;
    }
    title: string;
    description: string;
    rating: number;
    type: string;
    createdAt: string;
    status: 'approved' | 'pending' | 'rejected' ;
}

interface PageProps {
    item: IReview;
    handleEdit?: (id: string) => void;
    handleDelete?: (id: string) => void;
}

const ReviewTableRow: FC<PageProps> = ({ item, handleEdit, handleDelete }) => {
    return (
        <TableRow className="transition-colors  hover:bg-muted/50">
            {/* Image + Name */}

            <TableCell>
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={toAbsoluteUrl((item?.user?.image as { url: string })?.url)} className='cursor-pointer rounded-lg' />
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-medium">{item.user.first_name + " " + item.user.last_name}</span>
                        <span className="text-xs text-gray-500">{item.user.email}</span>
                    </div>
                </div>
            </TableCell>

            <TableCell>
                {item.title?.length > 20 ?
                    (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className="cursor-pointer">
                                        {item.title.slice(0, 20)}...
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {item.title}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ) :
                    item.title
                    || "--"}
            </TableCell>

            <TableCell>
                {item.description?.length > 20 ? (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="cursor-pointer">
                                    {item.description.slice(0, 20)}...
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                {item.description}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ) : (
                    item.description || "--"
                )}
            </TableCell>

            {/* Created At */}
            <TableCell align='center'>
                {/* {item.rating} */}
                <Rating rating={item.rating} readOnly size="sm" />
            </TableCell>
            <TableCell>
                {item.type || "--"}
            </TableCell>

            {/* Status */}
            <TableCell align='center'>
                <Badge variant={
                    (item.status === "approved" && "success") ||
                    (item.status === "pending" && "warning") ||
                    (item.status === "rejected" && "destructive") ||
                    "primary"
                }
                    appearance={"light"}
                    className='capitalize'
                >{item.status}</Badge>
            </TableCell>



            <TableCell align='center' className='flex gap-2 items-center justify-center'>

                <button
                    title="View Details"
                    type="button"
                    className="p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition cursor-pointer "
                >
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Eye className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                            </TooltipTrigger>
                            <TooltipContent>View Details</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </button>
                <button
                    title="Edit Event"
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleEdit?.(item.id);
                    }}
                    className="p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition cursor-pointer"
                >
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Pencil className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                            </TooltipTrigger>
                            <TooltipContent>Edit</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </button>

                {/* <button
                    title="Delete Event"
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete?.(item.id);
                    }}
                    className="p-1.5 rounded-md bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 transition cursor-pointer"
                >
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Trash2 className="w-4 h-4 text-red-600 dark:text-red-300" />
                            </TooltipTrigger>
                            <TooltipContent>Delete</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </button> */}
            </TableCell>
        </TableRow>
    );
};

export default ReviewTableRow;

import { FC } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toAbsoluteUrl } from '@/lib/helpers';

interface IBusiness {
    id: string;
    image: string;
    name: string;
    email: string;
    businessType: string;
    status: 'Active' | 'Pending' | 'Rejected';
    servicesOffered: string[];
}

interface PageProps {
    item: IBusiness;
    handleEdit?: (id: string) => void;
    handleDelete?: (id: string) => void;
}

const BusinessTableRow: FC<PageProps> = ({ item, handleEdit, handleDelete }) => {
    return (
        <TableRow className="transition-colors  hover:bg-muted/50">
            {/* Image + Name */}

            <TableCell>
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={toAbsoluteUrl(item.image)} className='cursor-pointer rounded-lg' />
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-xs text-gray-500">{item.email}</span>
                    </div>
                </div>
            </TableCell>

            {/* Business Type */}
            <TableCell>
                {item.businessType}
            </TableCell>

            {/* Services Offered */}
            <TableCell>
                {item.servicesOffered.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                        {item.servicesOffered.map((service, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                                {service}
                            </Badge>
                        ))}
                    </div>
                ) : (
                    'N/A'
                )}
            </TableCell>

            {/* Status */}
            <TableCell className="text-center">
                <Badge variant={
                    (item.status === "Active" && "success") ||
                    (item.status === "Pending" && "warning") ||
                    (item.status === "Rejected" && "destructive") ||
                    "primary"
                }
                    appearance={"light"}
                >{item.status}</Badge>
            </TableCell>

            <TableCell className="text-end">
                <div className="flex gap-2 ">

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

                    <button
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
                    </button>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default BusinessTableRow;

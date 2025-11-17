import ConfirmDialog from '@/components/comfirm-dialog/confirm-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useBoolean } from '@/hooks/use-boolean';
import QuickAddEditTripModal from '@/pages/traveler-dashboard/trips/quick-add-edit-trip-modal';
import { useDeleteLakeMutation } from '@/store/Reducer/lake';
import { selectUser } from '@/store/slices/userSlice';
import { LoaderCircleIcon, Pencil, Trash } from 'lucide-react';
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export function DropdownMenu2({ trigger, id, trip }: { trigger: ReactNode, id: string, trip?: any }) {

  const open = useBoolean();

  const edit = useBoolean();

  const user = useSelector(selectUser);

  const [deleteLake, { isLoading }] = useDeleteLakeMutation();

  const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    open.onTrue();
  }

  const handleEdit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    edit.onTrue();
  }

  const onDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    let response = await deleteLake(id);

    if (!response.error) {
      toast.success("Lake deleted successfully");
      open.onFalse();
    }
  }

  return (

    <div>
      <DropdownMenu >
        <DropdownMenuTrigger asChild >{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-[150px]" side="bottom" align="end" >
          {user?.role === "business" && <DropdownMenuItem asChild onClick={handleDelete}>
            <Link to="#" className='cursor-pointer flex items-center gap-2'>
              <Trash color='red' size={16} />
              <span>Delete</span>
            </Link>
          </DropdownMenuItem>}
          {user?.role === "traveler" && <>
            <DropdownMenuItem asChild onClick={handleEdit}>
              <Link to="#" className='cursor-pointer flex items-center gap-2'>
                <Pencil size={16} />
                <span>Edit</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild onClick={()=>{}}>
              <Link to="#" className='cursor-pointer flex items-center gap-2'>
                <Trash color='red' size={16} />
                <span>Delete</span>
              </Link>
            </DropdownMenuItem>
          </>
          }
        </DropdownMenuContent>
      </DropdownMenu>

      <QuickAddEditTripModal open={edit.value} onClose={edit.onFalse} currentTrip={trip} />

      <ConfirmDialog open={open.value} onClose={open.onFalse}
        title="Delete Lake"
        content="Are you sure you want to delete this lake?"
        action={
          <Button onClick={onDelete} disabled={isLoading} variant={"destructive"}>
            {isLoading ? <span className="flex items-center gap-2">
              <LoaderCircleIcon className="h-4 w-4 animate-spin" /> Loading...
            </span> : "Delete Lake"}</Button>
        }
      />
    </div>
  );
}

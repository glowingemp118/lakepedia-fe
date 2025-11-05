import ConfirmDialog from '@/components/comfirm-dialog/confirm-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useBoolean } from '@/hooks/use-boolean';
import { useDeleteLakeMutation } from '@/store/Reducer/lake';
import { LoaderCircleIcon, Trash } from 'lucide-react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export function DropdownMenu2({ trigger, id }: { trigger: ReactNode, id: string }) {

  const open = useBoolean();

  const [deleteLake, { isLoading }] = useDeleteLakeMutation();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    open.onTrue();
  }

  const onDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
   
    let response = await deleteLake(id);
   
    if (!response.error) {
      toast.success("Lake deleted successfully");
      open.onFalse();
    }
  }
  return (

    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-[150px]" side="bottom" align="end" onClick={handleDelete}>
          <DropdownMenuItem asChild>
            <Link to="#" className='cursor-pointer flex items-center gap-2'>
              <Trash color='red' size={16} />
              <span>Delete</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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

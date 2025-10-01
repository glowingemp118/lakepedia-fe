import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Trash } from 'lucide-react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export function DropdownMenu3({ trigger }: { trigger: ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-[150px]" side="bottom" align="end">
        <DropdownMenuItem asChild>
          <Link to="#" className='cursor-pointer flex items-center gap-2'>
            <Trash color='red' size={16} />
            <span>Delete</span>
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem asChild>
          <Link to="#">
            <Share2 />
            <span>Share</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="#">
            <FileUp />
            <span>Export</span>
          </Link>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

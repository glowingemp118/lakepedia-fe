import { Link } from 'react-router-dom';
import {
  LayoutGrid,
  MessageCircleMore,
  MessageSquareDot,
  Search,
} from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { ChatSheet } from '../../layout-1/shared/topbar/chat-sheet';
import { SearchDialog } from '../../layout-1/shared/dialogs/search/search-dialog';
import { UserDropdownMenu } from '../../layout-1/shared/topbar/user-dropdown-menu';
import { AppsDropdownMenu } from '../../layout-1/shared/topbar/apps-dropdown-menu';
import { NotificationsSheet } from '../../layout-1/shared/topbar/notifications-sheet';
import { selectUser } from '@/store/slices/userSlice';
import { useSelector } from 'react-redux';

export function HeaderTopbar() {
 
  const user=useSelector(selectUser);

  return (
    <div className="flex items-center gap-2 lg:gap-3.5">
   
      <SearchDialog
        trigger={
          <Button
            variant="ghost"
            mode="icon"
            shape="circle"
            className="hover:[&_svg]:text-primary"
          >
            <Search className="size-4.5!" />
          </Button>
        }
      />
      <ChatSheet
        trigger={
          <Button
            variant="ghost"
            mode="icon"
            shape="circle"
            className="hover:[&_svg]:text-primary"
          >
            <MessageCircleMore className="size-4.5!" />
          </Button>
        }
      />
      <AppsDropdownMenu
        trigger={
          <Button
            variant="ghost"
            mode="icon"
            shape="circle"
            className="hover:[&_svg]:text-primary"
          >
            <LayoutGrid className="size-4.5!" />
          </Button>
        }
      />
      <NotificationsSheet
        trigger={
          <Button
            variant="ghost"
            mode="icon"
            shape="circle"
            className="hover:[&_svg]:text-primary"
          >
            <MessageSquareDot className="size-4.5!" />
          </Button>
        }
      />
      <UserDropdownMenu
        trigger={
          <img
            className="size-9 rounded-full border-2 border-input shrink-0 cursor-pointer"
            src={user?.image as string || toAbsoluteUrl('/media/avatars/gray/5.png')}
            alt="User Avatar"
          />
        }
      />
    </div>
  );
}

import { NavbarMenu } from './navbar-menu';

export function Navbar() {
  return (
    <div className="flex items-stretch  start-(--sidebar-width) end-5 h-(--navbar-height) mx-5 lg:mx-0 ">
      <div className="rounded-t-xl  border-b bg-background flex items-stretch grow">
        <div className="container flex justify-between items-stretch gap-5 ">
          <NavbarMenu />
          {/* <NavbarLinks /> */}
        </div>
      </div>
    </div>
  );
}

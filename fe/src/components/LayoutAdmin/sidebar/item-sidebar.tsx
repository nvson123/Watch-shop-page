import { clx } from '@medusajs/ui';
import { Link, useLocation } from '@tanstack/react-router';

const ItemSidebar = ({ href, id, name, icon }: MenuItem) => {
  let isActive = false;
  const { pathname } = useLocation();

  if (pathname === '/dashboard' && pathname === href) {
    isActive = true;
  } else if (pathname !== '/dashboard' && href.includes(pathname)) {
    isActive = true;
  }
  return (
    <li className="list-none">
      <Link
        to={href}
        className={clx(
          'txt-compact-small-plus flex w-full items-center rounded-md border-ui-bg-base px-2 py-1.5 text-ui-fg-subtle hover:bg-ui-bg-base-hover',
          {
            'border-ui-border-base bg-ui-bg-base-pressed': isActive,
          }
        )}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-2">
            {icon}
            {name}
          </div>
          <div>{id === 2 && <p className="text-ui-fg-muted">12</p>}</div>
        </div>
      </Link>
    </li>
  );
};

export default ItemSidebar;

import { ArrowDownRightMini, ArrowRightOnRectangle } from '@medusajs/icons';
import { Avatar, DropdownMenu, toast } from '@medusajs/ui';
import { Link, useNavigate } from '@tanstack/react-router';

const ProfileHeader = () => {
  const navigate = useNavigate({ from: '/login' });

  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');

    toast.success('Đăng xuất', {
      description: 'Bạn đã đăng xuất thành công',
      duration: 1000,
    });
    navigate({ to: '/login' });
  };

  const storedData = JSON.parse(localStorage.getItem('user') || '{}');
  const username = storedData?.user?.username || 'Không có tên người dùng';

  return (
    <div className="hidden items-center gap-5 lg:flex">
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <button type="button" className="flex items-center gap-3 text-left">
            <Avatar variant="squared" src="/admin.jpg" fallback="" />
            <div>
              <p className="txt-compact-small-plus text-ui-code-bg-base">
                {username}
              </p>
              <p className="text-ui-code-icon txt-compact-xsmall">
                super_admin
              </p>
            </div>
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>
            <Link to="/" className="flex">
              <ArrowDownRightMini className="mr-2" />
              Website
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={onLogout}>
            <ArrowRightOnRectangle className="mr-2" />
            Đăng xuất
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
};

export default ProfileHeader;

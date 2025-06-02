import ProfileHeader from '@/components/user/profile-header.tsx';
import { TriangleRightMini } from '@medusajs/icons';

type HeaderProps = {
  title: string;
  titleDetail?: string;
};

const Header = ({ title, titleDetail }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b border-ui-border-base bg-ui-bg-base px-6 py-3">
      <div className="txt-compact-medium-plus flex items-center gap-x-1 font-medium text-ui-fg-subtle">
        <p>{title}</p>

        {titleDetail && <TriangleRightMini />}
        <p>{titleDetail}</p>
      </div>
      <ProfileHeader />
    </div>
  );
};

export default Header;

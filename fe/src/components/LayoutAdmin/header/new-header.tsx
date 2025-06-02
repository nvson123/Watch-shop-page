import ProfileHeader from '@/components/user/profile-header.tsx';
import { TriangleRightMini } from '@medusajs/icons';
import { Link } from '@tanstack/react-router';
import { Fragment } from 'react';

const NewHeader = ({
  breadcrumbs,
}: {
  breadcrumbs: { title: string; href?: string }[];
}) => {
  return (
    <div className="flex items-center justify-between border-b border-ui-border-base bg-ui-bg-base px-6 py-3">
      <div className="txt-compact-medium-plus flex items-center gap-x-1 font-medium text-ui-fg-subtle">
        {breadcrumbs.map((item, index) => (
          <Fragment key={index}>
            {index > 0 && <TriangleRightMini />}
            {item.href ? (
              <Link to={item.href}>{item.title}</Link>
            ) : (
              <p>{item.title}</p>
            )}
          </Fragment>
        ))}
      </div>

      <ProfileHeader />
    </div>
  );
};

export default NewHeader;

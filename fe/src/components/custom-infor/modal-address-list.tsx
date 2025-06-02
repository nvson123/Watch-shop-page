import instance from '@/api/axiosIntance';
import { FocusModal } from '@/components/ui/custom-focus-modal';
import { useFetchAddress } from '@/data/address/useFetchAddress';
import { Badge, Button, toast } from '@medusajs/ui';
import { Plus } from '@medusajs/icons';
import { useEffect, useState } from 'react';
import ModalCreateCustomInfor from './modal-create-custom-infor';

const ModalListCustomInfor = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);

  const openCreateModal = () => {
    setCurrentAddress(null);
    setIsModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsModalOpen(false);
    refetch();
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const { data, isLoading, error, refetch } = useFetchAddress(userId);
  console.log('address', data);

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    console.error('Lỗi khi tải địa chỉ:', error);
    return <div>Lỗi khi tải địa chỉ. Vui lòng thử lại.</div>;
  }

  const sortedAddresses = data?.data.sort((a, b) =>
    a.isDefault ? -1 : b.isDefault ? 1 : 0
  );

  const updateIsDefault = async (addressId: string | undefined) => {
    if (!addressId) {
      console.error('Không tìm thấy addressId:', addressId);
      toast.error('Không tìm thấy addressId!');
      return;
    }

    if (!userId) {
      console.error('Không tìm thấy userId:', userId);
      toast.error('Không tìm thấy userId!');
      return;
    }

    try {
      const selectedAddress = data?.data.find(
        address => address._id === addressId
      );
      if (!selectedAddress) {
        console.error('Địa chỉ không tồn tại với ID:', addressId);
        toast.error('Địa chỉ không tồn tại!');
        return;
      }

      if (selectedAddress.isDefault) {
        console.log('Địa chỉ đã là mặc định:', addressId);
        toast.info('Địa chỉ này đã là mặc định!');
        return;
      }

      console.log('Gửi yêu cầu cập nhật địa chỉ ID:', addressId);
      const response = await instance.put(
        `/editcustomer/${addressId}/${userId}`,
        {
          isDefault: true,
        }
      );

      if (response?.data?.success) {
        console.log('Cập nhật thành công cho địa chỉ ID:', addressId);
        toast.success('Cập nhật địa chỉ mặc định thành công!');
        refetch();
      } else {
        console.error(
          'Không thể cập nhật địa chỉ mặc định, phản hồi server:',
          response?.data
        );
        toast.error('Không thể cập nhật địa chỉ mặc định!');
      }
    } catch (error: any) {
      console.error('Lỗi khi cập nhật địa chỉ mặc định:', error);
      toast.error('Cập nhật địa chỉ mặc định thất bại!');
    }
  };

  const deleteEntity = async (addressId: string) => {
    if (!userId) {
      toast.error('Không tìm thấy userId!');
      return;
    }

    try {
      const response = await instance.delete(
        `/customer/${userId}/${addressId}`
      );

      if (response?.data?.success) {
        toast.success('Xoá địa chỉ thành công!');
        refetch();
      } else {
        toast.error('Không thể xoá địa chỉ!');
      }
    } catch (error: any) {
      console.error('Lỗi khi xoá địa chỉ:', error);
      toast.error('Xoá địa chỉ thất bại!');
    }
  };

  return (
    <FocusModal open={isOpen} onOpenChange={onClose}>
      <FocusModal.Content className="m-auto h-fit max-h-[76%] w-[calc(100%-24px)] max-w-[650px] overflow-visible overflow-y-scroll">
        <FocusModal.Header className="flex flex-row-reverse px-8 py-6 [&_kbd]:hidden">
          <p className="font-semibold">Danh Sách Địa Chỉ</p>
        </FocusModal.Header>
        <div className="">
          <div className="max-h-[350px] overflow-y-scroll">
            {sortedAddresses?.map(address => (
              <div
                key={address.id}
                className="mb-1 justify-start rounded-lg border-b bg-white shadow sm:space-x-0"
              >
                <div className="flex justify-between p-7">
                  <div>
                    <h1 className="mt-1 flex flex-col text-lg">
                      {address.name}{' '}
                      <p className="text-[16px]"> {address.phone}</p>
                    </h1>
                    <h1 className="text-sm">{address.address}</h1>
                    <h1 className="mb-2">
                      {address.ward}, {address.district}, {address.city}
                    </h1>
                    {address.isDefault && <Badge color="red">Mặc Định</Badge>}
                  </div>
                  <div className="mt-2 flex flex-col items-center">
                    {!address.isDefault && (
                      <p
                        className="mt-3 cursor-pointer border p-2 text-black"
                        onClick={() => updateIsDefault(address._id)}
                      >
                        Thiết Lập Là Mặc Định
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-start px-4 pb-2">
            <button onClick={openCreateModal} className="flex justify-end">
              <Plus />
              Thêm địa chỉ
            </button>
          </div>
          <ModalCreateCustomInfor
            isOpen={isModalOpen}
            onClose={closeCreateModal}
          />
        </div>
      </FocusModal.Content>
    </FocusModal>
  );
};

export default ModalListCustomInfor;

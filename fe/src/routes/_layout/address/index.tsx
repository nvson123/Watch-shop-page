import ModalCreateCustomInfor from '@/components/custom-infor/modal-create-custom-infor';
import ModalUpdateCustomInfor from '@/components/custom-infor/modal-edit-custom-infor';
import CustomUser from '@/components/useroder/custom-menu';
import useCustomerMutation from '@/data/address/useAddressMutation';
import { useFetchAddress } from '@/data/address/useFetchAddress';
import { queryClient } from '@/main';
import { ChevronRightMini, Plus } from '@medusajs/icons';
import { Badge, Button, usePrompt } from '@medusajs/ui';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/_layout/address/')({
  component: Address,
});

function Address() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // Thêm trạng thái cho modal cập nhật
  const [userId, setUserId] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const { createCustomer, deleteCustomer } = useCustomerMutation();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const { data, isLoading, error, refetch } = useFetchAddress(userId);

  const openCreateModal = () => {
    setCurrentAddress(null);
    setIsModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsModalOpen(false);
    refetch();
  };

  const openUpdateModal = address => {
    setCurrentAddress(address);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    refetch();
  };

  const dialog = usePrompt();

  const deleteEntity = async (id: string) => {
    const userHasConfirmed = await dialog({
      title: 'Xoá Địa Chỉ',
      description: 'Bạn có chắc chắn muốn xoá địa chỉ này ?',
    });
    if (userHasConfirmed) {
      await deleteCustomer.mutate({ id });
      queryClient.invalidateQueries(['customers']);
    }
  };

  const sortedAddresses = data?.data.sort((a, b) =>
    a.isDefault ? -1 : b.isDefault ? 1 : 0
  );

  return (
    <div className="bg-gray-50">
      <div className="bg-white">
        <div className="main-content flex h-48 w-full flex-col items-center justify-center">
          <div className="text-content">
            <div className="text-center text-4xl font-semibold">Địa Chỉ</div>
            <div className="link caption1 mt-3 flex items-center justify-center gap-1">
              <div className="flex items-center justify-center">
                <Link to="/">Trang chủ</Link>
                <ChevronRightMini />
              </div>
              <div className="capitalize text-gray-500">
                <Link to="/address">Địa Chỉ</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl bg-gray-50 py-10 pt-10">
        <CustomUser />
        <div className="ml-6 w-3/4">
          <div className="mb-2 flex justify-between">
            <h1 className="text-xl">Địa chỉ của bạn</h1>
            <Button onClick={openCreateModal}>
              <Plus />
              Thêm địa chỉ
            </Button>
            <ModalCreateCustomInfor
              isOpen={isModalOpen}
              onClose={closeCreateModal}
            />
            {currentAddress && (
              <ModalUpdateCustomInfor
                isOpen={isUpdateModalOpen}
                onClose={closeUpdateModal}
                address={currentAddress}
              />
            )}
          </div>
          {isLoading ? (
            <div>Bạn chưa có địa chỉ nào !</div>
          ) : (
            <div>
              {sortedAddresses?.map(address => (
                <div
                  key={address.id}
                  className="mb-2 justify-start rounded-lg border-b bg-white shadow sm:space-x-0"
                >
                  <div className="flex justify-between p-7">
                    <div>
                      <h1 className="mt-1 text-lg">
                        {address.name}, {address.phone}
                      </h1>
                      <h1 className="mt-2 text-sm">{address.address}</h1>
                      <h1 className="mb-2">
                        {address.ward}, {address.district}, {address.city}
                      </h1>
                      {address.isDefault && <Badge color="red">Mặc Định</Badge>}
                    </div>
                    <div className="mt-2 flex flex-col items-center">
                      <p
                        className="cursor-pointer text-blue-400"
                        onClick={() => openUpdateModal(address)}
                      >
                        Cập Nhật
                      </p>
                      <p
                        className="cursor-pointer text-red-500"
                        onClick={() => deleteEntity(address._id)}
                      >
                        Xoá
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

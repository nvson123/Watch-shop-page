import { FocusModal } from '@/components/ui/custom-focus-modal';
import { Button, Input, Label } from '@medusajs/ui';
import { useState, useEffect } from 'react';
import { toast } from '@medusajs/ui';
import axios from 'axios';
import useCustomerMutation from '@/data/address/useAddressMutation';

interface Ward {
  Id: string;
  Name: string;
}

interface District {
  Id: string;
  Name: string;
  Wards: Ward[];
}

interface City {
  Id: string;
  Name: string;
  Districts: District[];
}

const ModalUpdateCustomInfor = ({
  isOpen,
  onClose,
  address,
}: {
  isOpen: boolean;
  onClose: () => void;
  address: any;
}) => {
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    userId: '',
    name: '',
    phone: '',
    city: '',
    district: '',
    ward: '',
    address: '',
    isDefault: false,
  });

  const { editCustomer } = useCustomerMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'
        );
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
        toast.error('Không thể tải dữ liệu tỉnh/thành phố.');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (address) {
      setFormData({
        id: address._id,
        userId: address.userId || '',
        name: address.name || '',
        phone: address.phone || '',
        city: address.city || '',
        district: address.district || '',
        ward: address.ward || '',
        address: address.address || '',
        isDefault: address.isDefault || false,
      });

      const selectedCity = cities.find(city => city.Name === address.city);
      setDistricts(selectedCity?.Districts || []);
      const selectedDistrict = selectedCity?.Districts.find(
        district => district.Name === address.district
      );
      setWards(selectedDistrict?.Wards || []);
    }
  }, [address, cities]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityName = event.target.value;
    setFormData({ ...formData, city: cityName, district: '', ward: '' });
    const selectedCity = cities.find(city => city.Name === cityName);
    setDistricts(selectedCity ? selectedCity.Districts : []);
    setWards([]);
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const districtName = event.target.value;
    setFormData({ ...formData, district: districtName, ward: '' });
    const selectedDistrict = districts.find(
      district => district.Name === districtName
    );
    setWards(selectedDistrict ? selectedDistrict.Wards : []);
  };

  const handleCheckboxChange = () => {
    setFormData({ ...formData, isDefault: !formData.isDefault });
  };

  const handleUpdateAddress = async () => {
    const {
      id,
      userId,
      name,
      phone,
      city,
      district,
      ward,
      address,
      isDefault,
    } = formData;

    if (!userId) {
      toast.error('Lỗi: Thiếu thông tin người dùng.');
      return;
    }

    if (!name || !phone || !city || !district || !ward || !address) {
      toast.error('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    setIsUpdating(true);
    try {
      await editCustomer.mutateAsync({
        id,
        userId,
        name,
        phone,
        city,
        district,
        ward,
        address,
        isDefault,
      });
      onClose();
    } catch (error) {
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <FocusModal open={isOpen} onOpenChange={onClose}>
      <FocusModal.Content className="m-auto h-fit max-h-[80%] w-[calc(100%-24px)] max-w-[650px] overflow-visible">
        <FocusModal.Header className="flex flex-row-reverse px-8 py-6 [&_kbd]:hidden">
          <p className="font-semibold">Cập Nhật Địa Chỉ</p>
        </FocusModal.Header>
        <div className="flex h-full flex-col justify-between overflow-y-auto p-8">
          <div className="gap- flex flex-wrap justify-between gap-y-4">
            <div className="space-y-2">
              <Label>Tên Người Nhận</Label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Tên người nhận"
                className="block w-[276px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              />
            </div>
            <div className="space-y-2">
              <Label>Số Điện Thoại</Label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Số điện thoại"
                className="block w-[276px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              />
            </div>
            <div className="space-y-2">
              <Label>Tỉnh/Thành Phố</Label>
              <select
                name="city"
                value={formData.city}
                onChange={handleCityChange}
                className="block w-[276px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              >
                <option value="">Chọn tỉnh/thành phố</option>
                {cities.map(city => (
                  <option key={city.Id} value={city.Name}>
                    {city.Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Quận/Huyện</Label>
              <select
                name="district"
                value={formData.district}
                onChange={handleDistrictChange}
                className="block w-[276px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              >
                <option value="">Chọn quận/huyện</option>
                {districts.map(district => (
                  <option key={district.Id} value={district.Name}>
                    {district.Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Xã/Phường</Label>
              <select
                name="ward"
                value={formData.ward}
                onChange={handleInputChange}
                className="block w-[276px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              >
                <option value="">Chọn xã/phường</option>
                {wards.map(ward => (
                  <option key={ward.Id} value={ward.Name}>
                    {ward.Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Địa Chỉ Cụ Thể</Label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Địa chỉ cụ thể"
                className="block w-[276px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              />
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={formData.isDefault}
                onChange={handleCheckboxChange}
                className="mt-0.5 h-4 w-4"
              />
              <Label>Đặt Là Địa Chỉ Mặc Định</Label>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-x-2 border-t border-ui-border-base pb-6 pr-8 pt-4">
          <Button
            variant="primary"
            type="button"
            onClick={handleUpdateAddress}
            disabled={isUpdating}
          >
            {isUpdating ? 'Đang cập nhật...' : 'Cập Nhật'}
          </Button>
        </div>
      </FocusModal.Content>
    </FocusModal>
  );
};

export default ModalUpdateCustomInfor;

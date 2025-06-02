import { FocusModal } from '@/components/ui/custom-focus-modal';
import { Button, Label } from '@medusajs/ui';
import { useState, useEffect } from 'react';
import { toast } from '@medusajs/ui';
import axios from 'axios';
import useCustomerMutation from '@/data/address/useAddressMutation';
import { useForm } from 'react-hook-form';

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

const ModalCreateCustomInfor = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    phone: '',
    city: '',
    district: '',
    ward: '',
    address: '',
  });

  const { createCustomer } = useCustomerMutation();

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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = event.target.value;
    setFormData({ ...formData, city: cityId, district: '', ward: '' });
    const selectedCity = cities.find(city => city.Id === cityId);
    setDistricts(selectedCity ? selectedCity.Districts : []);
    setWards([]);
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const districtId = event.target.value;
    setFormData({ ...formData, district: districtId, ward: '' });
    const selectedDistrict = districts.find(
      district => district.Id === districtId
    );
    setWards(selectedDistrict ? selectedDistrict.Wards : []);
  };

  const getCityName = (cityId: string) =>
    cities.find(city => city.Id === cityId)?.Name || '';

  const getDistrictName = (cityId: string, districtId: string) =>
    cities
      .find(city => city.Id === cityId)
      ?.Districts.find(district => district.Id === districtId)?.Name || '';

  const getWardName = (cityId: string, districtId: string, wardId: string) =>
    cities
      .find(city => city.Id === cityId)
      ?.Districts.find(district => district.Id === districtId)
      ?.Wards.find(ward => ward.Id === wardId)?.Name || '';

  const handleAddAddress = () => {
    const { name, phone, city, district, ward, address } = formData;

    if (!name || !phone || !city || !district || !ward || !address) {
      toast.error('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const userId = localStorage.getItem('userId');
    const cityName = getCityName(city);
    const districtName = getDistrictName(city, district);
    const wardName = getWardName(city, district, ward);

    createCustomer.mutateAsync({
      userId,
      name,
      phone,
      city: cityName,
      district: districtName,
      ward: wardName,
      address,
    });
    onClose();
  };

  return (
    <FocusModal open={isOpen} onOpenChange={onClose}>
      <FocusModal.Content className="m-auto h-fit max-h-[80%] w-[calc(100%-24px)] max-w-[650px] overflow-visible">
        <FocusModal.Header className="flex flex-row-reverse px-8 py-6 [&_kbd]:hidden">
          <p className="font-semibold">Thêm Địa Chỉ Mới</p>
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
                  <option key={city.Id} value={city.Id}>
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
                  <option key={district.Id} value={district.Id}>
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
                  <option key={ward.Id} value={ward.Id}>
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
          </div>
        </div>
        <div className="flex justify-end gap-x-2 border-t border-ui-border-base pb-6 pr-8 pt-4">
          <Button variant="primary" type="button" onClick={handleAddAddress}>
            Thêm Địa Chỉ
          </Button>
        </div>
      </FocusModal.Content>
    </FocusModal>
  );
};

export default ModalCreateCustomInfor;

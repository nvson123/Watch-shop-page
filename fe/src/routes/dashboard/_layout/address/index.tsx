import Header from '@/components/layoutAdmin/header/header';
import { createFileRoute } from '@tanstack/react-router';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import { Button, toast } from '@medusajs/ui';
import axios from 'axios';

export const Route = createFileRoute('/dashboard/_layout/address/')({
  component: Address,
});

const containerStyle = {
  width: '100%',
  height: '500px',
};

interface Location {
  _id: string;
  lat: number;
  lng: number;
}

function Address() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyALyc7VkotxfAcosGTKmz9HnCUxwty4BQk',
  });

  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // State lưu trữ giá trị của ô nhập liệu
  const [latInput, setLatInput] = useState<number | string>('');
  const [lngInput, setLngInput] = useState<number | string>('');

  // Lưu vị trí lên server
  const handleSaveLocation = async () => {
    if (!latInput || !lngInput) {
      toast('Vui lòng chọn tọa độ trước khi lưu.');
      return;
    }

    try {
      const coordinates = {
        lat: parseFloat(latInput.toString()),
        lng: parseFloat(lngInput.toString()),
      };

      await axios.post(`http://localhost:8080/api/save`, coordinates);
      toast('Lưu vị trí thành công!');
      handleSearch(); // Cập nhật danh sách tọa độ sau khi lưu
    } catch (error) {
      console.error('Error saving location:', error);
      toast('Không thể lưu vị trí. Hãy kiểm tra lại kết nối.');
    }
  };

  // Lấy danh sách vị trí từ server
  const handleSearch = async (showToast = false) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/all`);
      if (Array.isArray(response.data)) {
        const locationsData: Location[] = response.data;
        setLocations(locationsData);

        // Lấy tọa độ mới nhất (nếu có)
        if (locationsData.length > 0) {
          const latestLocation = locationsData[locationsData.length - 1];
          setLatInput(latestLocation.lat);
          setLngInput(latestLocation.lng);
          setCoordinates({
            lat: latestLocation.lat,
            lng: latestLocation.lng,
          });
        }

        if (map) {
          const bounds = new window.google.maps.LatLngBounds();
          locationsData.forEach(loc => {
            bounds.extend(new window.google.maps.LatLng(loc.lat, loc.lng));
          });
          map.fitBounds(bounds);
        }
        if (showToast) {
          toast('Lấy danh sách tọa độ thành công');
        }
      } else {
        toast('Dữ liệu không đúng định dạng!');
      }
    } catch (error) {
      toast('Không thể lấy danh sách tọa độ.');
    }
  };

  useEffect(() => {
    handleSearch(); // Gọi hàm khi tải trang, không hiển thị toast
  }, []);
  const handleDeleteLocation = async (id: string) => {
    if (!id) {
      toast('Không tìm thấy ID tọa độ cần xóa.');
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/address/${id}`
      );

      if (response.status === 200) {
        toast('Xóa tọa độ thành công!');
        handleSearch(); // Lấy lại danh sách sau khi xóa
      } else {
        toast(`Không thể xóa tọa độ. Mã trạng thái: ${response.status}`);
      }
    } catch (error: any) {
      if (error.response) {
        console.error('Lỗi từ server:', error.response.data);
        toast(
          `Không thể xóa tọa độ: ${error.response.data.message || 'Lỗi không xác định.'}`
        );
      } else if (error.request) {
        console.error('Không nhận được phản hồi từ server:', error.request);
        toast('Không thể kết nối đến server. Hãy thử lại sau.');
      } else {
        console.error('Lỗi khi thực hiện yêu cầu:', error.message);
        toast('Đã xảy ra lỗi. Hãy thử lại sau.');
      }
    }
  };
  return (
    <div>
      <Header title="Vị trí cửa hàng" />
      <div className="mx-6 mt-4 flex flex-col gap-1 rounded-lg border border-gray-200 bg-ui-bg-base px-6 py-4">
        <div>
          <div className="pb-3">
            <div className="flex justify-between">
              <div>
                {/* Gán giá trị và sự kiện thay đổi */}
                <input
                  type="text"
                  className="w-80 rounded border px-2 py-1"
                  value={latInput}
                  onChange={e => setLatInput(e.target.value)}
                  placeholder="Vĩ độ"
                />
                <span>-</span>
                <input
                  type="text"
                  className="w-80 rounded border px-2 py-1"
                  value={lngInput}
                  onChange={e => setLngInput(e.target.value)}
                  placeholder="Kinh độ"
                />
              </div>
              <Button onClick={() => handleSearch(true)}>
                Lấy danh sách tọa độ
              </Button>
            </div>
          </div>

          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={coordinates || { lat: 10.8231, lng: 106.6297 }} // Default: TP.HCM
              zoom={15}
              onLoad={mapInstance => setMap(mapInstance)}
              onClick={e => {
                const newCoordinates = {
                  lat: e.latLng.lat(),
                  lng: e.latLng.lng(),
                };
                setCoordinates(newCoordinates);
                setLatInput(newCoordinates.lat);
                setLngInput(newCoordinates.lng);
              }}
            >
              {coordinates && <Marker position={coordinates} />}
              {locations.map(loc => (
                <Marker
                  key={loc._id}
                  position={{ lat: loc.lat, lng: loc.lng }}
                />
              ))}
            </GoogleMap>
          ) : (
            <div>Loading...</div>
          )}

          <div className="mt-3 flex items-center justify-between">
            <span>
              Tọa độ hiện tại: <strong>{latInput || 'N/A'}</strong>,{' '}
              <strong>{lngInput || 'N/A'}</strong>
            </span>
            <div className="flex space-x-2">
              <Button onClick={handleSaveLocation}>Lưu vị trí</Button>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="mb-2 text-lg font-semibold">Danh sách tọa độ</h3>
          {locations.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">#</th>
                  <th className="border border-gray-300 px-4 py-2">ID</th>
                  <th className="border border-gray-300 px-4 py-2">Vĩ độ</th>
                  <th className="border border-gray-300 px-4 py-2">Kinh độ</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {locations.map((loc: Location, index) => (
                  <tr key={loc._id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {loc._id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {loc.lat}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {loc.lng}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <Button
                        onClick={() => handleDeleteLocation(loc._id)}
                        variant="destructive"
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Không có tọa độ nào được lưu.</p>
          )}
        </div>
      </div>
    </div>
  );
}

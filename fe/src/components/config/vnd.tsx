const CurrencyVND = ({ amount }) => {
  const formatVND = amount => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return <span>{formatVND(amount)}</span>;
};

export default CurrencyVND;

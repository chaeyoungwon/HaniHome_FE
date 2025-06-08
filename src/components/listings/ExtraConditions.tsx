const ExtraConditions = () => {
  const tags = [
    "주방 사용 가능",
    "외부인 방문 협의",
    "흡연자 불가능",
    "반려동물 가능", // 여기도 API 추후 연결
  ];

  return (
    <div className="grid w-full grid-cols-2 gap-2">
      {tags.map((tag, idx) => (
        <div
          key={idx}
          className="text-body2-med flex items-center justify-center rounded border border-gray-300 py-[7.5px] text-gray-700"
        >
          {tag}
        </div>
      ))}
    </div>
  );
};

export default ExtraConditions;

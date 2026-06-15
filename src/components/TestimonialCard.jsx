const TestimonialCard = ({ card }) => {
  return (
    <div className="w-[500px] testimonialCardContainer h-[250px] rounded-[20px] p-7 bg-white border-2 flex justify-between flex-col border-[#D1D1D1] ">
      <p className="font-sans testimonialText text-[18px] text-[#232323] ">
        {card?.text}
      </p>
      <div className="flex cardImageContainer mt-10 ">
        <img
          src={card?.img}
          alt="user"
          className="w-[48px] mr-4 h-[48px] rounded-full border-2 border-[#C4C4C4] "
        />
        <div>
          <p className="font-manrope text-[18px] ">{card?.name}</p>
          <div className="flex items-center gap-x-2">
            <p className="font-manrope font-thin text-[#7D7D7D] text-[14px] ">
              {card?.moveType}
            </p>
            <p className="font-manrope font-bold text-[#7D7D7D] text-[14px] ">
              {card?.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

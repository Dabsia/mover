import RecommendedMoversList from "./RecommendedMoversList";
import MovingCompanyDetails from "./MovingCompanyDetails";
import { useParams } from "react-router-dom";

const MoversHolder = ({ isActive, setIsActive }) => {
  const makeActive = () => setIsActive(true);

  const { id } = useParams();

  const makeInActive = () => setIsActive(false);
  return (
    <div className={"w-full"}>
      {!isActive ? (
        <RecommendedMoversList id={id} makeActive={makeActive} />
      ) : (
        <MovingCompanyDetails makeInActive={makeInActive} />
      )}
    </div>
  );
};

export default MoversHolder;

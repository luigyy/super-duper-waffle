import React, { useState } from "react";
import GarmentCard from "~/components/GarmentCard";
import { api } from "~/utils/api";
import { CategoriesType, GenreType, SizeType } from "../../constants";

interface indexProps {}

interface FiltersType {
  genre?: GenreType;
  category?: CategoriesType;
  size?: SizeType;
}

const index: React.FC<indexProps> = ({}) => {
  //filters
  const [filters, setFilters] = useState<FiltersType>({
    genre: undefined,
    category: undefined,
    size: undefined,
  });
  const { data, isLoading } = api.garments.getAllByFilter.useQuery({
    genre: filters.genre,
    category: filters.category,
    size: filters.size,
  });

  function handleChange(test: string) {
    setFilters({ ...filters, genre: "male" });
  }
  //loading component
  if (isLoading) {
    return (
      <div className="flex ">
        <div
          className="b sticky left-0 top-0 h-[calc(100vh-92px)]  w-1/4 border-2
      border-blue"
        ></div>
        <div className="grid w-3/4 gap-y-24 border-2  border-red-500 px-1 pt-2 ">
          <h1 className="text-blue">Loading...</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="flex ">
      {/* filter sidebar  */}
      <div className=" sticky  left-0 top-0 h-[calc(100vh-92px)] w-1/4 border-2 border-blue px-5 pt-10">
        <h1 className="text-xl">Filtrar por </h1>
        {/* genre  */}
        <div className="flex justify-between px-5 pt-5">
          <div className="flex flex-col items-center justify-center ">
            <label className="text-sm">Hombre</label>
            <input
              type="radio"
              value="male"
              checked={filters.genre === "male"}
              className="h-5 w-5 accent-orange"
              onClick={() => handleChange("male")}
            />
          </div>{" "}
          <div className="flex flex-col items-center justify-center">
            <label className="text-sm">Mujer</label>
            <input
              type="radio"
              value="female"
              checked={filters.genre === "female"}
              className="h-5 w-5 accent-orange"
            />
          </div>{" "}
          <div className="flex flex-col items-center justify-center">
            <label className="text-sm">Todos</label>
            <input
              type="radio"
              value={undefined}
              checked={filters.genre === undefined}
              className="h-5 w-5 accent-orange"
            />
          </div>
        </div>
      </div>
      {/* prendas  */}
      <div className="grid w-3/4 grid-cols-2  gap-y-24 px-1 pt-2 sm:grid-cols-3 md:grid-cols-4">
        {data?.map((garment) => (
          <GarmentCard
            id={garment.id}
            key={garment.id}
            brand={garment.brand}
            original_price={garment.current_price}
            genre={garment.genre}
            image_url={garment.pictures[0]?.url!}
            size={garment.size}
            current_price={garment.current_price}
          />
        ))}
      </div>
    </div>
  );
};

export default index;

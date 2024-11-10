/*
Dietary restrictions:
- Halal
- Vegetarian
- Vegan
- Dairy free
- Gluten free
- Possibly pescetarian if I can make that workx
Allergens:
- Dairy
-Eggs
- Fish
- Shellfish
- Tree nuts
  - Coconuts
- Peanuts
  - Peanut oil
- Wheat/Gluten
-Soy
  - Soybean oil
  - Soy lecithin
-Sesame
- Fryers
- Alcohol
- Vinegar
*/

interface Props {
  filters: {
    halal: boolean;
    vegetarian: boolean;
    vegan: boolean;
  };
  setFilters: (filters: {
    halal: boolean;
    vegetarian: boolean;
    vegan: boolean;
  }) => void;
}

const FilterOptions = ({ filters, setFilters }: Props) => {
  return (
    <div className="flex flex-wrap gap-3 px-5 py-2">
      <label className="cursor-pointer flex items-center gap-2">
        <input
          type="checkbox"
          checked={filters.halal}
          onChange={(e) => setFilters({ ...filters, halal: e.target.checked })}
          className="checkbox checkbox-error"
        />
        <span>Halal</span>
      </label>
      <label className="cursor-pointer flex items-center gap-2">
        <input
          type="checkbox"
          checked={filters.vegetarian}
          onChange={(e) =>
            setFilters({ ...filters, vegetarian: e.target.checked })
          }
          className="checkbox checkbox-warning"
        />
        <span>Vegetarian</span>
      </label>
      <label className="cursor-pointer flex items-center gap-2">
        <input
          type="checkbox"
          checked={filters.vegan}
          onChange={(e) => setFilters({ ...filters, vegan: e.target.checked })}
          className="checkbox checkbox-success"
        />
        <span>Vegan</span>
      </label>
    </div>
  );
};

export default FilterOptions; 
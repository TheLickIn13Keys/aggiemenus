/*
Dietary restrictions:
- Halal
- Vegetarian
- Vegan
- Dairy free
- Gluten free
- Possibly pescetarian if I can make that work
  - check if the allergens include fish and shellfish and reverse the logic we're doing currently
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
    glutenFree: boolean;
    dairyFree: boolean;
  };
  setFilters: (filters: {
    halal: boolean;
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
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
      <label className="cursor-pointer flex items-center gap-2">
        <input
          type="checkbox"
          checked={filters.glutenFree}
          onChange={(e) => setFilters({ ...filters, glutenFree: e.target.checked })}
          className="checkbox checkbox-info"
        />
        <span>Gluten Free</span>
      </label>
      <label className="cursor-pointer flex items-center gap-2">
        <input
          type="checkbox"
          checked={filters.dairyFree}
          onChange={(e) => setFilters({ ...filters, dairyFree: e.target.checked })}
          className="checkbox checkbox-info"
        />
        <span>Dairy Free</span>
      </label>
    </div>
  );
};


export default FilterOptions; 
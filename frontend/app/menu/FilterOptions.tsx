/*
Dietary restrictions:
- Halal
- Vegetarian
- Vegan
- Pescetarian
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

interface FilterOptionsProps {
  filters: {
    halal: boolean;
    vegetarian: boolean;
    vegan: boolean;
    pescetarian: boolean;
    milk: boolean;
    eggs: boolean;
    fish: boolean;
    shellfish: boolean;
    treeNuts: boolean;
    peanuts: boolean;
    wheat: boolean;
    soybeans: boolean;
    sesame: boolean;
    alcohol: boolean;
    vinegar: boolean;
  };
  setFilters: (filters: {
    halal: boolean;
    vegetarian: boolean;
    vegan: boolean;
    pescetarian: boolean;

    // Allergens
    milk: boolean;
    eggs: boolean;
    fish: boolean;
    shellfish: boolean;
    treeNuts: boolean;
    peanuts: boolean;
    wheat: boolean;
    soybeans: boolean;
    sesame: boolean;
    alcohol: boolean;
    vinegar: boolean;
  }) => void;
}

const FilterOptions = ({ filters, setFilters }: FilterOptionsProps) => {
  return (
    <div className="flex flex-col gap-4 px-5 py-2">
      <div>
        <h3 className="font-semibold mb-2">Dietary Restrictions</h3>
        <div className="flex flex-wrap gap-3">
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
              checked={filters.pescetarian}
              onChange={(e) => setFilters({ ...filters, pescetarian: e.target.checked })}
              className="checkbox checkbox-info"
            />
            <span>Pescetarian</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Allergens</h3>
        <div className="flex flex-wrap gap-3">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.milk}
              onChange={(e) => setFilters({ ...filters, milk: e.target.checked })}
              className="checkbox checkbox-warning"
            />
            <span>Milk</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.eggs}
              onChange={(e) => setFilters({ ...filters, eggs: e.target.checked })}
              className="checkbox checkbox-warning"
            />
            <span>Eggs</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.fish}
              onChange={(e) => setFilters({ ...filters, fish: e.target.checked })}
              className="checkbox checkbox-warning"
            />
            <span>Fish</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.shellfish}
              onChange={(e) => setFilters({ ...filters, shellfish: e.target.checked })}
              className="checkbox checkbox-warning"
            />
            <span>Shellfish</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.treeNuts}
              onChange={(e) => setFilters({ ...filters, treeNuts: e.target.checked })}
              className="checkbox checkbox-warning"
            />
            <span>Tree Nuts</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.peanuts}
              onChange={(e) => setFilters({ ...filters, peanuts: e.target.checked })}
              className="checkbox checkbox-warning"
            />
            <span>Peanuts</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.wheat}
              onChange={(e) => setFilters({ ...filters, wheat: e.target.checked })}
              className="checkbox checkbox-warning"
            />
            <span>Wheat/Gluten</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.soybeans}
              onChange={(e) => setFilters({ ...filters, soybeans: e.target.checked })}
              className="checkbox checkbox-warning"
            />
            <span>Soy</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.sesame}
              onChange={(e) => setFilters({ ...filters, sesame: e.target.checked })}
              className="checkbox checkbox-warning"
            />
            <span>Sesame</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.alcohol}
              onChange={(e) => setFilters({ ...filters, alcohol: e.target.checked })}
              className="checkbox checkbox-warning"
            />
            <span>Alcohol</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.vinegar}
              onChange={(e) => setFilters({ ...filters, vinegar: e.target.checked })}
              className="checkbox checkbox-warning"
            />
            <span>Vinegar</span>
          </label>
        </div>
      </div>
    </div>
  );
};


export default FilterOptions; 
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
    <div className="bg-white flex flex-col p-[30px] rounded-xl gap-y-[30px]">
      <div className="flex flex-row gap-x-[11px]">
        <img src="/filter_icon.svg" className="w-[20px] h-[20x]"/>
        <p className="font-red-hat text-base text-primary">FILTER</p>
      </div>

      {/* dietary restriction container */}
      <div className="w-full">
        <h3 className="font-bold font-red-hat text-primary mb-[15px]">Dietary Restrictions</h3>
        <div className="grid grid-cols-2 mx-auto gap-y-[17px] text-primary font-red-hat">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.halal}
              onChange={(e) => setFilters({ ...filters, halal: e.target.checked })}
              className="checkbox rounded-sm border-2 border-[#D9E3EC] checked:border-[#D9E3EC] checked:bg-transparent" 
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
              className="checkbox rounded-sm border-2 border-[#D9E3EC] checked:border-[#D9E3EC]" 
            />
            <span>Vegetarian</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.vegan}
              onChange={(e) => setFilters({ ...filters, vegan: e.target.checked })}
              className="checkbox rounded-sm border-2 border-[#D9E3EC] checked:border-[#D9E3EC]" 
            />
            <span>Vegan</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.pescetarian}
              onChange={(e) => setFilters({ ...filters, pescetarian: e.target.checked })}
              className="checkbox rounded-sm border-2 border-[#D9E3EC] checked:border-[#D9E3EC]" 
            />
            <span>Pescetarian</span>
          </label>
        </div>
      </div>
      
      {/* allergen container */}
      <div className="w-full ">
        <h3 className="font-red-hat text-primary font-bold mb-[15px]">Food Allergies</h3>
        <div className="grid grid-cols-2 gap-y-[17px] text-primary font-red-hat">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.milk}
              onChange={(e) => setFilters({ ...filters, milk: e.target.checked })}
              className="checkbox rounded-sm border-2 border-[#D9E3EC] checked:border-[#D9E3EC]" 
            />
            <span>Milk</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.eggs}
              onChange={(e) => setFilters({ ...filters, eggs: e.target.checked })}
              className="checkbox rounded-sm border-2 border-[#D9E3EC] checked:border-[#D9E3EC]" 
            />
            <span>Eggs</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.fish}
              onChange={(e) => setFilters({ ...filters, fish: e.target.checked })}
              className="checkbox rounded-sm border-2 border-[#D9E3EC] checked:border-[#D9E3EC]" 
            />
            <span>Fish</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.shellfish}
              onChange={(e) => setFilters({ ...filters, shellfish: e.target.checked })}
              className="checkbox rounded-sm border-2 border-[#D9E3EC] checked:border-[#D9E3EC]" 
            />
            <span>Shellfish</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.treeNuts}
              onChange={(e) => setFilters({ ...filters, treeNuts: e.target.checked })}
              className="checkbox rounded-sm border-2 border-[#D9E3EC] checked:border-[#D9E3EC]" 
            />
            <span>Tree Nuts</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.peanuts}
              onChange={(e) => setFilters({ ...filters, peanuts: e.target.checked })}
              className="checkbox rounded-sm border-2 border-[#D9E3EC] checked:border-[#D9E3EC]" 
            />
            <span>Peanuts</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.vinegar}
              onChange={(e) => setFilters({ ...filters, vinegar: e.target.checked })}
              className="checkbox rounded-sm border-2 border-[#D9E3EC] checked:border-[#D9E3EC]" 
            />
            <span>Vinegar</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.soybeans}
              onChange={(e) => setFilters({ ...filters, soybeans: e.target.checked })}
              className="checkbox rounded-sm border-2 border-[#D9E3EC] checked:border-[#D9E3EC]" 
            />
            <span>Soy</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.sesame}
              onChange={(e) => setFilters({ ...filters, sesame: e.target.checked })}
              className="checkbox rounded-sm border-2 border-[#D9E3EC] checked:border-[#D9E3EC]" 
            />
            <span>Sesame</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.alcohol}
              onChange={(e) => setFilters({ ...filters, alcohol: e.target.checked })}
              className="checkbox rounded-sm border-2 border-[#D9E3EC] checked:border-[#D9E3EC]" 
            />
            <span>Alcohol</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.wheat}
              onChange={(e) => setFilters({ ...filters, wheat: e.target.checked })}
              className="checkbox rounded-sm border-2 border-[#D9E3EC] checked:border-[#D9E3EC]" 
            />
            <span>Wheat/Gluten</span>
          </label>
        </div>
      </div>
    </div>
  );
};


export default FilterOptions; 
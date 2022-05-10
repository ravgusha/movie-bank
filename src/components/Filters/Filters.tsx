interface IFilters {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Filters = ({ handleChange }: IFilters) => {
  return (
    <>
      <div>
        <span>Category:</span>
        <input name="adult" type="checkbox" onChange={handleChange} />
        <label>Adult</label>
      </div>
      <div>
        <span>Languages:</span>
        <input name="language" type="radio" value="ru" onChange={handleChange} />
        <label>Russian</label>
        <input name="language" type="radio" value="en" onChange={handleChange} />
        <label>English</label>
      </div>
      <div>
        <span>Movies per page:</span>
        <input name="moviesPerPage" type="radio" value="10" onChange={handleChange} />
        <label>10</label>
        <input name="moviesPerPage" type="radio" value="15" onChange={handleChange} />
        <label>15</label>
        <input name="moviesPerPage" type="radio" value="20" onChange={handleChange} />
        <label>20</label>
      </div>
    </>
  );
};

export default Filters;

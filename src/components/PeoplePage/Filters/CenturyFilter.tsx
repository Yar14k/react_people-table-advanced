import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const centuries = [16, 17, 18, 19, 20];

type PeopleProps = {
  selectedCenturies: number[];
};

const CenturyFilter = ({ selectedCenturies }: PeopleProps) => {
  const [searchParams] = useSearchParams();

  const getLink = (century: number) => {
    const params = new URLSearchParams(searchParams);

    if (selectedCenturies.includes(century)) {
      const all = params.getAll('centuries');

      params.delete('centuries');
      all
        .filter(c => Number(c) !== century)
        .forEach(c => params.append('centuries', c));
    } else {
      params.append('centuries', century.toString());
    }

    return `/people?${params.toString()}`;
  };

  const allLink = '/people';

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {centuries.map(century => (
            <Link
              key={century}
              data-cy="century"
              className={`button mr-1 ${
                selectedCenturies.includes(century) ? 'is-info' : ''
              }`}
              to={getLink(century)}
            >
              {century}
            </Link>
          ))}
        </div>

        <div className="level-right ml-4">
          <Link
            data-cy="centuryALL"
            className="button is-success is-outlined"
            to={allLink}
          >
            All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CenturyFilter;

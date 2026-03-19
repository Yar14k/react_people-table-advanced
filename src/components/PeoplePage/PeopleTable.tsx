/* eslint-disable jsx-a11y/control-has-associated-label */
import PersonLink from './PersonLink';
import { Person } from '../../types';
import { SortField, SortOrder } from '../../types/usePeopleSort';
import { Link } from 'react-router-dom';

type PeopleTableProps = {
  people: Person[];
  selectedSlug: string | null | undefined;
  onSortChange: (field: SortField) => void;
  sortField: SortField;
  sortOrder: SortOrder;
};

const PeopleTable = ({
  people,
  selectedSlug,
  onSortChange,
  sortField,
  sortOrder,
}: PeopleTableProps) => {
  return (
    <table
      className="table is-striped is-hoverable is-narrow is-fullwidth"
      data-cy="peopleTable"
    >
      <thead>
        <tr>
          {' '}
          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              style={{ cursor: 'pointer' }}
              onClick={() => onSortChange('name')}
            >
              Name
              <Link to={`#/people?sort=name`}>
                <span className="icon">
                  <i
                    className={`fas fa-sort${sortField === 'name' ? (sortOrder === 'desc' ? '-down' : '-up') : ''}`}
                  />
                </span>
              </Link>
            </span>
          </th>
          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              style={{ cursor: 'pointer' }}
              onClick={() => onSortChange('sex')}
            >
              Sex
              <Link to={`#/people?sort=sex`}>
                <span className="icon">
                  <i
                    className={`fas fa-sort${sortField === 'sex' ? (sortOrder === 'desc' ? '-down' : '-up') : ''}`}
                  />
                </span>
              </Link>
            </span>
          </th>
          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              style={{ cursor: 'pointer' }}
              onClick={() => onSortChange('born')}
            >
              Born
              <Link to={`#/people?sort=born`}>
                <span className="icon">
                  <i
                    className={`fas fa-sort${sortField === 'born' ? (sortOrder === 'desc' ? '-down' : '-up') : ''}`}
                  />
                </span>
              </Link>
            </span>
          </th>
          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              style={{ cursor: 'pointer' }}
              onClick={() => onSortChange('died')}
            >
              Died
              <Link to={`#/people?sort=died`}>
                <span className="icon">
                  <i
                    className={`fas fa-sort${sortField === 'died' ? (sortOrder === 'desc' ? '-down' : '-up') : ''}`}
                  />
                </span>
              </Link>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={
                person.slug === selectedSlug ? 'has-background-warning' : ''
              }
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PeopleTable;

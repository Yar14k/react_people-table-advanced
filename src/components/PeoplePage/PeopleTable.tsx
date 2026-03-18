/* eslint-disable jsx-a11y/control-has-associated-label */
import PersonLink from './PersonLink';
import { Person } from '../../types';
import { SortField, SortOrder } from '../../types/usePeopleSort';

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
          <th onClick={() => onSortChange('name')}>
            Name{' '}
            {sortField === 'name' ? (sortOrder === 'desc' ? '▼' : '▲') : ''}
          </th>
          <th onClick={() => onSortChange('sex')}>
            Sex {sortField === 'sex' ? (sortOrder === 'desc' ? '▼' : '▲') : ''}
          </th>
          <th onClick={() => onSortChange('born')}>
            Born{' '}
            {sortField === 'born' ? (sortOrder === 'desc' ? '▼' : '▲') : ''}
          </th>
          <th onClick={() => onSortChange('died')}>
            Died{' '}
            {sortField === 'died' ? (sortOrder === 'desc' ? '▼' : '▲') : ''}
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

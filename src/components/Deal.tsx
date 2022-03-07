import React from "react";
import useSWR from "swr";

import DealTable from './Table';

import { fetchDeal } from "../model";

export default function Deal() {
  const { data, error } = useSWR("/api/deals/", fetchDeal);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  
  const columns = [
    {
      Header: 'Id',
      accessor: 'id',
      filer: false,
    },
    {
      Header: 'Name',
      accessor: 'name',
      filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value) &&
                    row[filter.id].endsWith(filter.value),
      filterAll: true,
      filer: true,
    },
    {
      Header: 'Amount',
      accessor: 'amount',
      filer: false,
    },
    {
      Header: 'Stage',
      accessor: 'stage',
      filer: false,
    },
    {
      Header: 'Created at',
      accessor: 'created_at',
      filer: false,
    },
  ]

  return (
    <DealTable columns={columns} data={data.deals} />
  );
}

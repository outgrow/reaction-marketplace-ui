import React, { Fragment, useCallback, useMemo, useState } from "react";
import i18next from "i18next";
import { useSnackbar } from "notistack";
import DataTable, { useDataTable } from "@reactioncommerce/catalyst/DataTable";
import { useApolloClient } from "@apollo/react-hooks";
import OrderDateCell from "/imports/plugins/core/orders/client/components/DataTable/OrderDateCell";
import shopsQuery from "../graphql/queries/shops.js";

function ShopTable() {
  const apolloClient = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [tableData, setTableData] = useState([]);

  const columns = useMemo(() => [
    {
      Header: i18next.t("marketplaceSettings.table.headers.id"),
      accessor: "_id",
      // eslint-disable-next-line react/no-multi-comp,react/display-name,react/prop-types
      Cell: ({ row }) => <Fragment>{row.values._id}</Fragment>
    },
    {
      Header: i18next.t("marketplaceSettings.table.headers.date"),
      accessor: "createdAt",
      // eslint-disable-next-line react/no-multi-comp,react/display-name,react/prop-types
      Cell: ({ row }) => <OrderDateCell row={row} />
    },
    {
      Header: i18next.t("marketplaceSettings.table.headers.name"),
      accessor: "name",
      // eslint-disable-next-line react/no-multi-comp,react/display-name,react/prop-types
      Cell: ({ row }) => <Fragment>{row.values.name}</Fragment>
    },
    {
      Header: i18next.t("marketplaceSettings.table.headers.owner"),
      accessor: "owner",
      // eslint-disable-next-line react/no-multi-comp,react/display-name,react/prop-types
      Cell: ({ row }) => <Fragment>{row.values.owner}</Fragment>
    },
    {
      Header: i18next.t("marketplaceSettings.table.headers.productCount"),
      accessor: "productCount",
      // eslint-disable-next-line react/no-multi-comp,react/display-name,react/prop-types
      Cell: ({ row }) => <Fragment>{row.values.productCount}</Fragment>
    }
  ], []);

  const onFetchData = useCallback(async ({ pageIndex, pageSize }) => {
    // Wait for shop id to be available before fetching orders.
    setIsLoading(true);

    const { data, error } = await apolloClient.query({
      query: shopsQuery,
      variables: {
        first: pageSize,
        offset: pageIndex * pageSize
      },
      fetchPolicy: "network-only"
    });

    if (error && error.length) {
      enqueueSnackbar(i18next.t("admin.table.error", { variant: "error" }));
      return;
    }

    // Update the state with the fetched data as an array of objects and the calculated page count
    setTableData(data.shops.nodes);
    setPageCount(Math.ceil(data.shops.totalCount / pageSize));

    setIsLoading(false);
  }, [apolloClient, enqueueSnackbar]);

  const dataTableProps = useDataTable({
    columns,
    data: tableData,
    pageCount,
    onFetchData,
    getRowId: (row) => row.referenceId
  });

  return (
    <DataTable {...dataTableProps} isLoading={isLoading} />
  );
}

export default ShopTable;

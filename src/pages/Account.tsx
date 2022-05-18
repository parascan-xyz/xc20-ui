import { gql, useQuery } from "@apollo/client";
import { Box, Button, Heading } from "@chakra-ui/react";
import { PAGINATION_PART_OF_QUERY, TransferData, linkAccount, linkEvent, linkToken, truncateText } from "../utils";
import Table from "../components/Table";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { useParams } from "react-router-dom";

export default function Account() {
  const { id } = useParams() as {[key: string]: string}
  return (
    <Box>
      <Heading>Account: {id}</Heading>
      <DataTable id={id} />
    </Box>
  )
}


function DataTable({id}: {id:string}) {
  id = id.toLowerCase()
  const query = gql`
    query Transfers($first: Int, $orderBy: [TransfersOrderBy!], $filter: TransferFilter, $after: Cursor) {
      query {
        transfers(first: $first, orderBy: $orderBy, filter: $filter, after: $after) {
          ${PAGINATION_PART_OF_QUERY}
          nodes {
            id
            blockNumber
            extrinsicIndex
            eventIndex
            fromId
            toId
            tokenId
            value
            token {id, name, symbol, decimals}
          }
        }
      }
    }
  `;
  const variables = {
    "first": 20,
    "orderBy": [
      "BLOCK_NUMBER_DESC",
      "ID_DESC"
    ],
    "filter": {
      "or": [
        {
          "fromId": {
            "equalTo": id
          }
        },
        {
          "toId": {
            "equalTo": id
          }
        }
      ]
    }
  }

  const columns = [
    { Header: "Event", accessor: "event" },
    { Header: "From", accessor: "from" },
    { Header: "To", accessor: "to" },
    { Header: "Token", accessor: "token" },
    { Header: "Value", accessor: "value" },
  ];
  const { loading, error, data, refetch, fetchMore } = useQuery(query, {variables: variables});
  console.log(columns, data)
  const rData =
    data &&
    data.query.transfers.nodes.map(
      (d: TransferData) => ({
        event: linkEvent(d.blockNumber, d.extrinsicIndex, d.eventIndex),
        from: d.fromId === id ? truncateText(d.fromId) : linkAccount(d.fromId),
        to: d.toId === id ? truncateText(d.toId) : linkAccount(d.toId),
        token: linkToken(d.token.id, d.token.symbol),
        value: (Number(d.value) / Number(10**d.token.decimals))
      })
    );
  console.log(rData)

  const loadMore = () => {
    //console.log(data.query.transfers.pageInfo.endCursor)
    fetchMore({
      variables: {after: data.query.transfers.pageInfo.endCursor}
    })
    //console.log("loaded more")
  }

  return (
    data 
    ? (
      <>
        <Table columns={columns} data={rData} />
        <Button onClick={() => loadMore()} backgroundColor="yellow.400">Load more</Button>
      </>
    )
    : loading 
    ? <Loading />
    : <Error />
  );
}


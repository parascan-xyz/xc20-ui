import { gql, useQuery } from "@apollo/client";
import { Box, Button, Heading } from "@chakra-ui/react";
import { linkAccount, linkEvent, linkToken, PAGINATION_PART_OF_QUERY, TransferData } from "../utils";
import Table from "../components/Table";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function Homepage() {
  return (
    <Box>
      <Heading>All</Heading>
      <DataTable />
    </Box>
  )
}

function DataTable() {

  const query = gql`
    query Transfers($first: Int, $orderBy: [TransfersOrderBy!], $after: Cursor) {
      query {
        transfers(first: $first, orderBy: $orderBy, after: $after) {
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
    ]
  }

  const columns = [
    { Header: "Event", accessor: "event" },
    { Header: "From", accessor: "from" },
    { Header: "To", accessor: "to" },
    { Header: "Token", accessor: "token" },
    { Header: "Value", accessor: "value" },
  ];
  const { loading, error, data, refetch, fetchMore } = useQuery(query, {variables: variables});
  console.log(data)
  const rData =
    data &&
    data.query.transfers.nodes.map(
      (d: TransferData) => ({
        event: linkEvent(d.blockNumber, d.extrinsicIndex, d.eventIndex),
        from: linkAccount(d.fromId),
        to: linkAccount(d.toId),
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

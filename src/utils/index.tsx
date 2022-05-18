import { Link } from "@chakra-ui/react";
import { InMemoryCache } from "@apollo/client";

export interface TransferData {
  id: string,
  blockNumber: number,
  extrinsicIndex: number,
  eventIndex: number,
  fromId: string,
  toId: string,
  token: {
    id: string,
    name: string,
    symbol: string,
    decimals: number,
  },
  value: bigint
}


export const ENDPOINT = "https://api.subquery.network/sq/parascan-xyz/xc20-subql"

export const CACHE = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        transfers: {
          keyArgs: false,
          merge(existing = {nodes: []}, incoming) {
            return {
              nodes: [...existing.nodes, ...incoming.nodes],
              totalCount: incoming.totalCount,
              pageInfo: incoming.pageInfo
            };
          }
        },
      },
    },
  },
});

export const PAGINATION_PART_OF_QUERY = `
  pageInfo {
    startCursor
    endCursor
    hasNextPage
    hasPreviousPage
  }
  totalCount
`;


export const truncateText = (text:string, l=6) => {
  if (l && l>0) {
    return `${text.slice(0, l+2)}...${text.slice(-l)}`
  } else {
    return text
  }
}

export const linkAccount = (address:string, truncate=6) => {
  return (<Link href={`/account/${address}`} color='blue.600'>{truncateText(address.toLowerCase())}</Link>)
}

export const linkToken = (id:string, symbol:string) => {
  const Fs = "f".repeat(42 - id.length)
  const address = "0x" + Fs + id.slice(2)
  return (
    <Link href={`https://moonriver.moonscan.io/token/${address}#balances`} color='blue.600'
      target={'_blank'} rel="noopener"
    >
      {symbol}
    </Link>
  )
}

export const linkEvent = (blockNumber:number, extrinsicIndex:number, eventIndex:number) => {
  if (extrinsicIndex >= 0) {
    return (
      <Link 
        href={`https://moonriver.subscan.io/extrinsic/${blockNumber}-${extrinsicIndex}?event=${blockNumber}-${eventIndex}`}
        color='blue.600' target={'_blank'} rel="noopener"
      >
        {`${blockNumber}-${eventIndex}`}
      </Link>
    )
  } else {
    return (
      <Link 
        href={`https://moonriver.subscan.io/event?block=${blockNumber}`}
        color='blue.600' target={'_blank'} rel="noopener"
      >
        {`${blockNumber}-${eventIndex}`}
      </Link>
    )
  }
}

export const loadMore = (fetchMore: any, endCursor: string) => {
  console.log(endCursor)
  fetchMore({
    variables: {after: endCursor}
  })
  console.log("loaded more")
}

import { Link } from "@chakra-ui/react";
import { InMemoryCache } from "@apollo/client";

export interface TransferData {
  id: string,
  blockNumber: number,
  extrinsicIndex: number,
  eventIndex: number,
  timestamp: string,
  fromId: string,
  toId: string,
  token: {
    id: string,
    address: string,
    name: string,
    symbol: string,
    decimals: number,
  },
  value: bigint
}

export interface BalanceData {
  id: string,
  accountId: string,
  token: {
    id: string,
    address: string,
    name: string,
    symbol: string,
    decimals: number,
  },
  transferValue: bigint,
  apiValue: bigint
}

export const ENDPOINT = "https://api.subquery.network/sq/parascan-xyz/xc20-moonbeam"

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
        balances: {
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

export const linkToken = (id:string, symbol:string, a:string|null=null) => {
  const Fs = "f".repeat(42 - id.length)
  const address = "0x" + Fs + id.slice(2)
  return (
    <Link href={`https://moonriver.moonscan.io/token/${address}${a ? "?a="+a : "#balances"}`} color='blue.600'
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

// timeSince copied from https://stackoverflow.com/a/3177838/7283203
export const timeSince = (date: number | string) => {
  if (!date) {
    return null;
  }
  const nowDate = new Date()
  var seconds = Math.floor(
    ((nowDate.valueOf() - new Date(date).valueOf()) / 1000)
    // add timezone offset because date is in UTC
    + nowDate.getTimezoneOffset() * 60
  );

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
};

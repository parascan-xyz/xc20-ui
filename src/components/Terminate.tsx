import {
  Alert,
  AlertIcon,
  Box,
  Link
} from '@chakra-ui/react'


export default function Terminate() {
  return (
    <Box>
      <Alert status='error'>
        <AlertIcon />
        This site would be terminated on 2022-10-31 (or later).

        It is powered by&nbsp;
        <Link href='https://github.com/parascan-xyz/xc20-ui' style={{'color': 'blue', 'textDecoration': 'underline'}}>react</Link>
        &nbsp;and&nbsp;
        <Link href='https://github.com/parascan-xyz/xc20-subql' style={{'color': 'blue', 'textDecoration': 'underline'}}>subquery</Link>
        .

        You should checkout&nbsp;
        <Link href='http://polkaholic.io/#xcmtransfers' style={{'color': 'blue', 'textDecoration': 'underline'}}>polkaholic</Link>
        &nbsp;and other services.
      </Alert>
    </Box>
  )
}
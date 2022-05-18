import { Box, Button, Input } from "@chakra-ui/react";
import { KeyboardEvent } from "react";

export default function Navbar() {
  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      window.open(`/account/${(e.target as HTMLInputElement).value}`, "_self");
    }
  };

  return (
    <Box margin={"1em"}>
      <Button onClick={() => window.open("/", "_self")} backgroundColor="yellow.400">
        Home
      </Button>
      <Input
        onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => handleSearch(e)}
        placeholder="Search by address"
        width={"50%"}
      />
    </Box>
  )
}
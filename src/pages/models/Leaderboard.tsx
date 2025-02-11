import { useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Avatar, Text } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

interface Player {
  id: number;
  name: string;
  score: number;
  avatar: string;
}

const initialPlayers: Player[] = [
  { id: 1, name: "Alice", score: 1200, avatar: "https://i.pravatar.cc/50?u=alice" },
  { id: 2, name: "Bob", score: 1100, avatar: "https://i.pravatar.cc/50?u=bob" },
  { id: 3, name: "Charlie", score: 1000, avatar: "https://i.pravatar.cc/50?u=charlie" },
];

export default function Leaderboard(){
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Player; direction: "asc" | "desc" } | null>(null);

  const handleSort = (key: keyof Player) => {
    let direction: "asc" | "desc" = "asc";

    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedPlayers = [...players].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortConfig({ key, direction });
    setPlayers(sortedPlayers);
  };

  function getSortIcon(key: keyof Player) {
    if (sortConfig?.key !== key) return null;
    return sortConfig.direction === "asc" ? <TriangleUpIcon ml={1} /> : <TriangleDownIcon ml={1} />;
  };

  return (
    <Box maxW="md" mx="auto" mt={5} p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th onClick={() => handleSort("id")} cursor="pointer">
              # {getSortIcon("id")}
            </Th>
            <Th onClick={() => handleSort("name")} cursor="pointer">
              Player {getSortIcon("name")}
            </Th>
            <Th onClick={() => handleSort("score")} cursor="pointer" isNumeric>
              Score {getSortIcon("score")}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {players.map((player) => (
            <Tr key={player.id}>
              <Td>{player.id}</Td>
              <Td>
                <Avatar size="sm" src={player.avatar} mr={2} />
                <Text as="span" fontWeight="bold">{player.name}</Text>
              </Td>
              <Td isNumeric>{player.score}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};


import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { layoutConfig } from "../../components/style";

interface LeaderboardEntry {
	id: number;
	name: string;
	score: number;
}

interface Entries {
	entries: LeaderboardEntry[],
	name: string
}

export default function Leaderboard({ entries, name }: Entries) {
	const [models, setModels] = useState<LeaderboardEntry[]>(entries);
	const [sortConfig, setSortConfig] = useState<{ key: keyof LeaderboardEntry; direction: "asc" | "desc" } | null>(null);

	const handleSort = (key: keyof LeaderboardEntry) => {
		let direction: "asc" | "desc" = "asc";

		if (sortConfig?.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		const sortedModels = [...models].sort((a, b) => {
			if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
			if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
			return 0;
		});
		setSortConfig({ key, direction });
		setModels(sortedModels);
	};

	function getSortIcon(key: keyof LeaderboardEntry) {
		if (sortConfig?.key !== key) return null;
		return sortConfig.direction === "asc" ? <TriangleUpIcon ml={1} /> : <TriangleDownIcon ml={1} />;
	};

	return (
		<Flex direction='column' alignItems={'right'} mt={layoutConfig.margin}>
			<Text p='0' fontWeight={'bold'} >{name}</Text>
			<Box maxW="md" p={layoutConfig.padding} borderWidth="1px" borderRadius={layoutConfig.borderRadius} boxShadow="md">
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th onClick={() => handleSort("id")} cursor="pointer">
								# {getSortIcon("id")}
							</Th>
							<Th onClick={() => handleSort("name")} cursor="pointer">
								Model {getSortIcon("name")}
							</Th>
							<Th onClick={() => handleSort("score")} cursor="pointer" isNumeric>
								Score {getSortIcon("score")}
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{models.map((model) => (
							<Tr key={model.id}>
								<Td>{model.id}</Td>
								<Td>
									<Text as="span" fontWeight="bold">{model.name}</Text>
								</Td>
								<Td isNumeric>{model.score}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</Box>
		</Flex>
	);
};


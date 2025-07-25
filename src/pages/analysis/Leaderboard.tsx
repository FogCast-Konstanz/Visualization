// components/LeaderboardTable.tsx
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Box, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { BenchmarkingResponseFormat } from "../../components/requests/benchmarking";
import { layoutConfig } from "../../components/style";

interface LeaderboardTableProps {
	data: BenchmarkingResponseFormat[];
	timeRangeLabel: string; // e.g., "Long-term", "Mid-term", "Short-term"
}

type SortKey = keyof Omit<BenchmarkingResponseFormat, "forecast_date" | "lead_time" | "result" | "table">;

export default function LeaderboardTable({ data, timeRangeLabel }: LeaderboardTableProps) {
	const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: "asc" | "desc" } | null>(null);

	const handleSort = (key: SortKey) => {
		let direction: "asc" | "desc" = "asc";
		if (sortConfig?.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });
	};

	const sortedData = [...data].sort((a, b) => {
		if (sortConfig === null) {
			return 0; // No sorting applied initially
		}
		const aValue = a[sortConfig.key];
		const bValue = b[sortConfig.key];

		// Handle potential nulls/NaNs if they can exist in your data
		if (aValue === null && bValue === null) return 0;
		if (aValue === null) return sortConfig.direction === "asc" ? 1 : -1;
		if (bValue === null) return sortConfig.direction === "asc" ? -1 : 1;

		if (typeof aValue === 'number' && typeof bValue === 'number') {
			return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
		}

		// Fallback for non-numeric types (like model name)
		if (String(aValue) < String(bValue)) return sortConfig.direction === "asc" ? -1 : 1;
		if (String(aValue) > String(bValue)) return sortConfig.direction === "asc" ? 1 : -1;
		return 0;
	});

	function getSortIcon(key: SortKey) {
		if (sortConfig?.key !== key) return null;
		return sortConfig.direction === "asc" ? <TriangleUpIcon ml={1} /> : <TriangleDownIcon ml={1} />;
	}

	const columnHeaders: { key: SortKey; label: string }[] = [
		{ key: "model", label: "Model" },
		{ key: "cloud_cover", label: "Cloud Cover" },
		{ key: "dew_point_2m", label: "Dew Point (2m)" },
		{ key: "precipitation", label: "Precipitation" },
		{ key: "relative_humidity_2m", label: "Humidity (2m)" },
		{ key: "surface_pressure", label: "Surface Pressure" },
		{ key: "temperature_2m", label: "Temperature (2m)" },
	];

	return (
		<Box maxW="full" p={layoutConfig.padding} borderWidth="1px" borderRadius={layoutConfig.borderRadius} boxShadow="md">
			<Table variant="simple" size="sm">
				<Thead>
					<Tr>
						{columnHeaders.map((header) => (
							<Th key={header.key} onClick={() => handleSort(header.key)} cursor="pointer">
								{header.label} {getSortIcon(header.key)}
							</Th>
						))}
					</Tr>
				</Thead>
				<Tbody>
					{sortedData.map((entry, index) => (
						<Tr key={`${entry.model}-${entry.forecast_date}-${entry.lead_time}-${index}`}>
							<Td>
								<Text as="span" fontWeight="bold">
									{entry.model}
								</Text>
							</Td>
							<Td>{entry.cloud_cover?.toFixed(2)}</Td>
							<Td>{entry.dew_point_2m?.toFixed(2)}</Td>
							<Td>{entry.precipitation?.toFixed(2)}</Td>
							<Td>{entry.relative_humidity_2m?.toFixed(2)}</Td>
							<Td>{entry.surface_pressure?.toFixed(2)}</Td>
							<Td>{entry.temperature_2m?.toFixed(2)}</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</Box>
	);
}
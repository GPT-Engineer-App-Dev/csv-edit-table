import React, { useState } from 'react';
import { Container, VStack, Button, Input, Table, Thead, Tbody, Tr, Th, Td, IconButton, Box, Heading, useToast } from "@chakra-ui/react";
import { FaTrash, FaDownload, FaPlus } from "react-icons/fa";
import Papa from 'papaparse';
import { CSVLink } from 'react-csv';

const Index = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [fileName, setFileName] = useState("edited_data.csv");
  const toast = useToast();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setHeaders(Object.keys(results.data[0]));
          setData(results.data);
          toast({
            title: "File uploaded successfully.",
            description: "Your CSV file has been parsed.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        },
      });
    }
  };

  const handleAddRow = () => {
    const newRow = headers.reduce((acc, header) => ({ ...acc, [header]: "" }), {});
    setData([...data, newRow]);
  };

  const handleRemoveRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const handleInputChange = (index, header, value) => {
    const newData = [...data];
    newData[index][header] = value;
    setData(newData);
  };

  return (
    <Box bg="gray.50" minH="100vh" py={10}>
      <Container centerContent maxW="container.xl" py={10}>
        <VStack spacing={4} width="100%">
          <Heading as="h1" size="xl" mb={6}>CSV File Editor</Heading>
          <Input type="file" accept=".csv" onChange={handleFileUpload} variant="filled" size="lg" />
          {data.length > 0 && (
            <>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    {headers.map((header) => (
                      <Th key={header}>{header}</Th>
                    ))}
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((row, rowIndex) => (
                    <Tr key={rowIndex}>
                      {headers.map((header) => (
                        <Td key={header}>
                          <Input
                            value={row[header]}
                            onChange={(e) => handleInputChange(rowIndex, header, e.target.value)}
                            variant="flushed"
                          />
                        </Td>
                      ))}
                      <Td>
                        <IconButton
                          aria-label="Remove Row"
                          icon={<FaTrash />}
                          onClick={() => handleRemoveRow(rowIndex)}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Button leftIcon={<FaPlus />} onClick={handleAddRow}>
                Add Row
              </Button>
              <Button leftIcon={<FaDownload />} colorScheme="teal">
                <CSVLink data={data} headers={headers} filename={fileName} style={{ textDecoration: 'none', color: 'inherit' }}>
                  Download CSV
                </CSVLink>
              </Button>
            </>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;
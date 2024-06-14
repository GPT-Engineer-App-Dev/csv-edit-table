import React from 'react';
import { Box, Text, Link, HStack, VStack } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box as="footer" py={10} bg="gray.800" color="white">
      <VStack spacing={4}>
        <Text>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</Text>
        <HStack spacing={6}>
          <Link href="https://www.facebook.com" isExternal>
            <FaFacebook size="24px" />
          </Link>
          <Link href="https://www.twitter.com" isExternal>
            <FaTwitter size="24px" />
          </Link>
          <Link href="https://www.instagram.com" isExternal>
            <FaInstagram size="24px" />
          </Link>
        </HStack>
        <Text>Contact us: contact@yourcompany.com</Text>
      </VStack>
    </Box>
  );
};

export default Footer;
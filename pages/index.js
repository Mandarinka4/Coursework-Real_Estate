import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button } from '@chakra-ui/react';

import Property from '../components/Property';
import { baseUrl, fetchApi } from '../utils/fetchApi';

import houseImage from '../../coursework-real_estate/assets/images/house.jpg';
import rentImage from '../../coursework-real_estate/assets/images/rent_house.jpg';

export const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl }) => (
    <Flex
        position="relative"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        m="10"
        height="300px"
        borderRadius="lg"
        overflow="hidden"
    >
        <Image
            src={imageUrl}
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            style={{ zIndex: -1 }}
        />
        <Box
            position="absolute"
            zIndex="1"
            color="white"
            textAlign="center"
            p="5"
            bg="rgba(0, 0, 0, 0.5)"
            borderRadius="md"
        >
            <Text color="gray.300" fontSize="sm" fontWeight="medium">
                {purpose}
            </Text>
            <Text fontSize="3xl" fontWeight="bold">
                {title1}
                <br />
                {title2}
            </Text>
            <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.200">
                {desc1}
                <br />
                {desc2}
            </Text>
            <Flex mt="4" justifyContent="center">
                <Button fontSize="xl" bg="blue.300" color="white" mx="2">
                    <Link href={linkName}>{buttonText}</Link>
                </Button>
            </Flex>
        </Box>
    </Flex>
);

const Home = ({ propertiesForSale, propertiesForRent }) => (
    <Box>
        <Banner
            purpose='RENT A HOME'
            title1='Rental Homes for'
            title2='Everyone'
            desc1=' Explore from Apartments, builder floors, villas'
            desc2='and more'
            buttonText='Explore Renting'
            linkName='/search?purpose=for-rent'
            imageUrl={rentImage}
        />
        <Flex justifyContent="center" flexWrap="wrap" gap="6" p="5">
            {propertiesForRent.map((property) => (
                <Property property={property} key={property.id} />
            ))}
        </Flex>
        <Banner
            purpose='BUY A HOME'
            title1=' Find, Buy & Own Your'
            title2='Dream Home'
            desc1=' Explore from Apartments, land, builder floors,'
            desc2=' villas and more'
            buttonText='Explore Buying'
            linkName='/search?purpose=for-sale'
            imageUrl={houseImage}

        />
        <Flex justifyContent="center" flexWrap="wrap" gap="6" p="5">
            {propertiesForSale.map((property) => (
                <Property property={property} key={property.id} />
            ))}
        </Flex>
    </Box>
);

export async function getStaticProps() {
    const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
    const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

    return {
        props: {
            propertiesForSale: propertyForSale?.hits,
            propertiesForRent: propertyForRent?.hits,
        },
    };
}

export default Home;

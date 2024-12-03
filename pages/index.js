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

        <Box m="10" borderRadius="lg" overflow="hidden">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509206!2d144.95373631531586!3d-37.81627997975153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577bb5f6c0b5df5!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1637779110439!5m2!1sen!2sus"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
            ></iframe>
        </Box>

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

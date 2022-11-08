import {
  Box,
  Button,
  Checkbox,
  Flex,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiArrowDownSFill } from "react-icons/ri";
import { getData } from "../Redux/AppReducer/action";
import { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import ProductCardGrid from "../Components/ProductCardGrid";
import Pagination from "../Components/Pagination";
import { useRef } from "react";

const ProductPage = ({ dataType, heading, categoryList }) => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector((store) => store.AppReducer);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSortParams = searchParams.get("sortBy");
  const initialArrivalParams = searchParams.getAll("newArrival");
  const initialCategoryParams = searchParams.getAll("category");
  const initialPageParams = searchParams.get("page");
  const [sortBy, setSortBy] = useState(initialSortParams || "");
  const [newArrival, setNewArrival] = useState(initialArrivalParams || []);
  const [category, setCategory] = useState(initialCategoryParams || []);
  const [page, setPage] = useState(+initialPageParams || 1);
  const location = useLocation();
  const toast = useToast();


  useEffect(() => {
    if (location || data.length === 0) {
      const sortBy = searchParams.get("sortBy");
      const queryParams = {
        params: {
          _page: page && page,
          _limit: page && 15,
          sellingAttribute: searchParams.getAll("newArrival"),
          category: searchParams.getAll("category"),
          _sort: sortBy && "price",
          _order: sortBy,
        },
      };
      dispatch(getData(dataType, queryParams, page));
    }
  }, [location.search, data.length]);

  useEffect(() => {
    const params = {};
    sortBy && (params.sortBy = sortBy);
    newArrival && (params.newArrival = newArrival);
    category && (params.category = category);
    page && (params.page = page);
    setSearchParams(params);
  }, [sortBy, newArrival, category, page]);

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const handleChange = (e) => {
    let option = e.target.value;

    let arrival = [...newArrival];
    if (newArrival.includes(option)) {
      arrival.splice(arrival.indexOf(option), 1);
    } else {
      arrival.push(option);
    }

    setNewArrival(arrival);
  };

  const handleChangeCategory = (e) => {
    let option = e.target.value;
    let newCategory = [...category];
    if (category.includes(option)) {
      newCategory.splice(newCategory.indexOf(option), 1);
    } else {
      newCategory.push(option);
    }

    setCategory(newCategory);
  };

  const handleResetFilters = () => {
    setSearchParams({});
    setNewArrival([])
    setCategory([])
    sortBy('')
  };


  return (
    <Box w={["90%", "80%", "80%"]} m={["50px auto", "50px auto"]}>
      {/* sorting */}
      <Flex
        align="center"
        justify="space-evenly"
        p="1rem"
        boxShadow={"md"}
        w="100%"
        m="1rem 0px"
      >
        <Text display={["none", "block"]} fontSize={"lg"} fontWeight="500">
          Total {data.length}
        </Text>
        <Text fontSize={"lg"} fontWeight="500">
          {heading}
        </Text>

        <Select onChange={handleSort} w="max-content" placeholder="Sort by">
          <option value="asc">Price: Low to high</option>
          <option value="desc">Price: High to low</option>
        </Select>
      </Flex>

      {/* pagination */}
      <Pagination page={page} setPage={setPage} />

      <Flex
        w="100%"
        m="25px 0px"
        gap="1rem"
        justify="space-between"
        direction={["column", "row"]}
      >
        {/* sidebar */}
        <Stack
          p="1rem"
          gap="10px"
          direction={["row", "column"]}
          overflow={["scroll", "visible"]}
          boxShadow={"md"}
          w={["100%", "25%"]}
        >
          {/* reset filter button */}
          <Button
            size={["sm", "md"]}
            bg="teal"
            borderRadius={"none"}
            color="white"
            fontWeight={500}
            _hover={{ bg: "teal.500" }}
            onClick={handleResetFilters}
          >
            Reset filters
          </Button>

          <Text fontSize={["xs", "md", "lg"]} fontWeight="500">
            Filters
          </Text>
          <Box>
            <Checkbox
              value="New Arrival"
              defaultChecked={newArrival.includes("New Arrival")}
              onChange={handleChange}
            >
              <Text fontSize={["xs", "md"]}>New Arrival</Text>
            </Checkbox>
          </Box>

          <Text
            fontSize={["xs", "md", "lg"]}
            display={["none", "block"]}
            fontWeight="500"
          >
            Filter by Category
          </Text>

          {/* for medium and large */}
          {categoryList?.map((el, index) => (
            <Box display={["none", "block"]}>
              <Checkbox
                key={index}
                value={el}
                defaultChecked={category.includes(el)}
                onChange={handleChangeCategory}
              >
                <Text key={index + 1} fontSize="10px">
                  {el.split("_").map((item, index) => {
                    if (index != 0) {
                      return `${item.toUpperCase()}`;
                    }
                  })}
                </Text>
              </Checkbox>
            </Box>
          ))}

          {/* on mobile view */}
          <Flex gap="1rem" display={["flex", "none", "none"]}>
            <Menu>
              <MenuButton>
                <Flex gap="0.5rem" align="center" justify="center">
                  <Text>Filter by category </Text> <RiArrowDownSFill />
                </Flex>
              </MenuButton>
              <MenuList maxH="250px" overflowY="scroll">
                {categoryList?.map((el, index) => (
                  <MenuItem>
                    <Checkbox
                      key={index}
                      value={el}
                      defaultChecked={category.includes(el)}
                      onChange={handleChangeCategory}
                    >
                      <Text fontSize="10px">
                        {el.split("_").map((item, index) => {
                          if (index != 0) {
                            return `${item.toUpperCase()}`;
                          }
                        })}
                      </Text>
                    </Checkbox>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Flex>
        </Stack>

        {data && (
          <ProductCardGrid
            category={dataType}
            loading={isLoading}
            data={data}
          />
        )}
      </Flex>
    </Box>
  );
};

export default ProductPage;

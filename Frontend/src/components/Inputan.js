import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function Inputan(props) {
  const styleinput = {
    focusBorderColor: useColorModeValue("accentLight.400", "accentDark.400"),
  };
  const [isEdit, setIsEdit] = useState(false);

  return isEdit ? (
    <Flex
      w="full"
      as={"form"}
      gap={2}
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit(e);
        setIsEdit(false);
      }}
    >
      <FormControl id={props.plc} isRequired>
        <FormLabel>{props.judul}</FormLabel>
        <Input
          type={props.type}
          value={props.plc}
          _placeholder={{ color: "gray.500" }}
          onChange={(e) => props.change(e.target.value)}
          {...styleinput}
        />
      </FormControl>
      <IconButton
        aria-label="Batal"
        icon={<CloseIcon />}
        mt={"auto"}
        colorScheme="red"
        onClick={(e) => {
          e.preventDefault();
          setIsEdit(false);
        }}
      />
      <IconButton
        aria-label="Submit"
        icon={<CheckIcon />}
        type="submit"
        mt={"auto"}
        colorScheme="green"
      />
    </Flex>
  ) : (
    <Flex w="full" gap={2} align="center">
      <FormControl w="full">
        <FormLabel>{props.judul}</FormLabel>
        <Text>{props.plc}</Text>
      </FormControl>
      <IconButton
        aria-label="Edit"
        icon={<EditIcon />}
        type="button"
        onClick={() => setIsEdit(true)}
      />
    </Flex>
  );
}

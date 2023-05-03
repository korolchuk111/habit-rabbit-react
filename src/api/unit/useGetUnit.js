import { useMutation } from "react-query";
import instance from "../configurations/configurations";
import { SERVER_URL } from "../../constants/api/urls";

const getUnitMutationFn = () => {
  return instance.get(`${SERVER_URL}/Unit`, false).then((res) => res.data);
};

export const useGetUnit = ({ onSuccess, onError }) => {
  const { mutate: getUnit } = useMutation(getUnitMutationFn, {
    mutationKey: 'getUnit',
    onSuccess,
    onError,
  });
  return { getUnit };
};
